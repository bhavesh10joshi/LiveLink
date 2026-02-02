import express from "express" ; 
import { z } from "zod" ; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { UserModel , GroupModel , MessageModel } from "./db";
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors} from "./StatusCodes";
import { sendOTP } from "./Nodemailer/emailvianode";
import { generateOTP } from "./otp/otp";
import { usermiddleware } from "./Middleware/Index";

const USER_SECRET : string = "tokengenerationsecretforjwtusers";
const DB_LINK : string = "mongodb+srv://josh10bhavesh:zp6aCDbTSZOd1ydK@cluster0.nd6zk.mongodb.net/LiveLink?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(express.json());
app.use(cors());

 
//zod inference
const UserObject = z.object({
    email : z.string().includes('@') ,
    password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
type SignUpInput = z.infer<typeof UserObject>;

//zod inference for upadting password 
const passwordObject = z.object({
    password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
type passInput = z.infer<typeof passwordObject>;

// express endpoints
// endpoint For SigningUp into the  Application ! 
app.post("/LiveLink/User/SignUp" , async function(req,res)
{
    // const SignUp : SignUpInput = req.body;
    const zodsafeObject = UserObject.safeParse(req.body);

    if(!zodsafeObject.success)
    {
        return res.status(ClientErrorStatusCodes.BadRequest).json({
            msg : "Validation Failed / WronG"
        }); 
    }

    const SignUp : SignUpInput = zodsafeObject.data;

    //Password Hash Conversion Using Bcrypt 
    const hashedpassword = await bcrypt.hash(SignUp.password , 5);

    if(hashedpassword)
    {
        UserModel.create({
            email : SignUp.email , 
            password : hashedpassword
        });
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Successfully Created User !"
        });
    }
    else
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !" 
        });
    }
});
// Endpoint for Signing In into the Application 
app.post("/LiveLink/Users/Login" , async function(req,res)
{
    const email : string = req.body.email ;
    const password : string = req.body.password ; 
    
    const FindUser = await UserModel.findOne({
        email : email
    });

    if(FindUser)
    {
        const Checkpass = await bcrypt.compare(password , FindUser.password); 
        if(Checkpass)
        {
            const token = jwt.sign({
                id : FindUser._id 
            } , USER_SECRET);

            res.status(SuccessStatusCodes.Success).json({
                token : token
            });
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Incorrect Password Given by the user !"
            });
        }
    }
    else{
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The Email given was not found !"
        });
    }
});
// Endpoint for genrating the otp while changing the password of the email during the Login and sending it to the client Registered Email
app.post("/LiveLink/User/Login/ForgotPassword/otp-Generate" , async function(req,res)
{
    const input = req.body.input;
    const UserFind = await UserModel.findOne({
        $or: [
            { email: input },
            { uniqueId: input }
        ]
    });

    if(!UserFind)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The given email or uniqueID given by the user is Invalid !"
        });
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp , 5);

    if(!hashedOtp)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
    }

    const result = await UserModel.updateOne(
        { _id : UserFind?._id }, 
        { $set: { ResetOTP : hashedOtp , ResetOTPExpiry : Date.now() + 10 * 60 * 1000}} 
    );

    if(!result)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Email given by the user not found !"
        });
    }
    sendOTP(UserFind?.email , otp);

    res.status(SuccessStatusCodes.ResourceCreated).json({
        msg : "Successfully sent an Otp to the registered email !"
    });
});
// Authenticating for the Otp given by the user is right or wrong 
app.post("/LiveLink/User/Otp/Authentication" , async function(req , res)
{
    const email = req.body.email;
    const otp = req.body.otp;

    const FindUser:any = await UserModel.findOne({
        email : email ,
        resetOTPExpiry: { $gt: Date.now() }
    });

    if(!FindUser)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Invalid Email or Otp"
        });
    }

    const verify = await bcrypt.compare(otp , FindUser?.ResetOTP);

    if(!verify)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Incorrect Otp Provided by the User !"
        });
    }
    
    res.status(SuccessStatusCodes.Success).json({
        msg : "Successfull Verification of the User !"
    });
}) ;
//Endpoint for updating the password !
app.post("/LiveLink/User/change-pasword" , async function(req,res)
{
    const email = req.body.email;
    const zodsafeObject = passwordObject.safeParse(req.body);

    if(!zodsafeObject.success)
    {
        return res.status(ClientErrorStatusCodes.BadRequest).json({
            msg : "Validation Failed "
        }); 
    }

    const newpass : passInput = zodsafeObject.data;

    //Password Hash Conversion Using Bcrypt 
    const hashednewpassword = await bcrypt.hash(newpass.password , 5);

    if(!hashednewpassword)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
    }
    
    try{
        await UserModel.updateOne(
            { email : email }, 
            { $set: { password : hashednewpassword}} 
        ); 
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Password updated Successfully !"
        });
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
    }
}) 
//Everything after this needs token Authorization !
//Endpoint for changing the password of the user from profile while logged in 
app.post("/LiveLink/User/Password-change/otp-Generate" , usermiddleware , async function(req : any , res)
{
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp , 5);

    if(!hashedOtp)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
    }

    const result = await UserModel.updateOne(
        { _id : req.UserId }, 
        { $set: { ResetOTP : hashedOtp , ResetOTPExpiry : Date.now() + 10 * 60 * 1000}} 
    );

    if(!result)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Email given by the user not found !"
        });
    }
    
    res.status(SuccessStatusCodes.ResourceCreated).json({
        msg : "Successfully sent an Otp to the registered email !"
    });
});
//Endpoint for deleting the User as per his/her request
app.delete("/LiveLink/User/Delete-Account" ,usermiddleware, async function(req:any , res)
{
    try{
        UserModel.deleteOne({
            _id : req.UserId
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : "Successfully Deleted the User !"
        }); 
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !"
        })
    }
});
// Endpoint for Creating Group 
app.post("/LiveLink/User/Create/Group" , async function(req:any , res)
{
    const name = req.body.name;
    const bio = req.body.bio;
    
    try{
        await GroupModel.create({
            creatorId : req.UserId , 
            name : name , 
            bio : bio
        });
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Group Created Successfully !"
        }); 
    }
    catch(e)
    {
        req.status(ServerErrors.InternalServerError).json({
            msg:"Internal Server Error !"
        });
    }
});
// Endpoints for making some changes in Profile of User
app.post("/LiveLink/User/Profile" , usermiddleware , async function(req:any , res)
{
    const Choice:string = req.body.choice;
    
    const name = req.body.name;
    const email = req.body.email;
        try
        {
            await UserModel.updateOne(
                { _id : req.UserId }, 
                { $set: {name : name , email : email}} 
            ); 
            res.status(SuccessStatusCodes.Success).json({
                msg : "Profile updated Successfully !"   
            });
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error !"
            });
        }
});
// Making the Changes into the Group info
app.post("/LiveLink/User/Group-Info" , usermiddleware, async function(req:any , res)
{
    const groupId = req.body.GroupId;
    const name = req.name;
    const bio = req.body.bio;
    
    try
        {
            await GroupModel.updateOne(
                { _id : groupId }, 
                { $set: {name : name , bio : bio}} 
            ); 
            res.status(SuccessStatusCodes.Success).json({
                msg : "Group Info updated Successfully !"   
            });
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error !"
            });
        }
})
// Endpoint for sending Messages to the user
app.post("/LiveLink/User/Messaging" , function(req,res)
{
});
app.listen(3000);