import { Router } from "express";
import { UserModel, GroupModel , MessageModel ,GroupInvitationsModel , PersonalInvitationsModel } from "../../db";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "../../StatusCodes";
import { usermiddleware } from "../../Middleware/Index";
import { UniqueId } from "../../uuid";
import { server } from "typescript";

const GroupRouter = Router();

// Endpoint for Creating Group 
GroupRouter.post("/Create" ,usermiddleware, async function(req:any , res)
{
    const name = req.body.name;
    const bio = req.body.bio;
    const Id = UniqueId();
    
    try{
        await GroupModel.create({
            creatorId : req.UserId ,
            UniqueId : Id, 
            name : name , 
            bio : bio
        });
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Group Created Successfully !"
        }); 
    }
    catch(e)
    {
        req.status(ServerErrors.InternalServerError).json({
            msg:"Internal Server Error !"
        });
    }
});
// Making the Changes into the Group info
GroupRouter.post("/Profile/Edit" , usermiddleware, async function(req:any , res)
{
    const groupId = req.body.GroupId;
    const name = req.name;
    const bio = req.body.bio;
    
    try
        {
            await GroupModel.updateOne(
                { _id : groupId }, 
                { $set: {name : name , bio : bio}} 
            ); 
            res.status(SuccessStatusCodes.Success).json({
                msg : "Group Info updated Successfully !"   
            });
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error !"
            });
        }
});
// Endpoint for Sending a group invite to a user 
GroupRouter.post("/Add-Members/Send/Group-Invite" ,usermiddleware , async function(req:any , res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    const GroupId:any = await GroupModel.findOne({
        UniqueId : GroupUniqueId
    });

    if(!GroupId)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The Given group was not found by the user !"
        });
    }

    const UserUniqueId = req.body.UserUniqueId;
    const RecieverId = await UserModel.findOne({
        UniqueId : UserUniqueId
    });

    if(!RecieverId)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The Reciever of the Invitation is not valid !" 
        });
        return;
    }

    //Checking whether there is already an inviation or not
    const CheckForDuplicateInvitations = await GroupInvitationsModel.findOne({
        RecieverId : RecieverId._id , 
        SenderId : req.UserId , 
        GroupId : GroupId._id
    });

    if(CheckForDuplicateInvitations)
    {
        res.status(ClientErrorStatusCodes.Conflicts).json({
            msg : "This Invitation already exists for the particular Reciever and the Group !"
        });
        return ;
    }

    try{
        await GroupInvitationsModel.create({
            RecieverId : RecieverId._id , 
            SenderId : req.UserId , 
            GroupId : GroupId._id , 
            Status : false ,
            ReadOrNot : false 
        });
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Invitation sent Successfully !" 
        });
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error !" 
        });
    }
});
// Endpoint for Accepting or Rejecting the Request for Joining the Group
GroupRouter.post("/Invitation/Group-Invite" , usermiddleware , async function(req:any , res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    const Decision:boolean = req.body.Decision;

    //Finding if the Group Still exists
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
        // Accepted the Invitation of the sender
        const Invite = await GroupInvitationsModel.updateOne(
                { GroupId : FindGroup._id , RecieverId : req.UserId }, 
                { $set: {Status : true , ReadOrNot : true}} 
        );

        if(!Invite)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Invitation does not Exists"
            });
            return;
        }
        
        try{
            await UserModel.updateOne(
                { _id : req.UserId}, 
                { $push: {GroupList : FindGroup._id}} 
            );
            await GroupModel.updateOne(
                { _id : FindGroup._id}, 
                { $push: {UsersList : req.UserId}} 
            );
            res.status(SuccessStatusCodes.Success).json({
                msg : "Invitation Accepted Successfully !"
            });
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"  
            });
            return;
        }
        return;
    } 
    else
    {
        // Rejected the Invitation of the sender
        const Invite = await GroupInvitationsModel.updateOne(
                { GroupId : FindGroup._id , RecieverId : req.UserId }, 
                { $set: {Status : false , ReadOrNot : true}} 
        );

        if(!Invite)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Invitation does not Exists"
            });
            return;
        }

        res.status(SuccessStatusCodes.Success).json({
            msg : "Invitation Rejected Successfully !"
        });
        return;
    }
});
// Endpoint For deleting the group 
// Point to note is that the creator of the group can only delete the group no one else can delete it 
GroupRouter.delete("/Delete/Confirm" , usermiddleware , async function(req:any , res)
{
    // checking whether the user is the creator Of the group or not 
    const GroupUniqueId = req.body.GroupUniqueId;
    const Group = await GroupModel.findOne({
        UniqueId : GroupUniqueId
    });

    // Checking whether the Group exists or not 
    if(!Group)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The Given group does not exist !"
        });
        return;
    }

    const members = Group.UsersList;
    if(Group.creatorId == req.UserId)
    {   
        // Deleting the Group Reference in each and every user which was part of this group
        for(let i = 0 ; i < members.length ; i++)
        {
            const User = members[i];
            const result = await UserModel.updateOne(
                    { _id: User },
                    { 
                        $pull: { GroupList: Group._id } 
                    }
            );
            if(!result)
            {
                res.status(ClientErrorStatusCodes.Conflicts).json({
                    msg : "Invalid members of the Group !"
                });
                return;
            }
        }
        try{
            await GroupModel.deleteOne({
                _id : Group._id
            });
            res.status(SuccessStatusCodes.ResourceCreated).json({
                msg : "Successfully Deleted the Group !" 
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
        req.status(ClientErrorStatusCodes.Conflicts).json({
            msg : "You're not the Creator Of this group !"
        });
        return ;
    }
});
// Endpoint for Removing members from the Group !
GroupRouter.post("/Remove/Group-Member" , usermiddleware , async function(req:any , res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    const UserUniqueId = req.body.UserUniqueId;

    // Checking whether the Members still exists and also the Group Exists
    const Group = await GroupModel.findOne({
        UniqueId : GroupUniqueId
    });
    const User = await UserModel.findOne({
        UniqueId : UserUniqueId  
    });

    if(!Group || !User)
    {
        res.status(ClientErrorStatusCodes.ResourceNotFound).json({
            msg : "The user or the Group curretly Do not Exists!"
        });
        return;
    }
    else if(Group && User)
    {
        //Removing the User from the groupList and Removing the Group from Users GroupList
        try{
            await UserModel.updateOne(
                    { _id: User._id },
                    { 
                        $pull: { GroupList: Group._id } 
                    }
            );
            await GroupModel.updateOne(
                    { _id: User._id },
                    { 
                        $pull: { UsersList: User._id } 
                    }
            );
            res.status(SuccessStatusCodes.ResourceCreated).json({
                msg : "Successfully Removed !"
            });
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error !"
            });
        }
    }
});
// Endpoint For Editing the Group Profile Info of the Group
GroupRouter.post()

export default GroupRouter;