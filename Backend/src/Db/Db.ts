import mongoose from "mongoose";
import WebSocket from "ws";
import { Schema , model} from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

//User Schema for Storing User Login Details and Respective Socket details 
const Users = new Schema({
    username : {type : String , required : true , unique : true} , 
    password : {type : String , required : true , unique : true}  ,
    UserSocket : {type : WebSocket , default : null} , 
    ChatRoomId : {type : String , default : null}
    // UserSocket will be only included when the User Joins a room !
    // If the User is at the dashboard then the User will have no UserSocket
}); 

//ChatRoom Schema for storing room name , room id and Id of the Creator of that respective room
const ChatRoom = new Schema({
    RoomName : {type : String , required : true} , 
    RoomId : {type : String , required : true} ,
    CreatorId : {type : ObjectId} ,
    Totalmembers : {type : Number}
});

export const UserModel = model("Users" , Users);
export const ChatRoomModel = model("ChatRoom" , ChatRoom);