import { UserToUserMessageModel , UserModel, PersonalInvitationsModel } from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import { getCurrentDate , getCurrentISTTime} from "../../../CurrentDateandTime/DateAndTime";
import { CheckFortheFriend } from "../../../CheckForAFriend/CheckForaFriend";
import { v2 as cloudinary } from 'cloudinary'
import { receiveMessageOnPort } from "worker_threads";
import { time } from "console";

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
                                    Date: getCurrentDate(),
                                    time : getCurrentISTTime() , 
                                    Content: messageContent,
                                    MessageType : "Sent" 
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
UserToUserMessageRouter.post("/Image/send", usermiddleware, async function(req: any, res: any) {
    const RecieverUniqueId: string = req.body.RecieverUniqueId;
    const ContentType = "image";

    if (!req.files || !req.files.photo) {
        return res.status(ClientErrorStatusCodes.BadRequest).json({
            msg: "No image file provided!"
        });
    }
    
    const file = req.files.photo;

    try {
        const FindReciever = await UserModel.findOne({
            UniqueId: RecieverUniqueId
        });

        if (!FindReciever) {
            return res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg: "Receiver was not found!"
            });
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath);
        
        if (!result || !result.url) {
             return res.status(ServerErrors.InternalServerError).json({
                 msg: "Cloudinary upload succeeded, but no URL was returned."
             });
        }

        await UserToUserMessageModel.findOneAndUpdate(
            { sender: req.UserId, reciever: FindReciever._id },
            { 
                $push: { 
                    messages: {
                        ContentType: ContentType,
                        Date: getCurrentDate(),
                        time : getCurrentISTTime() , 
                        Content: result.url , 
                        MessageType : "Sent" 
                    }
                } 
            },
            { new: true, upsert: true }
        );

        return res.status(SuccessStatusCodes.ResourceCreated).json({
            msg: "Message Sent!"
        });

    } catch (e) {
        console.error("Image Send Route Error:", e);
        return res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Encountered!"
        });
    }
});
UserToUserMessageRouter.get("/Access/Messages/All" , usermiddleware , async function(req:any , res)
{
    const RecieverUniqueId : any = req.query.RecieverUniqueId; 
    if(!RecieverUniqueId)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The Given request has no Information about the reciever !"
        });
        return;
    }
    try{
        const findUser:any = await UserModel.findOne({
            UniqueId : RecieverUniqueId
        });
        if(findUser)
        {
            try
            {
                const data = await UserToUserMessageModel.findOne({
                    sender : req.UserId , 
                    reciever : findUser._id
                });
                res.status(SuccessStatusCodes.Success).json({
                    msg : data?.messages
                });
                return;
            }
            catch(e)
            {
                console.log("Error Aaya "+e);
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Encountered !"
                });
                return;
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
        console.log("Nya error "+e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !"
        });
        return;
    }
});

export default UserToUserMessageRouter;