import mongoose from "mongoose";
import {Schema , model} from "mongoose"
import { boolean, string } from "zod";
import { UniqueId } from "../uuid";
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
    GroupList : [{
        name : {type : String} ,
        Groupprofilephoto : {type : String} , 
        Groupuniqueid : {type : String} ,
        about : {type : String} 
    }] ,
    PersonalMessagingList : [{
        name : {type : String} ,
        profilephoto : {type : String} , 
        uniqueid : {type : String} ,
        typingstatus : {type : Boolean , default:false} ,
        isonline : {type : Boolean , default : false} ,
        about : {type : String} 
    }] , 
});

// contains messages related information of that particular user 
const UserToUserMessage = new Schema({
    reciever : {type : ObjectId},
    sender : {type : ObjectId},
    messages : [{
        MessageType: { 
            type: String, 
            enum: ['Received', 'Sent'], 
            required: true 
        },
        ContentType : {type : String} ,
        Date : {type : String} ,
        time : {type : String} , 
        Content : {type : String}
    }]
}); 

const UserToGroupMessage = new Schema({
    groupUniqueId : {type : String},
    messages : [{
        ContentType : {type : String} ,
        Date : {type : String} ,
        time : {type : String} , 
        Content : {type : String},
        name : {type : String},
        senderUniqueId : {type : String}  
    }]
});

// contains all the information related the groups 
const group = new Schema({
    creatorUniqueId : {type : String , required : true} ,
    UniqueId : {type : String},
    name : {type : String},  
    GroupProfileImage : {type : String , default : "https://res.cloudinary.com/dumtrt8jf/image/upload/v1771816036/GroupAvatar_qvbz2x.jpg"} ,
    // contains the image of the group that user set up
    bio : {type : String} ,
    UsersList : [{
        name : {type : String} , 
        ProfileImage : {type : String},
        UserUniqueId : {type : String} ,
        UserId : {type : ObjectId} , 
        OnlineOrNot : {type : Boolean , default : true}
    }]
});   

const GroupInvitations = new Schema({
    RecieverId : {type : ObjectId} , 
    SenderId : {type : ObjectId} , 
    GroupUniqueId : {type : String} , 
    UniqueId : {type : String},
    SenderProfilePhoto : {type : String},
    GroupProfilePhoto : {type : String},
    Date : {type : String} , 
    Time : {type : String} , 
    NameOfSender : {type : String},
    GroupName : {type : String} ,
    SenderUniqueId : {type : String} 
});

const PersonalInvitations = new Schema({
    SenderId : {type : ObjectId} , 
    RecieverId : {type : ObjectId} ,
    SenderProfilePhoto : {type : String},
    UniqueId : {type : String},
    Date : {type : String} , 
    Time : {type : String} ,
    NameOfSender : {type : String},
    SenderUniqueId : {type : String} 
});

export const UserToUserMessageModel = model("UserToUserMessage" , UserToUserMessage) ;
export const UserToGroupMessageModel = model("UserToGroupMessage" , UserToGroupMessage) ;
export const GroupModel = model("Group" , group) ;
export const UserModel = model("User" , user);  
export const GroupInvitationsModel = model("GroupInvitations" , GroupInvitations);
export const PersonalInvitationsModel = model("PersonalInvitations" , PersonalInvitations);