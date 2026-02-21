import express from "express" ; 
import cors from "cors";
import UserRouter from "./Router/User/User";
import GroupRouter from "./Router/Group/Group";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "./StatusCodes";
import { app } from "./Sockets/socket";
import { httpServer } from "./Sockets/socket";
import UserToUserMessageRouter from "./Router/Messaging/UsertoUser/PersonalCommunication";

app.use(express.json());
app.use(cors());

//Routing of the original endpoints in express App
app.use("/LiveLink/Users" , UserRouter);
app.use("/LiveLink/Group" , GroupRouter);
app.use("/LiveLink/Message/UserToUser" , UserToUserMessageRouter);

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