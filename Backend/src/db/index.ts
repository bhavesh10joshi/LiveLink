import mongoose from "mongoose";
import {Schema , model} from "mongoose"
const DB_LINK : string = "mongodb+srv://josh10bhavesh:zp6aCDbTSZOd1ydK@cluster0.nd6zk.mongodb.net/LiveLink?retryWrites=true&w=majority&appName=Cluster0";

const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(DB_LINK);

// contains some necessary details of the users 
const user = new Schema({
    email : {type : String , requied : true , unique : true} ,
    password : {type : String , required : true , unique: true} , 
    name : {type : String} , 
    // image that the use will be uploading as per his/her preference has to be implemented 
    UniqueId : {type : String , unique : true , required:true}   ,
    ResetOTP : {type : String} , 
    ResetOTPExpiry : {type : String}
});

// contains messages related information of that particular user 
const message = new Schema({
    time :  { type : String} , 
    reciever : {type : ObjectId},
    sender : {type : ObjectId},
    message : {type : String}   
}); 

// contains all the information related the groups 
const group = new Schema({
    creatorId : {type : ObjectId , required : true} ,
    name : {type : String},  
    // contains the image of the group that user set up
    bio : {type : String} ,
    UsersList : [{type : ObjectId}]  
});   

export const MessageModel = model("Message" , message) ;
export const GroupModel = model("Group" , group) ;
export const UserModel = model("User" , user);  