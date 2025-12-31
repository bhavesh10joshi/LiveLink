import  express, { application }  from "express";
import { Router } from "express";
import  jwt  from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";

//Database Models Imports
import { UserModel , ChatRoomModel} from "../Db/Db";

//importing middleware functions
import { Middleware } from "../Midddleware";

//Json Web Token Secret to Create Tokens
const USER_SECRET = "mynameisbhaveshjoshi";

const UserRouter = Router();
UserRouter.use(express.json());

//Zod Validation of the inputs provided by the Users(For the Validation Details , Please view the .../InnerDetails/LiveLink.txt)
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

//Api Endpoint to get the details of the Current Rooms and the members connected to it !
UserRouter.get("/Room/Details" , async function(req,res)
{
    try{
        const AllRoomsDetails = await ChatRoomModel.find();
        res.json({
            Details : AllRoomsDetails 
        });
    }
    catch(e)
    {
        res.status(404).json({
            msg : "Internal Server Error !" 
        });
    }
});
//Usage of the middleware compulsory for Further Api Endpoints
UserRouter.use(Middleware);

//ZOD athentication for room name and room Id(For details regarding this authentication Please move to .../InnerDetails/LiveLink.txt)
const RoomZodObject = z.object({
    RoomName : z.string().min(10 , {message : "Room Name length should be least 10 !"}) ,
    RoomId : z.string().min(8 , {message : "RoomId Should contain atleast 8 Letters !"})
            .max(10 , {message : "RoomId Length should contain a total 10 Letters !"})
            .regex(/[^a-z]/ , {message : "RoomId Should contain atleast One Lower Case Letters !"})
            .regex(/[^A-Z]/ , {message : "RoomId Should contain atleast One Upper Case Letters !"})
            .regex(/[^0-9]/ , {message : "RoomId Should contain atleast One Number !"})
})
type RoomCreationInput = z.infer<typeof RoomZodObject>;
UserRouter.use("/Create/Rooms" , async function(req , res)
{
    //gets From Middleware
    const UserId = req.body;
    const SafeParseRoomCreation = RoomZodObject.safeParse(req.body);
    
    if(!SafeParseRoomCreation.success)
    {
        res.status(404).json({
            msg : "Internal Server Error !"
        });
        return;
    }

    const UserRoomCreation:RoomCreationInput = SafeParseRoomCreation.data;
    //Make a new Room with the respective RoomId and RoomName
    try{
        await ChatRoomModel.create({
            RoomName : UserRoomCreation?.RoomName , 
            RoomId : UserRoomCreation?.RoomId ,
            CreatorId : UserId  
        });
        res.json({
            msg : "The Chat Room is Successfully Connected !"
        });
    }
    catch(e)
    {
        res.status(404).json({
            msg : "Internal Server Error !"
        });
    }
});
UserRouter.post("/Join/Room", async function(req , res)
{
    const UserId = req.body;
    const RoomId = req.body.RoomId;
    
    //Authenticating whether the given RoomId Actually exists or not  
    const FindRoom = await ChatRoomModel.findOne({
        RoomId : RoomId
    });

    if(!FindRoom)
    {
        res.status(404).json({
            msg : "The Given Room Does Not Exists !"
        });
        return;
    }
    
    //Updating the current User RoomID
    try{
        const Val : Number = FindRoom.Totalmembers;
        const TotalMembers:Number = Val + 1;
        await UserModel.findOneAndUpdate(
        { _id: UserId },
        {
            $set: {
                ChatRoomId: FindRoom._id
            }
        },
        { new: true });
        await ChatRoomModel.findOneAndUpdate(
        { _id: UserId },
        {
            $set: {
                Totalmembers : 
            }
        },
        { new: true });
    }
    catch(e)
    {

    }
    

});
export default UserRouter;