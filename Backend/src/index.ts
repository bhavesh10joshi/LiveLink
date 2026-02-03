import express from "express" ; 
import cors from "cors";
import UserRouter from "./Router/User/User";
import GroupRouter from "./Router/Group/Group";
import { SuccessStatusCodes, ClientErrorStatusCodes , ServerErrors } from "./StatusCodes";

const app = express();
app.use(express.json());
app.use(cors());

//Routing of the original endpoints in express App
app.use("/LiveLink/Users" , UserRouter);
app.use("/LiveLink/Group" , GroupRouter);

//Main Function that has to be run !
async function main()
{
    try{
        app.listen(3000);
        console.log("Connected To server Properly !");
    }
    catch(e)
    {
        console.log("Server Has No Response !");
    }
}
main();