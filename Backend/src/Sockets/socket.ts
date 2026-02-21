import express from "express";
import { createServer } from "http" ; 
import {Server} from "socket.io";
import cors from "cors";

export const app = express();

export const httpServer = createServer(app);

const io = new Server(httpServer , {
    cors : {
        origin  : "https://localhost:3000" , 
        methods : ["GET" , "POST" , "DELETE"] , 
        credentials : true
    }
});

io.on("connection" , function(socket)
{
    console.log(`User connected to livelink socket : ${socket.id}`);
    socket.on("disconnect" , function()
    {
        console.log(`User disconnected ${socket.id}`);
    });
});