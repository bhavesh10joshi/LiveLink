import express from "express" ; 
import cors from "cors";
import UserRouter from "./Router/User/User";
import GroupRouter from "./Router/Group/Group";
import { app } from "./Sockets/socket";
import { httpServer } from "./Sockets/socket";
import UserToUserMessageRouter from "./Router/Messaging/UsertoUser/PersonalCommunication";
import UserToGroupMessageRouter from "./Router/Messaging/UserToGroup/GroupCommunication";

app.use(express.json());
app.use(cors());

//Routing of the original endpoints in express App
app.use("/LiveLink/Users" , UserRouter);
app.use("/LiveLink/Users/Groups" , GroupRouter);
app.use("/LiveLink/Users/Message/UserToUser" , UserToUserMessageRouter);
app.use("/LiveLink/Users/Message/UserToGroup" , UserToGroupMessageRouter)

//Main Function that has to be run !
async function main()
{
    try{
        httpServer.listen(3000 , function(){
            console.log("Connected To server properly on port 3000 !")
        });
    }
    catch(e)
    {
        console.log("Server has no response !");
    }
}
main();