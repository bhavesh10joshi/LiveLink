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
    const RecieverUniqueId : String = req.body.RecieverUniqueId;
    // can be either be a text or image
    const ContentType : any = "text";
    // if the content is a Image then the Message will be the link of the image 
    const Message : any = req.body.Message;

    try
    {
        const FindReciever = await UserModel.findOne({
            UniqueId : RecieverUniqueId
        });
        if(FindReciever)
        {
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
                sendChatMessage(req.UserId , FindReciever._id , Message);
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
        }
        else
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Encountered !"
            });
            return ;
        }
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
    const RecieverUniqueId : string = req.body.RecieverUniqueId;
    const ContentType = "image";
    const file = req.files.photo;
    console.log("hello");
    // checking whether the reciever of the message is still the friend of the sender
    try
    {
        const FindReciever = await UserModel.findOne({
            UniqueId :  RecieverUniqueId
        });
        console.log("hi");
        if(FindReciever)
        {
            try
            {
                await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error,result:any)
                {
                    console.log("acha");
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
                        sendChatMessage(req.UserId , FindReciever._id , result.url);
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
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Reciever was not found !"
            });
            return;
        }
    }   
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !"
        });
        return;
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