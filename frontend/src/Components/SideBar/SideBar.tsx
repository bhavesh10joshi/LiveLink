import { MainGroupIcon } from "../Icons/GroupIcon"
import { MainHomeIcon } from "../Icons/Home"
import { MainNotifictionIcon } from "../Icons/Notification"
import { MainSettingsIcon } from "../Icons/Settings"
import { Button } from "../Buttons/Button"
import { SideBarProfile } from "../SideBarProfile/SideBarProfile"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { useEffect, useState } from "react"
import axios from "axios"
import { APIurl } from "../../Config/ApiConfig"
import { LogOutIcon } from "../Icons/LogOut"

interface SideBarStyles{
    Selector : String ,
    OnClick : (val:string)=>void
}


export function SideBar(props:SideBarStyles)
{
    const [UserData , SetUserData]:any = useState(null);
    useEffect(function()
    {
       const FetchData = async () => {
            const token = localStorage.getItem("token");
            const config = {
                headers : {
                    "authorization" : token
                }
            };
            try{
                const Data:any = await axios.get(`${APIurl}/Users/Profile/Details` , config);
                const Payload = {
                    "name" : Data.data.msg.name , 
                    "ProfilePhoto" : Data.data.msg.ProfilePhoto
                };
                SetUserData(Payload);
                return;
            }
            catch(e)
            {
                console.log("Error : " + e);
                alert("Error Encountered while Fetching Users Profile Data !");
                return;
            }
       };   
       FetchData(); 
    } , []);
    return<>
    <div className="h-screen pt-[1rem] pb-[1rem] pl-[1rem]">
        <div className=" bg-black-500 w-[16rem] h-full rounded-md pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem] border border-slate-500">
            <div className="flex justify-start items-center">
                <div className="font-bold text-blue-800 text-[1.6rem]">
                    LiveLink
                </div>
            </div>
            <div className="flex justify-center items-center mt-[2rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Home" ?<Button size="HomeSize" text="Home" FrontIcon={<MainHomeIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Home")}/>:<Button size="HomeSize" text="Home" FrontIcon={<MainHomeIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Home")}/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Groups" ?<Button size="HomeSize" text="Groups" FrontIcon={<MainGroupIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Groups")}/>:<Button size="HomeSize" text="Groups" FrontIcon={<MainGroupIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Groups")}/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Notification" ?<Button size="HomeSize" text="Notifications" FrontIcon={<MainNotifictionIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Notification")}/>:<Button size="HomeSize" text="Notification" FrontIcon={<MainNotifictionIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Notification")}/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center mt-[12rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Settings" ?<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Settings")}/>:<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Settings")}/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    <Button size="HomeSize" text="Log Out" FrontIcon={<LogOutIcon/>} color="Red"/>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[2rem]">
                <div className="bg-slate-500 h-[1px] w-full rounded-xl"></div>
            </div>
            {UserData != null
                ?<div className="mt-[2rem] flex justify-center items-center rounded-lg bg-slate-900 pt-[0.5rem] pb-[0.5rem] border border-blue-500">
                    <SideBarProfile  Name={UserData.name} Image={UserData.ProfilePhoto}/>
                </div>
                :null
            }
        </div>
    </div>
    </>
}