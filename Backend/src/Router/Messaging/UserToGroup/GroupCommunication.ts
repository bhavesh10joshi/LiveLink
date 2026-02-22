import { UserToGroupMessageModel , GroupModel , UserModel} from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import { getCurrentDate } from "../../../CurrentDate/Date";
import { v2 as cloudinary } from 'cloudinary'


const UserToGroupMessageRouter = Router();

UserToGroupMessageRouter.post("/Text/Send/toAll" , usermiddleware , async function(req:any , res)
{
    const GroupId : String = req.body.GroupId; 
    const ContentType : any = req.body.ContentType;
    const Message:any = req.body.Message;

    try{
        await UserToGroupMessageModel.create({
            sender : req.UserId , 
            reciever : GroupId , 
            Message : Message , 
            time : getCurrentDate() , 
            ContentType : ContentType
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : "Message was sent !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
UserToGroupMessageRouter.post("/Image/Send/ToAll" , async function(req:any,res)
{
    const GroupId : String = req.body.RecieverId;
    const ContentType : any = "image";
    const file = req.files.photo;

    try
    {
        await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error , result:any)
        {
            await UserToGroupMessageModel.create({
                reciever : GroupId , 
                ContentType:ContentType , 
                sender : req.UserId , 
                Message : result.url , 
                time : getCurrentDate()  
            });
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : "The Message was sent successfully !"
        });
        return ;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Cloudinary File Uploader is not responding !"+e
        });
        return;
    }
})

UserToGroupMessageRouter.get("/Access/All" , usermiddleware , async function(req , res)
{
    const GroupId:String = req.body.GroupId;

    const data = await UserToGroupMessageModel.find({
        reciever : GroupId
    });

    if(!data)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "No messages found !"
        });
        return ;
    }

    res.status(SuccessStatusCodes.Success).json({
        msg : data
    });
    
})
export default UserToGroupMessageRouter;