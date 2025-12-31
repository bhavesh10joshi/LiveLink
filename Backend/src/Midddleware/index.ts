import express from "express";
import jwt from "jsonwebtoken"; 
import { Request , Response , NextFunction } from "express";
//JWt SECRET string to handle all the jwt verification
const USER_SECRET = "mynameisbhaveshjoshi";
const App = express();
App.use(express.json());

export async function Middleware(req :any , res : Response , next : NextFunction)
{
    const token = req.headers["authorization"];
    //Tokens Verification using jwt 
    const Verification:any = await jwt.verify(token , USER_SECRET);  

    if(!Verification)
    {
        res.status(404).json({
            msg : "Internal Server Error !"
        });
        return;
    }
    else
    {
        //gets the Object Id of the Schema to which Endpoint is related ! 
        req.UserId = Verification.id;
        next();  
    }
};