import { UserToGroupMessageModel , GroupModel , UserModel} from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import { getCurrentDate } from "../../../CurrentDate/Date";

const UserToGroupMessageRouter = Router();

UserToGroupMessageRouter.post("/Send/toAll" , usermiddleware , async function(req:any , res)
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
})

UserToGroupMessageRouter.get("Access/All" , usermiddleware , async function(req , res)
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