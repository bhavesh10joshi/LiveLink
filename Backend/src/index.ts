import express from "express" ; 
import cors from "cors";
import UserRouter from "./Router/User/User";
import GroupRouter from "./Router/Group/Group";
import UserToUserMessageRouter from "./Router/Messaging/UsertoUser/PersonalCommunication";
import UserToGroupMessageRouter from "./Router/Messaging/UserToGroup/GroupCommunication";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true
}));

app.use("/LiveLink/Users" , UserRouter);
app.use("/LiveLink/Users/Groups" , GroupRouter);
app.use("/LiveLink/Users/Message/UserToUser" , UserToUserMessageRouter);
app.use("/LiveLink/Users/Message/UserToGroup" , UserToGroupMessageRouter)

main();
//Main Function that has to be run !
async function main()
{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL as string);
        app.listen(5000);
        console.log("Connected to Server !");
    }
    catch(e)
    {
        console.log("Server has no response !");
    }
}

