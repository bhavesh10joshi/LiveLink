import { Router } from "express";
import { UserModel, GroupModel , GroupInvitationsModel} from "../../db";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "../../StatusCodes";
import { usermiddleware } from "../../Middleware/Index";
import { UniqueId } from "../../uuid";
import { CheckForaGroupMember } from "../../CheckforaGroupMember/CheckGroupMember";
import cloudinary from "../../CloudinaryConfig/Cloudinary";
import { success } from "zod";
import { ServerRouter } from "react-router-dom";

const GroupRouter = Router();

GroupRouter.post("/Create", usermiddleware, async function(req: any, res) {
    const { name, bio } = req.body;
    const file = req.files?.photo;
    const Id = UniqueId();

    if (!file) {
        return res.status(400).json({ msg: "No photo uploaded!" });
    }

    try {
        const creator: any = await UserModel.findOne({ _id: req.UserId });
        
        // 1. Await the upload directly (No callback!)
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        console.log("Cloudinary Upload Result: " + result.url);

        // 2. Create the Group
        const created = await GroupModel.create({
            name: name,
            UniqueId: Id,
            GroupProfileImage: result.url,
            bio: bio,
            creatorId: req.UserId,
            UsersList: [creator._id]
        });

        // 3. Update the User
        if (created) {
            await UserModel.updateOne(
                { _id: req.UserId },
                {
                    $push: {
                        GroupList : {
                            name: created.name,
                            Groupprofilephoto: created.GroupProfileImage,
                            Groupuniqueid: created.UniqueId,
                            about: created.bio
                        }
                    }
                }
            );

            console.log("Group Created Success!");
            return res.status(SuccessStatusCodes.Success).json({
                msg: "Group Created Successfully!"
            });
        }

    } catch (e: any) {
        // This will now properly catch BOTH Cloudinary network errors and DB errors
        console.error("Error encountered:", e);
        return res.status(ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Encountered!"
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
    const RecieverUniqueId = req.body.RecieverId;
    try{
        // checking if the reciever is already the participant of the group
        const reciever:any = await UserModel.findOne({
            UniqueId : RecieverUniqueId
        });
        const IsMember = reciever?.GroupList.some((user:any) => user.Groupuniqueid == GroupUniqueId);
        if(IsMember)
        {
            res.status(ClientErrorStatusCodes.Conflicts).json({
                msg : "User is  already a member"
            });
            return;
        }
        else
        {
            try{
                const findgroup:any = await GroupModel.findOne({
                    UniqueId : GroupUniqueId
                });
                try{
                    await GroupInvitationsModel.create({
                        RecieverId : reciever._id , 
                        SenderId : req.UserId  ,
                        GroupId : findgroup._id  ,
                        UniqueId : UniqueId()
                    });
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Invitation Sent Successfully !"
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
            }
            catch(e)
            {
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Encountered !"
                });
                return;
            }
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Encountered !"
        });
        return;
    }
});
// Endpoint for Accepting or Rejecting the Request for Joining the Group
GroupRouter.post("/Invitation/Group-Invite" , usermiddleware , async function(req:any , res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    const GroupInvitationUniqueId = req.body.GroupInvitationUniqueId;
    const Decision:boolean = req.body.Decision;
    //Finding if the Group Still exists
    try{
        const FindSender:any = await UserModel.findOne({
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
                            name : FindSender.name , 
                            ProfileImage :FindSender.ProfilePhoto
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
                    { _id: Group._id },
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
GroupRouter.post("/Edit/Group/Profile" , usermiddleware , async function(req:any,res)
{
    const name = req.body.name;
    const bio = req.body.bio;
    const UniqueGroupId = req.body.GroupId ;
    const UserId:String = req.UserId;
    //Checking if the user is the member of the group and if he/she is the creator of the group
    try
    {
        const data:any = await GroupModel.findOne({
            UniqueId : UniqueGroupId
        });
        if(data)
        {
            // Checking if the User Belongs to this group and if he is the creator or not ??
            if(CheckForaGroupMember(data.UsersList , UserId , data.creatorId))
            {
                await GroupModel.updateOne(
                    { _id: data._id },
                    { $set: {name : name , bio : bio}} 
                );
                res.status(SuccessStatusCodes.Success).json({
                    msg : "Profile Edited Successfully !"
                });
                return;
            }
            else
            {
                res.status(ClientErrorStatusCodes.FailedValidation).json({
                    msg : "You're not an Admin !"
                })
            }
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Given Group Does not exists !"
            });
            return ;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
        return ;
    }  
});
// Endpoint for Updating the Group Profile Image
GroupRouter.post("/Edit/Group/Profile/Image" , usermiddleware , async function(req:any,res)
{
    const file = req.files.photo;
    const UniqueGroupId = req.body.GroupId ;
    const UserId:String = req.UserId;
    //Checking if the user is the member of the group and if he/she is the creator of the group
    try
    {
        const data:any = await GroupModel.findOne({
            UniqueId : UniqueGroupId
        });
        if(data)
        {
            // Checking if the User Belongs to this group and if he is the creator or not ??
            if(CheckForaGroupMember(data.UsersList , UserId , data.creatorId))
            {
                try
                {
                    await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error , result:any)
                    {
                        try
                        {
                            await GroupModel.updateOne(
                                {_id : data._id},
                                { $set : {GroupProfileImage :result.url}}
                            );
                        }
                        catch(e)
                        {
                            res.status(ServerErrors.InternalServerError).json({
                                msg : "Internal Server Error !"
                            });
                            return ;
                        }
                    });
                    res.status(SuccessStatusCodes.Success).json({
                        msg : "Profile Updated Successfully !"
                    });
                    return;
                }
                catch(e)
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Cloudinary Server is not responding !"
                    });
                    return ;
                }
            }
            else
            {
                res.status(ClientErrorStatusCodes.FailedValidation).json({
                    msg : "You're not an Admin !"
                })
            }
        }
        else
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Given Group Does not exists !"
            });
            return ;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occured !"
        });
        return ;
    }    
});

export default GroupRouter;