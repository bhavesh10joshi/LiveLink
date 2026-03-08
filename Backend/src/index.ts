import express from "express" ; 
import cors from "cors";
import UserRouter from "./Router/User/User";
import GroupRouter from "./Router/Group/Group";
import UserToUserMessageRouter from "./Router/Messaging/UsertoUser/PersonalCommunication";
import UserToGroupMessageRouter from "./Router/Messaging/UserToGroup/GroupCommunication";
import PersonalNotificationsRouter from "./Router/Notifications/PersonalNotifications/PersonalNotification";
import GroupNotificationRouter from "./Router/Notifications/GroupNotifications/GroupNotification";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import InviteFromUserforGroupRouter from "./Router/SendInvites/FromUserForUser/ForGroup";
import InviteFromUserforUserRouter from "./Router/SendInvites/FromUserforGroup/ForUser";
import { SuccessStatusCodes } from "./StatusCodes";

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const Mongo_url = process.env.MONGO_DB_URL;

if (!Mongo_url) {
  throw new Error("Cloudinary environment variables are missing from .env!");
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true
}));

app.get("/" , function(req,res)
{
    res.status(SuccessStatusCodes.Success).send("Successfully Deployed the website ! ");
})

app.use("/LiveLink/Users" , UserRouter);
app.use("/LiveLink/Users/Groups" , GroupRouter);
app.use("/LiveLink/Users/Message/UserToUser" , UserToUserMessageRouter);
app.use("/LiveLink/Users/Message/UserToGroup" , UserToGroupMessageRouter);
app.use("/LiveLink/Users/Personal/Notifications",PersonalNotificationsRouter);
app.use("/LiveLink/Users/Group/Notifications",GroupNotificationRouter);
app.use("/LiveLink/Users/Invitation" , InviteFromUserforUserRouter);
app.use("/LiveLink/Users/Groups/Invitation" , InviteFromUserforGroupRouter);


main();
//Main Function that has to be run !
async function main()
{
    try{
        await mongoose.connect(Mongo_url as string);
        // (0.0.0.0) => i was doing this in normal form , but the wsl was not responding 
        //therefore i did in this form , so that it works correctly
        app.listen(5000 , '0.0.0.0', () => {
            console.log(`Server running on port 5000`);
        });
    }
    catch(e)
    {
        console.log("Server has no response !");
    }
}

