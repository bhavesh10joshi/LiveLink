import mongoose from "mongoose";
import {Schema , model} from "mongoose"
import { boolean, string } from "zod";
const ObjectId = mongoose.Types.ObjectId;

// contains some necessary details of the users 
const user = new Schema({
    email : {type : String , required : true , unique : true} ,
    password : {type : String , required : true , unique: true} , 
    name : {type : String} , 
    about : {type : String , default : "New to LiveLink..."} , 
    ProfilePhoto : {type : String , default : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"} , 
    // image that the use will be uploading as per his/her preference has to be implemented 
    UniqueId : {type : String , unique : true , required:true}   ,
    ResetOTP : {type : String} , 
    ResetOTPExpiry : {type : String} ,
    GroupList : [{type : ObjectId}] ,
    PersonalMessagingList : [{
        name : {type : string} ,
        profilephoto : {type : string} , 
        uniqueid : {type : string} ,
        typingstatus : {type:boolean , default:false} ,
        isonline : {type:boolean , default : false} ,
        about : {type:string} 
    }] , 
});

// contains messages related information of that particular user 
const UserToUserMessage = new Schema({
    reciever : {type : ObjectId},
    sender : {type : ObjectId},
    messages : [{
        ContentType : {type : String} ,
        time : {type : String} , 
        Content : {type : String}
    }]
}); 

const UserToGroupMessage = new Schema({
    groupId : {type : ObjectId},
    messages : [{
        ContentType : {type : String} ,
        time : {type : String} , 
        Content : {type : String},
        sender : {type : ObjectId}  
    }]
});

// contains all the information related the groups 
const group = new Schema({
    creatorId : {type : ObjectId , required : true} ,
    UniqueId : {type : String},
    name : {type : String},  
    GroupProfileImage : {type : String , default : "https://res.cloudinary.com/dumtrt8jf/image/upload/v1771816036/GroupAvatar_qvbz2x.jpg"} ,
    // contains the image of the group that user set up
    bio : {type : String} ,
    UsersList : [{type : ObjectId}]  
});   

const GroupInvitations = new Schema({
    RecieverId : {type : ObjectId} , 
    SenderId : {type : ObjectId} , 
    GroupId : {type : ObjectId} , 
        // If Status is true it means that the request accepted and if false means that rejected the request 
    Status : {type : Boolean} , 
    // if Readornot is false is true it means that he has markedit as read and if false it means they have not marked as read 
    ReadOrNot : {type : Boolean}
});

const PersonalInvitations = new Schema({
    SenderId : {type : ObjectId} , 
    RecieverId : {type : ObjectId} ,
    // the Invitation is valid till it is not been accepted or rejected by the user , suppose if the user rejects the proposal , then the invitation will automatically be deleted !
    Status : {type : Boolean} , 
    // if Readornot is false is true it means that he has markedit as read and if false it means they have not marked as read 
    ReadOrNot : {type : Boolean}    
});

export const UserToUserMessageModel = model("UserToUserMessage" , UserToUserMessage) ;
export const UserToGroupMessageModel = model("UserToGroupMessage" , UserToGroupMessage) ;
export const GroupModel = model("Group" , group) ;
export const UserModel = model("User" , user);  
export const GroupInvitationsModel = model("GroupInvitations" , GroupInvitations);
export const PersonalInvitationsModel = model("PersonalInvitations" , PersonalInvitations);