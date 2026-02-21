import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { UserModel, GroupModel ,GroupInvitationsModel , PersonalInvitationsModel } from "../../db";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "../../StatusCodes";
import { sendOTP } from "../../Nodemailer/emailvianode";
import { generateOTP } from "../../otp/otp";
import { usermiddleware } from "../../Middleware/Index";
import { UserObject , SignUpInput , passInput , passwordObject } from "../../ZodValidations";
import { UniqueId } from "../../uuid";

const USER_SECRET : string = "tokengenerationsecretforjwtusers";
const UserRouter = Router();

// express endpoints
// endpoint For SigningUp into the  Application ! 
UserRouter.post("/SignUp" , async function(req,res)
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
    const Id = UniqueId();

    if(hashedpassword)
    {
        UserModel.create({
            email : SignUp.email , 
            password : hashedpassword ,
            UniqueId : Id
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
UserRouter.post("/Login" , async function(req,res)
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
UserRouter.post("/change/password" , async function(req,res)
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
//Endpoint for changing the password of the user from profile while logged in 
UserRouter.post("/change/Password/otp-Generate" , usermiddleware , async function(req : any , res)
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
// Endpoints for making some changes in Profile of User
UserRouter.post("/Profile/Edit" , usermiddleware , async function(req:any , res)
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
// Endpoint for sending a personal invite for start messaging from a user to a user
UserRouter.post("/Personal/Start-messaging/Send-Invite" ,usermiddleware,async function(req:any , res)
{
    const UserUniqueId = req.body.UserUniqueId;

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

    // Checking whether there is already a request pending or not !
    const CheckInvitation = await PersonalInvitationsModel.findOne({
        SenderId : req.UserId , 
        RecieverId : RecieverId._id 
    }); 

    if(CheckInvitation)
    {
        res.status(ClientErrorStatusCodes.Conflicts).json({
            msg : "Invitation Already Exists !"
        });
        return;
    }   

    try{
        await PersonalInvitationsModel.create({
            SenderId : req.UserId , 
            RecieverId : RecieverId._id ,
            Status : false ,
            ReadOrNot : false 
        });
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Invitation Sent Successfully !"
        });
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return;
    }
});
// Endpoints For Accepting or Rejecting the Invitation For Joining the Personal Chat
UserRouter.post("/Invitation/Personal/Message-Invite" , usermiddleware , async function(req:any , res)
{
    const SenderUniqueId = req.body.SenderUniqueId;
    const Decision:boolean = req.body.Decision;

    //Finding if the Sender Still exists
    const FindSender:any = await UserModel.findOne({
        UniqueId : SenderUniqueId
    });

    if(!FindSender)
    {
        res.status(ClientErrorStatusCodes.Conflicts).json({
            msg : "The Sender of the Invite Does not exists !"
        });
        return;
    }

    if(Decision)
    {
        // Accepted the Invitation of the sender
        const Invite = await PersonalInvitationsModel.updateOne(
                { SenderId : FindSender._id , RecieverId : req.UserId }, 
                { $set: {Status : true , ReadOrNot : true}} 
        );

        if(!Invite)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Invitation does not Exists"
            });
            return;
        }
        
        try{
            await UserModel.updateOne(
                { _id : req.UserId}, 
                { $push: {PersonalMessagingList : FindSender._id}} 
            );
            await UserModel.updateOne(
                { _id : FindSender._id}, 
                { $push: {PersonalMessagingList : req.UserId}} 
            );
            res.status(SuccessStatusCodes.Success).json({
                msg : "Invitation Accepted Successfully !"
            });
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"  
            });
            return;
        }
        return;
    } 
    else
    {
        // Rejected the Invitation of the sender
        const Invite = await PersonalInvitationsModel.updateOne(
                { SenderId : FindSender._id , RecieverId : req.UserId }, 
                { $set: {Status : false , ReadOrNot : true}} 
        );

        if(!Invite)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Invitation does not Exists"
            });
            return;
        }

        res.status(SuccessStatusCodes.Success).json({
            msg : "Invitation Rejected Successfully !"
        });
        return;
    }
});
export default UserRouter;