import {Router} from "express";
import { usermiddleware } from "../../../Middleware/Index";
import { UserModel , GroupModel , GroupInvitationsModel , PersonalInvitationsModel } from "../../../db";
import { UniqueId } from "../../../uuid";
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors } from "../../../StatusCodes";
import { getCurrentDate , getCurrentISTTime } from "../../../CurrentDateandTime/DateAndTime";

const GroupNotificationRouter = Router();

GroupNotificationRouter.get("/Get/All" , usermiddleware , async function(req:any , res:any)
{
    try
    {
        const data = await GroupInvitationsModel.find({
            RecieverId : req.UserId 
        });
        if(data)
        {
            res.status(SuccessStatusCodes.Success).json({
                msg : data
            });
            return;
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "No Personal Invitations found !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
export default GroupNotificationRouter;
