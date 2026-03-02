import {Router} from "express";
import { usermiddleware } from "../../../Middleware/Index";
import { UserModel , GroupModel , GroupInvitationsModel , PersonalInvitationsModel } from "../../../db";
import { UniqueId } from "../../../uuid";
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors } from "../../../StatusCodes";
import { getCurrentDate , getCurrentISTTime } from "../../../CurrentDateandTime/DateAndTime";

const InviteFromUserforUserRouter = Router();

// Endpoint for Getting all the profile details of the user 
InviteFromUserforUserRouter.post("/Personal/Message-Invite" , usermiddleware , async function(req:any , res)
{
    const PersonalInvitationUniqueId = req.body.PersonalInvitationUniqueId;
    const SenderUniqueId = req.body.SenderUniqueId;
    const Decision:boolean = req.body.Decision;

    // Checking if the Sender still exists 
    try{
        const FindSender = await UserModel.findOne({
            UniqueId : SenderUniqueId
        });
        if(!FindSender || !Decision)
        {
            // if find sender does not exists then simply delete the invitation !
            try
            {
                await PersonalInvitationsModel.deleteOne({
                    UniqueId : PersonalInvitationUniqueId
                });
                res.status(SuccessStatusCodes.Success).json({
                    msg : "No such Invitation exists !"
                });
                return;
            }
            catch(e)
            {
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error occurred !"
                });
                return;
            }
        }
        else
        {
            try
            {
                const Findreciever = await UserModel.findOne({
                    _id : req.UserId
                });
                if(!Findreciever)
                {
                    res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                        msg : "User does not exists !"
                    });
                    return;
                }
                const RecieverPayload = {
                    name : Findreciever.name , 
                    profilephoto : Findreciever.ProfilePhoto , 
                    uniqueid : Findreciever.UniqueId ,
                    about : Findreciever.about
                };
                const SenderPayload = {
                    name : FindSender.name , 
                    profilephoto : FindSender.ProfilePhoto , 
                    uniqueid : FindSender.UniqueId ,
                    about : Findreciever.about
                };
                // adding sender to the friendlist of reciever
                await UserModel.updateOne(
                    { _id : req.UserId}, 
                    { $push: {PersonalMessagingList : SenderPayload}} 
                );
                // adding reciever to the friendlist of sender
                await UserModel.updateOne(
                    { _id : FindSender._id}, 
                    { $push: {PersonalMessagingList : RecieverPayload}} 
                );
                await PersonalInvitationsModel.deleteOne({
                    UniqueId : PersonalInvitationUniqueId
                }); 
                res.status(SuccessStatusCodes.ResourceCreated).json({
                    msg : "Invitation accepted Successfully !"
                });
                return;
            }
            catch(e)
            {   
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Occurred !"
                });
                return;
            }
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Occurred !"
        });
        return;
    }
});

export default InviteFromUserforUserRouter;