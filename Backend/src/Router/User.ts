import  express  from "express";
import { Router } from "express";
import  jwt  from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
//Database Models Imports
import { UserModel , ChatRoomModel , RoomModel} from "../Db/Db";

//Json Web Token Secret to Create Tokens
const USER_SECRET = "mynameisbhaveshjoshi";

const UserRouter = Router();
UserRouter.use(express.json());

//Zod Validation of the inputs provided by the Users(For the Validation Details , Please view the ./InnerDetails/LiveLink.txt)
const UserObject = z.object({
    username : z.string().min(8).regex(/[0-9]/ , {message : "The Username should contain atleast One Number !"})
                .regex(/[a-z]/,{message : "The password should contain atleast one lower char"}) 
                .regex(/[A-Z]/,{message : "The password should contain atleast one Capital char"}),
    password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
type SignUpInput = z.infer<typeof UserObject>;

//SignUp API endpoint
UserRouter.post("/LiveLink/User/SignUp" , async function(req,res)
{
    // const SignUp : SignUpInput = req.body;
    const zodsafeObject = UserObject.safeParse(req.body);

    if(!zodsafeObject.success)
    {
        return res.status(404).json({
            msg : "Internal Server Error !"
        }); 
    }

    const SignUp : SignUpInput = zodsafeObject.data;

    //Password Hash Conversion Using Bcrypt 
    const hashedpassword = await bcrypt.hash(SignUp.password , 5);

    try{
        await UserModel.create({
            username : SignUp.username , 
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
});
//UserSignIn/Login API Endpoint 
UserRouter.post("/LiveLink/User/SignIn" , async function(req,res)
{
    const username = req.body.username;
    const password = req.body.password;
    
    const User = await UserModel.findOne({
        username : username
    });

    if(User)
    {   
        const Check = await bcrypt.compare(password , User.password);
        if(Check)
        {
            //Tokens Creation using Json WeB Token
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

export default UserRouter;