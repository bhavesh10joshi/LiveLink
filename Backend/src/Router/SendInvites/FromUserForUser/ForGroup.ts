import {Router} from "express";
import { usermiddleware } from "../../../Middleware/Index";
import { UserModel , GroupModel , GroupInvitationsModel , PersonalInvitationsModel } from "../../../db";
import { UniqueId } from "../../../uuid";
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors } from "../../../StatusCodes";
import { getCurrentDate , getCurrentISTTime } from "../../../CurrentDateandTime/DateAndTime";

const InviteFromUserforGroupRouter = Router();

// Endpoint for Accepting or Rejecting the Request for Joining the Group
InviteFromUserforGroupRouter.post("/Group-Invite" , usermiddleware , async function(req:any , res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    const GroupInvitationUniqueId = req.body.GroupInvitationUniqueId;
    const Decision:boolean = req.body.Decision;
    //Finding if the Group Still exists
    try{
        const FindReciever:any = await UserModel.findOne({
            _id : req.UserId
        });
        try{
            const FindGroup:any = await GroupModel.findOne({
                UniqueId : GroupUniqueId
            });
            if(!FindGroup)
            {
                res.status(ClientErrorStatusCodes.Conflicts).json({
                    msg : "The Given Group Does Not Exists !"
                });
                return;
            }
            if(Decision)
            {
                try{
                    await GroupInvitationsModel.deleteOne({
                        UniqueId : GroupInvitationUniqueId
                    });
                    await UserModel.updateOne(
                        { _id : req.UserId}, 
                        { $push: {GroupList : {
                            name : FindGroup.name ,
                            Groupprofilephoto:FindGroup.GroupProfileImage,
                            Groupuniqueid:FindGroup.UniqueId,
                            about:FindGroup.bio,
                        }}} 
                    );
                    await GroupModel.updateOne(
                        { _id : FindGroup._id}, 
                        { $push: {UsersList : {
                            name : FindReciever.name , 
                            ProfileImage :FindReciever.ProfilePhoto,
                            UserUniqueId : FindReciever.UniqueId , 
                            UserId : FindReciever._id
                        }}} 
                    );
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Invitation Accepted Successfully !"
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error Occured !"
                    });
                    return;
                }
            } 
            else
            {
                try{
                    await GroupInvitationsModel.deleteOne({
                        UniqueId : GroupInvitationUniqueId
                    });
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Invitation rejected Successfully !"
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error Occured !"
                    });
                    return;
                }
            }
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occured !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
        return;
    }
});
export default InviteFromUserforGroupRouter;