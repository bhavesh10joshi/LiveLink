import express from "express";
import {Request , Response , NextFunction} from "express";
import jwt from "jsonwebtoken";
import { SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors } from "../StatusCodes";

const App = express();
App.use(express.json());
const USER_SECRET : string = "tokengenerationsecretforjwtusers";

 
export function usermiddleware(req:any , res:Response , next:NextFunction)
{
    const token = req.headers["authorization"];
    const verification:any = jwt.verify(token as string , USER_SECRET);

    if(verification)
    {
        req.UserId = verification.id;
        next();
    }
    else
    {   
        res.status(ClientErrorStatusCodes.Unathorized).json({
            msg : "Wrong Authorization Token Recieved !"
        });
    } 
}
