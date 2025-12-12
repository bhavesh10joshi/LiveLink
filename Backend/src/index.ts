import express, { NextFunction }  from "express";
import bcrypt from "bcrypt" ; 
import { z } from "zod" ; 
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Request , Response } from "express";

const mongodbUrl:string = ""; 
mongoose.connect(mongodbUrl);

const USER_SECRET:string = "iambhaveshjoshi";

const App = express();
App.use(express.json());

//zod validation 
const NewZodobject = z.object({
    username : z.string().min(8).regex(/[0-9]/ , { message : "The given username should contain atleast one Number !"})
                                .regex(/[A-Z]/ , {message : "The given username should contain atleast one Capital Letter !"})
                                .regex(/[a-z]/ , {message : "The username should contain atleast one Small Alphabet !"}) ,
    password : z.string().min(8).regex(/[0-9]/ , { message : "The given password should contain atleast one Number !"})
                                .regex(/[A-Z]/ , {message : "The given password should contain atleast one Capital Letter !"})
                                .regex(/[a-z]/ , {message : "The password should contain atleast one Small Alphabet !"}) ,
}); 
//type inference in zod 
type ZodObject = z.infer<typeof NewZodobject>;

//SignUp EndPoint
App.post("/User/SignUp" , async function(req:Request , res:Response)
{
    const Signup:ZodObject = req.body;
    const Zodsafeobject = NewZodobject.safeParse(req.body);
    
    if(Zodsafeobject)
    {
        //hashing the password by the user 
        const Hashedpassword = bcrypt.hash(Signup.password , 5);
        try{
            await UserRouter.create({
                username : Signup.username , 
                password : Signup.password
            });
            res.status(200).json({
                msg : "Signed Up Successfully !"
            });
        }
        catch(e)
        {
            res.status(404).json({
                msg : "Internal Server error !"  
            });
        }
    }
    else
    {
        res.status(404).json({
            msg : "The given Credentials are not correct !"
        });
    }
}); 
App.post("/User/SignIn" , async function(req:Request , res:Response)
{
    const username = req.body.username;
    const password = req.body.password;

    const find = await UserRouter.findOne({
        username : username  
    });

    if(find)
    {
        const check = await bcrypt.compare(password , find.password);
        if(check)
        {
            const token = jwt.sign({
                id : find._id
            } , USER_SECRET);
            res.status(200).json({
                token : token
            });
        }
        else
        {
            res.status(404).json({
                msg : "Incorrect Password !"
            });
        }
    }
    else
    {
        res.status(404).json({
            msg : "The Username provided does not exist "
        });
    }
});
//middleware
function middleware(req:Request , res:Response , next:NextFunction)
{
    const token:any = req.headers["authorization"];
    const check = jwt.verify(token , USER_SECRET);
    if(check)
    {
        
    }
    else
    {

    }
}
App.listen(3000);