import mongoose from "mongoose";
import WebSocket from "ws";
import { Schema , model} from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

//User Schema for Storing User Login Details and Respective Socket details 
const Users = new Schema({
    username : {type : String , required : true , unique : true} , 
    password : {type : String , required : true , unique : true}  ,
    UserSocket : {type : WebSocket }
}); 

//ChatRoom Schema for storing room name , room id and Id of the Creator of that respective room
const ChatRoom = new Schema({
    RoomName : {type : String , required : true} , 
    RoomId : {type : String , required : true} ,
    CreatorId : {type : ObjectId}
});

//RoomDetails Schema for storing the members of the ResPective
const RoomDetails = new Schema({
    RoomId : {type : ObjectId} , 
    UserId : {type : ObjectId}
});

export const UserModel = model("Users" , Users);
export const ChatRoomModel = model("ChatRoom" , ChatRoom);
export const RoomModel = model("RoomDetails" , RoomDetails);  