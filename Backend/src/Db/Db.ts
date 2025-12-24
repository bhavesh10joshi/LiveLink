import mongoose from "mongoose";
import { Schema , model} from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    username : {type : string , required : true , unique : true} , 
    password : {type : string , required : true , unique : true}  
});

export const UserModel = model("Users" , UserSchema);