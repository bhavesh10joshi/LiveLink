import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { UserModel, GroupModel ,GroupInvitationsModel , PersonalInvitationsModel, UserToUserMessageModel } from "../../db";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "../../StatusCodes";
import { sendOTP } from "../../Nodemailer/emailvianode";
import { generateOTP } from "../../otp/otp";
import { usermiddleware } from "../../Middleware/Index";
import { UserObject , SignUpInput , passInput , passwordObject } from "../../ZodValidations";
import { UniqueId } from "../../uuid";
import cloudinary from "../../CloudinaryConfig/Cloudinary";
import { getCurrentDate, getCurrentISTTime } from "../../CurrentDateandTime/DateAndTime";

const UserRouter = Router();

// express endpoints
// endpoint For SigningUp into the  Application ! 
UserRouter.post("/SignUp" , async function(req,res)
{
    // const SignUp : SignUpInput = req.body;
    const name:any = req.body.name;
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
    const Id = UniqueId();

    if(hashedpassword)
    {
        try
        {
            UserModel.create({
                name : name,
                email : SignUp.email , 
                password : hashedpassword ,
                UniqueId : Id
            });
            res.status(SuccessStatusCodes.ResourceCreated).json({
                msg : "Successfully Created User !"
            });
            return;
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error !" 
            });
            return ;
        }
    }
    else
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !" 
        });
        return ;
    }
});
// Endpoint for Signing In into the Application 
UserRouter.post("/Login" , async function(req,res)
{
    const email : string = req.body.email ;
    const password : string = req.body.password ; 
    console.log("acha");
    try{
        const FindUser = await UserModel.findOne({
            email : email
        });
        console.log("hello");
        if(FindUser)
        {
            try
            {
                console.log("ok");
                const Checkpass = await bcrypt.compare(password , FindUser.password);
                if(Checkpass)
                {
                    console.log("thick bhai ");
                    const token = jwt.sign({
                        id : FindUser._id 
                    } , process.env.USER_SECRET as string);

                    res.status(SuccessStatusCodes.Success).json({
                        token : token
                    });
                    return;
                }
                else
                {
                    console.log("Error aaya");
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Error while comparing the passwords using bcrypt "
                    });
                    return;
                }
            } 
            catch(e)
            {
                console.log(process.env.USER_SECRET);
                console.log("yeyyeye "+e);
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Error while comparing the passwords using bcrypt " + e
                });
                return;
            }
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Email given was not found !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The Email given was not found !"
        });  
        return;
    }
});
// Endpoint for genrating the otp while changing the password of the email during the Login and sending it to the client Registered Email
UserRouter.post("/Login/ForgotPassword/otp-Generate" , async function(req,res)
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
UserRouter.post("/Otp/Authentication" , async function(req , res)
{
    const email = req.body.email;
    const otp = req.body.otp;
    console.log(otp);
    const FindUser:any = await UserModel.findOne({
        email : email ,
        ResetOTPExpiry: { $gt: Date.now() }
    });

    if(!FindUser)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Invalid Email or Otp"
        });
        return;
    }

    const verify = await bcrypt.compare(otp , FindUser?.ResetOTP);

    if(!verify)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Incorrect Otp Provided by the User !"
        });
        return;
    }
    
    res.status(SuccessStatusCodes.Success).json({
        msg : "Successfull Verification of the User !"
    });
    return;
}) ;
UserRouter.post("/Forgot-password/Change/password" , async function(req,res)
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
}) ;
//Everything after this needs token Authorization !
//Endpoint for updating the password !
UserRouter.post("/Profile/Change/password" ,usermiddleware, async function(req:any,res)
{
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
            { _id : req.UserId }, 
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
}) ;
//Endpoint for changing the password of the user from profile while logged in 
UserRouter.post("/Change/Password/otp-Generate" , usermiddleware , async function(req : any , res)
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
UserRouter.delete("/Delete/Account" ,usermiddleware, async function(req:any , res)
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
// Endpoint for sending a personal invite for start messaging from a user to a user
UserRouter.post("/Personal/Start-messaging/Send-Invite" ,usermiddleware,async function(req:any , res)
{
    const UserUniqueId = req.body.UserUniqueId;

    try{
        const FindSender:any = await UserModel.findOne({
            _id : req.UserId
        });
        if(!FindSender)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Error Occurred while finding the sender !"
            });
            return;
        } 
        try{
        // checking whether the User Exsts or not !
        const RecieverId = await UserModel.findOne({
            UniqueId : UserUniqueId
        });

        if(!RecieverId)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Invalid Reciever For the Invitation !"
            });
            return;
        }
        try{
            await PersonalInvitationsModel.create({
                SenderId : req.UserId , 
                RecieverId : RecieverId._id ,
                SenderProfilePhoto : FindSender.ProfilePhoto,
                UniqueId : UniqueId() , 
                Date : getCurrentDate() , 
                Time : getCurrentISTTime(),
                NameOfSender : FindSender.name , 
                SenderUniqueId : FindSender.UniqueId      
            });
            res.status(SuccessStatusCodes.ResourceCreated).json({
                msg : "Invitation Sent Successfully !"
            });
            return;
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Encountered !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Encountered !"
        });
        return;
    }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return;
    }
});
// Endpoints for making some changes in Profile of User
UserRouter.post("/Profile/Edit" , usermiddleware , async function(req:any , res)
{
    const name = req.body.name;
    const about = req.body.about;
        try
        {
            await UserModel.updateOne(
                { _id : req.UserId }, 
                { $set: {name : name , about : about}} 
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
// Endpoint for changing the profile image of the user
UserRouter.post("/Profile/Edit/Image" , usermiddleware , async function(req:any,res)
{
    const file = req.files.photo;

    try
    {
        await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error , result:any)
        {
            try{
                await UserModel.updateOne(
                    { _id : req.UserId }, 
                    { $set: { ProfilePhoto : result.url} }
                );
            }
            catch(e)
            {
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error !"
                });
                return ;
            }            
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : "Profile Photo Updated Successfully !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Cloudinary Server is Not responding !"
        });
        return ;
    }
});
UserRouter.get("/Profile/Details" , usermiddleware , async function(req:any,res)
{
    try
    {
        const data = await UserModel.findOne({
            _id : req.UserId  
        });
        if(data)
        {
            res.status(SuccessStatusCodes.Success).json({
                msg : data
            });
            return;
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "This User Does Not Exists !"
            });
            return ;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !"
        });
        return;
    }
});
UserRouter.get("/Get/Personal/Messaging/List" , usermiddleware , async function(req:any , res)
{
    try{
        const data = await UserModel.findOne({
            _id : req.UserId
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : data?.PersonalMessagingList
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
        return;
    }
});
UserRouter.post("/Unfriend" , usermiddleware , async function(req:any ,res)
{
    const FriendsUniqueId = req.body.FriendsUniqueId;

    try{
        await UserModel.findOneAndUpdate(
          { _id : req.UserId} ,
          {
            $pull : {
                PersonalMessagingList:{
                    uniqueid : FriendsUniqueId 
                }
            } 
          }
        );
        res.status(SuccessStatusCodes.Success).json({
            msg : "Unfriended user Successfully !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
        return;
    }
});
// function that returns the Users when searched for 
UserRouter.get("/Search", usermiddleware, async function(req: any, res) {
    const name = req.query.name;

    if (!name) {
        res.json({ msg: [] });
        return;
    }

    try {
        const Data = await UserModel.find({
            name: { 
                $regex: name, 
                $options: "i"
                // makes the search case insensitive 
            }
        });
        
        res.json({
            msg: Data
        });
        return;
    }
    catch(e) {
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred!"
        });
        return;
    }
});
export default UserRouter;