import express from "express" ; 
import cors from "cors";
import UserRouter from "./Router/User/User";
import GroupRouter from "./Router/Group/Group";
import UserToUserMessageRouter from "./Router/Messaging/UsertoUser/PersonalCommunication";
import UserToGroupMessageRouter from "./Router/Messaging/UserToGroup/GroupCommunication";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

const DB_LINK : string = "mongodb+srv://josh10bhavesh:zp6aCDbTSZOd1ydK@cluster0.nd6zk.mongodb.net/LiveLink?retryWrites=true&w=majority&appName=Cluster0";

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
        await mongoose.connect(DB_LINK);
        app.listen(5000);
        console.log("Connected to Server !");
    }
    catch(e)
    {
        console.log("Server has no response !");
    }
}

