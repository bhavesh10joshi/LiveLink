import { UserToGroupMessageModel , GroupModel , UserModel} from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import { getCurrentDate } from "../../../CurrentDate/Date";
import cloudinary from "../../../CloudinaryConfig/Cloudinary";

const UserToGroupMessageRouter = Router();

UserToGroupMessageRouter.post("/Text/Send/toAll" , usermiddleware , async function(req:any , res)
{
    const GroupId : String = req.body.GroupId; 
    const ContentType : any = "text";
    const Message:any = req.body.Message;

    try{
        const sendChatMessage = async (senderId:any, groupId:any, messageContent:any) => {
        try {
            await UserToGroupMessageModel.findOneAndUpdate(
                // 1. Find a thread where these two are the sender/receiver
                {groupId: groupId }, 
                
                // 2. Push the new message into the array
                { 
                    $push: { 
                        messages: {
                            ContentType: ContentType ,
                            time: getCurrentDate(),
                            Content: Message,
                            sender: senderId
                        }
                    } 
                },
                
                // 3. Options: upsert will CREATE the document using the query + update data if it fails to find one!
                { new: true, upsert: true } 
            );
            } catch (error) {
                console.error("Error sending message:", error);
            }
        };
        sendChatMessage(req.UserId , GroupId , Message);
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
UserToGroupMessageRouter.post("/Image/Send/ToAll" , async function(req:any,res)
{
    const GroupId : String = req.body.RecieverId;
    const ContentType : any = "image";
    const file = req.files.photo;

    try
    {
        await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error , result:any)
        {
            const sendChatMessage = async (senderId:any, groupId:any, messageContent:any) => 
            {
                try {
                    await UserToGroupMessageModel.findOneAndUpdate(
                        // 1. Find a thread where these two are the sender/receiver
                        {groupId: groupId }, 
                        
                        // 2. Push the new message into the array
                        { 
                            $push: { 
                                messages: {
                                    ContentType: ContentType ,
                                    time: getCurrentDate(),
                                    Content: messageContent,
                                    sender: senderId
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
         sendChatMessage(req.UserId , GroupId , result.url);
        });
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
    const GroupId:String = req.body.GroupId;

    try
    {
        const data:any = await UserToGroupMessageModel.find({
            groupId : GroupId
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : data.messages
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !"
        });
        return;
    }
});
export default UserToGroupMessageRouter;