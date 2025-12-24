import express from "express" ; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Request , response} from "express";
const USER_SECRET = "mynameisbhaveshjoshi";

const App = express();
App.use(express.json());

const UserObject = z.object({
    Username : z.string().min(8).regex(/[0-9]/ , {message : "The Username should contain atleast One Number !"})
                .regex(/[a-z]/,{message : "The password should contain atleast one lower char"}) 
                .regex(/[A-Z]/,{message : "The password should contain atleast one Capital char"}),
    Password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
type User = z.infer<typeof UserObject>;

App.post("/LiveLink/User/SignUp" , async function(req,res)
{
    const SignUp : User = req.body;
    const zodsafeObject = UserObject.safeParse(req.body);
    
    if(zodsafeObject)
    {
        const hashedpassword = bcrypt.hash(SignUp.Password , 5);
        try{
            await UserRouter.create({
                username : SignUp.Username , 
                password : hashedpassword
            });
            res.json({
                msg : "SuccessfullY Logged In !"
            });
        }
        catch(e)
        {
            res.status(404).send({
                msg : "Internal server Error !"
            });
        }
    }
    else
    {
        res.status(404).json({
            msg : "Internal Server Error !"
        });
    }
});
App.post("/LiveLink/User/SignIn" , async function(req,res)
{
    const username = req.body.username;
    const password = req.body.password;
    
    const User = await UserRouter.findOne({
        username : username
    });

    if(User)
    {   
        const Check = await bcrypt.compare(password , User.password);
        if(Check)
        {
            const token = jwt.sign({
                id : User._id
            } , USER_SECRET);

            res.json({
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
            msg : "Internal Server Error "
        });
    }
});
App.listen(3000);