import { Router } from "express";
import { UserModel, GroupModel , GroupInvitationsModel} from "../../db";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "../../StatusCodes";
import { usermiddleware } from "../../Middleware/Index";
import { UniqueId } from "../../uuid";
import { CheckForaGroupMember } from "../../CheckforaGroupMember/CheckGroupMember";
import cloudinary from "../../CloudinaryConfig/Cloudinary";
import { getCurrentDate, getCurrentISTTime } from "../../CurrentDateandTime/DateAndTime";

const GroupRouter = Router();

GroupRouter.post("/Leave" , usermiddleware , async function(req:any,res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    try
    {
        const data = await GroupModel.findOne({
            UniqueId : GroupUniqueId
        });
        if(!data)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Group was not found !"
            });
            return;
        }
        try
        {
            // delete the group if there is only a single member 
            if(data.UsersList.length == 1)
            {   
                await GroupModel.deleteOne({
                    UniqueId : GroupUniqueId
                });
            }
            else
            {
                await GroupModel.findOneAndUpdate(
                    {UniqueId : GroupUniqueId} , 
                    {
                    $pull : {
                        UsersList : {
                            UserId : req.UserId
                        }
                    } 
                    },
                    {
                        new : true
                    }
                );
            }
            await UserModel.findOneAndUpdate(
                {_id : req.UserId} , 
                {
                    $pull:{
                        GroupList : {
                            Groupuniqueid : GroupUniqueId
                        }
                    }
                },
                {new:true}
            );
            res.status(SuccessStatusCodes.Success).json({
                msg : "Left group Successfully !"
            });
            return ;
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return ;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return ;
    }
});
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
            creatorUniqueId: creator.UniqueId,
            UsersList: [{
                name : creator.name , 
                ProfileImage : creator.ProfilePhoto , 
                UserUniqueId : creator.UniqueId , 
                UserId : req.UserId , 
            }]
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
// Endpoint For deleting the group 
// Point to note is that the creator of the group can only delete the group no one else can delete it 
GroupRouter.post("/Delete/Confirm" , usermiddleware , async function(req:any , res)
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
    // Deleting the Group Reference in each and every user which was part of this group
    for(let i = 0 ; i < members.length ; i++)
    {
        const User = members[i];
        const result = await UserModel.updateOne(
                { _id: User },
                { 
                    $pull: { GroupList: {
                     Groupuniqueid : GroupUniqueId 
                    }} 
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
});
// Endpoint for Sending a group invite to a user 
GroupRouter.post("/Add-Members/Send/Group-Invite" ,usermiddleware , async function(req:any , res)
{
    const GroupUniqueId = req.body.GroupUniqueId;
    const RecieverUniqueId = req.body.RecieverUniqueId;

    try
    {
        const FindSender:any = await UserModel.findOne({
            _id : req.UserId
        });
        if(!FindSender){
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Error Occurred while Finding the sender !"
            });
            return;
        }
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
                            GroupUniqueId : findgroup.UniqueId  ,
                            UniqueId : UniqueId() , 
                            Time : getCurrentISTTime() , 
                            Date : getCurrentDate() ,
                            GroupProfilePhoto : findgroup.GroupProfileImage,
                            SenderProfilePhoto :  FindSender.ProfilePhoto , 
                            NameOfSender : FindSender.name,
                            GroupName : findgroup.name , 
                            SenderUniqueId : FindSender.UniqueId
                        });
                        res.status(SuccessStatusCodes.Success).json({
                            msg : "Invitation Sent Successfully !"
                        });
                        return;
                    }
                    catch(e)
                    {
                        console.log("1"+e);
                        res.status(ServerErrors.InternalServerError).json({
                            msg : "Internal Server Error Encountered !"
                        });
                        return;
                    }
                }
                catch(e)
                {
                    console.log("2"+e);
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error Encountered !"
                    });
                    return;
                }
            }
        }
        catch(e)
        {
            console.log("3"+e);
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
                        $pull: { GroupList: 
                            {
                               Groupuniqueid : GroupUniqueId 
                            } 
                        }
                    }
            );
            await GroupModel.updateOne(
                    { _id: Group._id },
                    { 
                        $pull: { UsersList: 
                            {
                               UserUniqueId : UserUniqueId 
                            } 
                        }
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
    const UniqueGroupId = req.body.UniqueGroupId ;
   
    try
    {
        await GroupModel.updateOne(
            {   UniqueId: UniqueGroupId },
            { $set: {name : name , bio : bio}} 
        );
        try
        {
            async function updateGroupDetails( UniqueGroupId:any, newName:any, newAbout:any) {
                try {
                    await UserModel.findOneAndUpdate(
                        { 
                            _id: req.UserId, 
                            "GroupList.Groupuniqueid": UniqueGroupId 
                        },
                        { 
                            $set: { 
                            "GroupList.$.name": newName,
                            "GroupList.$.about": newAbout
                            } 
                        },
                        { new: true } 
                    );  
                } 
                catch (e) 
                {
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error Occured !"
                    });
                    return ;
                }
            }
            updateGroupDetails(UniqueGroupId, name , bio );
        }
        catch(e)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occured !"
            });
            return ;  
        }
        res.status(SuccessStatusCodes.Success).json({
            msg : "Profile Edited Successfully !"
        });
        return;
    }
    catch(e)
    {
        console.log(e);
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
    const UniqueGroupId = req.body.UniqueGroupId ;

    //Checking if the user is the member of the group and if he/she is the creator of the group
    
    try
    {
        await cloudinary.uploader.upload(file.tempFilePath , async function(err:Error , result:any)
        {
            try
            {
                await GroupModel.updateOne(
                    {UniqueId : UniqueGroupId},
                    { $set : {GroupProfileImage :result.url}}
                );
                try
                {
                    async function updateGroupDetails( UniqueGroupId:any, newUrl:any) {
                        try {
                            await UserModel.findOneAndUpdate(
                                { 
                                    _id: req.UserId, 
                                    "GroupList.Groupuniqueid": UniqueGroupId 
                                },
                                { 
                                    $set: { 
                                    "GroupList.$.Groupprofilephoto": newUrl
                                    } 
                                },
                                { new: true } 
                            );  
                        } 
                        catch (e) 
                        {
                            console.log("acha thick hei ",e);
                            res.status(ServerErrors.InternalServerError).json({
                                msg : "Internal Server Error Occured !"
                            });
                            return ;
                        }
                    }
                    updateGroupDetails(UniqueGroupId, result.url );
                }
                catch(e)
                {
                    console.log("acha kya baat ",e);
                    res.status(ServerErrors.InternalServerError).json({
                        msg : "Internal Server Error Occured !"
                    });
                    return ;  
                }
            }
            catch(e)
            {
                console.log("acha ",e);
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
        console.log(e);
        res.status(ServerErrors.InternalServerError).json({
            msg : "Cloudinary Server is not responding !"
        });
        return ;
    }   
});
GroupRouter.get("/Details/Get" , usermiddleware , async function(req:any,res:any)
{   
    console.log("hi");
    const GroupUniqueId:any = req.query.GroupUniqueId;
    try{
        const data = await GroupModel.findOne({
            UniqueId : GroupUniqueId
        });
        if(!data)
        {
            console.log("Ho gya !");
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The given Group was not found !"
            });
            return;
        }
        console.log(data);
        res.status(SuccessStatusCodes.Success).json({
            msg : data
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
export default GroupRouter;