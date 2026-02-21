import { UserToUserMessageModel , UserModel } from "../../../db";
import { usermiddleware } from "../../../Middleware/Index";
import { SuccessStatusCodes , ClientErrorStatusCodes ,ServerErrors } from "../../../StatusCodes";
import { Router } from "express";
import { getCurrentDate } from "../../../CurrentDate/Date";
import { CheckFortheFriend } from "../../../CheckForAFriend/CheckForaFriend";


const UserToUserMessageRouter = Router();


//for sending the Message from one user to another
UserToUserMessageRouter.post("/Send" , usermiddleware , async function(req:any , res)
{
    const RecieverId : String = req.body.RecieverId;
    // can be either be a text or image
    const ContentType : any = req.body.ContentType;
    // if the content is a Image then the Message will be the link of the image 
    const Message : any = req.body.Message;

    // checking whether the reciever of the message is still the friend of the sender
    const Friends = await UserModel.findById({
        _id : req.UserId
    });

    if(Friends)
    {
        const UserFriends = Friends.PersonalMessagingList;
        let val:Boolean = CheckFortheFriend(RecieverId , UserFriends);
        if(!val)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Reciever is no Longer your friend !"
            });
            return ;
        }
        else
        {
            try{
                await UserToUserMessageModel.create({
                    ContentType : ContentType , 
                    time : getCurrentDate(),
                    reciever : RecieverId , 
                    sender : req.UserId , 
                    message : Message
                });
                res.status(SuccessStatusCodes.Success).json({
                    msg : "Message Sent Successfully !"
                });
                return ;
            }
            catch(e)
            {
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Encountered !"
                });
                return ;
            }
        }
    }
    else
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "Resource not found !"
        });
        return;
    }
});
UserToUserMessageRouter.get("/Access/All" , usermiddleware , async function(req:any , res)
{
    const RecieverId : any = req.body.RecieverId;
    
    try{
        const data:any = await UserToUserMessageModel.find({
            reciever : RecieverId , 
            sender : req.UserId 
        });
        res.status(SuccessStatusCodes.Success).json({
            msg : data
        });
        return ;
    }
    catch(e)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "No messages were Found !"
        });
        return ;
    }
});

export default UserToUserMessageRouter;