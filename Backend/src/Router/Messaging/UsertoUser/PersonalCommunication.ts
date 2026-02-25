import { UserToUserMessageModel , UserModel, PersonalInvitationsModel } from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import { getCurrentDate } from "../../../CurrentDate/Date";
import { CheckFortheFriend } from "../../../CheckForAFriend/CheckForaFriend";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME as string , 
  api_key: process.env.CLOUD_API_KEY as string , 
  api_secret: process.env.CLOUD_API_SECRET as string
});

const UserToUserMessageRouter = Router();

//for sending the Message from one user to another
UserToUserMessageRouter.post("/Text/Send" , usermiddleware , async function(req:any , res)
{
    const RecieverId : String = req.body.RecieverId;
    // can be either be a text or image
    const ContentType : any = "text";
    // if the content is a Image then the Message will be the link of the image 
    const Message : any = req.body.Message;

    try
    {
        const sendChatMessage = async (senderId:any, recieverId:any, messageContent:any) => {
        try {
            await UserToUserMessageModel.findOneAndUpdate(
                // 1. Find a thread where these two are the sender/receiver
                { sender: senderId, reciever: recieverId }, 
                
                // 2. Push the new message into the array
                { 
                    $push: { 
                        messages: {
                            ContentType: ContentType ,
                            time: getCurrentDate(),
                            Content: messageContent
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
        sendChatMessage(req.UserId , RecieverId , Message);
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Message Sent !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return ;
    }
});
UserToUserMessageRouter.post("/Image/send" , usermiddleware , async function(req:any,res)
{
    const RecieverId : string = req.body.RecieverId;
    const ContentType = "image";
    const file = req.files.photo;

    // checking whether the reciever of the message is still the friend of the sender
    try
    {
        await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error,result:any)
        {
            const sendChatMessage = async (senderId:any, recieverId:any, messageContent:any) => 
            {
                try {
                    await UserToUserMessageModel.findOneAndUpdate(
                        // 1. Find a thread where these two are the sender/receiver
                        { sender: senderId, reciever: recieverId }, 
                        
                        // 2. Push the new message into the array
                        { 
                            $push: { 
                                messages: {
                                    ContentType: ContentType ,
                                    time: getCurrentDate(),
                                    Content: messageContent
                                }
                            } 
                        },
                        
                        // 3. Options: upsert will CREATE the document using the query + update data if it fails to find one!
                        { new: true, upsert: true } 
                    );
                } 
                catch (e) {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error Occurred !"
                    });
                    return;
                }
                sendChatMessage(req.UserId , RecieverId , result.url);
                res.status(SuccessStatusCodes.ResourceCreated).json({
                    msg : "Message Sent !"
                });
                return;
            };
        });
    }           
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return ;
    }

})
UserToUserMessageRouter.get("/Access/Messages/All" , usermiddleware , async function(req:any , res)
{
    const RecieverId : any = req.body.RecieverId; 
    try
    {
        const data = await UserToUserMessageModel.findOne({
            sender : req.UserId , 
            reciever : RecieverId
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : data?.messages
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
});

export default UserToUserMessageRouter;