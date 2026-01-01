import express from "express" ; 
import mongoose from "mongoose";
import UserRouter from "./Router/User";
import cors from "cors";
import {WebSocket , WebSocketServer} from "ws";

const App = express();
App.use(express.json());

//Opening WebSocketServer On 8080 Port
export const wss = new WebSocketServer({port :8080}); 

//To resolve out the Cors Error !
App.use(cors());

//The main function to resolve out the connection problem to the mongodb compass 
async function main()
{
    try{
        //Connecion with Your mongoDb Instance
        await mongoose.connect("mongodb+srv://josh10bhavesh:zp6aCDbTSZOd1ydK@cluster0.nd6zk.mongodb.net/LiveLink?retryWrites=true&w=majority&appName=Cluster0");
        App.listen(3000); 
    }
    catch(e)
    {
        console.log("Error Encountered While Connecting To Database !");
    }
}
main();

//UserRouter which deals with all the User API endpoints
App.use("/LiveLink/User" , UserRouter);