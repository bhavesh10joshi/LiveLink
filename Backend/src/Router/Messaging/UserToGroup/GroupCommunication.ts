import { UserToGroupMessageModel , GroupModel , UserModel} from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import cloudinary from "../../../CloudinaryConfig/Cloudinary";
import { getCurrentDate , getCurrentISTTime } from "../../../CurrentDateandTime/DateAndTime";
const UserToGroupMessageRouter = Router();

UserToGroupMessageRouter.post("/Text/Send/toAll" , usermiddleware , async function(req:any , res)
{
    const groupUniqueId : String = req.body.groupUniqueId; 
    const ContentType : any = "text";
    const Message:any = req.body.Message;

    try{
        const FindSender:any = await UserModel.findOne({
            _id : req.UserId 
        });
        const sendChatMessage = async () => {
        try {
            await UserToGroupMessageModel.findOneAndUpdate(
                // 1. Find a thread where these two are the sender/receiver
                {groupUniqueId: groupUniqueId }, 
                
                // 2. Push the new message into the array
                { 
                    $push: { 
                        messages: {
                            ContentType: ContentType ,
                            Date: getCurrentDate(),
                            time : getCurrentISTTime() , 
                            Content: Message,
                            senderUniqueId: FindSender.UniqueId,
                            name : FindSender.name
                        }
                    } 
                },
                
                // 3. Options: upsert will CREATE the document using the query + update data if it fails to find one!
                { new: true, upsert: true } 
            );
            } catch (error) {
                console.error("Error sending message:", error);
                return;
            }
        };
        sendChatMessage();
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Message Sent !"
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
UserToGroupMessageRouter.post("/Image/Send/ToAll" , usermiddleware , async function(req:any,res)
{
    const groupUniqueId : any = req.body.groupUniqueId;
    const ContentType : any = "image";
    const file = req.files.photo;

    try
    {
        const FindSender:any = await UserModel.findOne({
            _id : req.UserId 
        });
        await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error , result:any)
        {
            const sendChatMessage = async (messageContent:any) => 
            {
                try {
                    await UserToGroupMessageModel.findOneAndUpdate(
                        // 1. Find a thread where these two are the sender/receiver
                        {groupUniqueId: groupUniqueId }, 
                        
                        // 2. Push the new message into the array
                        { 
                            $push: { 
                                messages: {
                                    ContentType: ContentType ,
                                    Date: getCurrentDate(),
                                    time : getCurrentISTTime() , 
                                    Content: messageContent,
                                    senderUniqueId: FindSender.UniqueId,
                                    name : FindSender.name
                                }
                            } 
                        },
                        
                        // 3. Options: upsert will CREATE the document using the query + update data if it fails to find one!
                        { new: true, upsert: true } 
                );
                } catch(e) {
                    console.error("Error sending message:", e);
                    return;
                }
                res.status(SuccessStatusCodes.ResourceCreated).json({
                    msg : "Message Sent !"
                });
                return;
            };
         sendChatMessage(result.url);
        });
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Message Sent!"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.NoServerResponse).json({
            msg : "Cloudinary File Uploader is not responding !" + e
        });
        return ;
    }
})
UserToGroupMessageRouter.get("/Access/All" , usermiddleware , async function(req , res)
{
    const groupUniqueId:any = req.query.groupUniqueId;

    try
    {
        const data:any = await UserToGroupMessageModel.find({
            groupUniqueId : groupUniqueId
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : data
        });
        return;
    }
    catch(e)
    {
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !"
        });
        return;
    }
});
export default UserToGroupMessageRouter;