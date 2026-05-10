import { MainGroupIcon } from "../Icons/GroupIcon"
import { MainHomeIcon } from "../Icons/Home"
import { MainNotifictionIcon } from "../Icons/Notification"
import { MainSettingsIcon } from "../Icons/Settings"
import { Button } from "../Buttons/Button"
import { SideBarProfile } from "../SideBarProfile/SideBarProfile"
import { useEffect, useState } from "react"
import axios from "axios"
import { APIurl } from "../../Config/ApiConfig"
import { LogOutIcon } from "../Icons/LogOut"
import { useNavigate } from "react-router-dom"
import { useGlobalUI } from "../../Config/GlobalUIContext"

interface SideBarStyles{
    Selector : String ,
    OnClick : (val:string)=>void
}

function MobileNavButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-3 py-2 rounded-lg text-[0.75rem] font-semibold transition-colors whitespace-nowrap ${
                isActive 
                    ? "bg-blue-800 text-white" 
                    : "text-slate-400 hover:text-white"
            }`}
        >
            {label}
        </button>
    );
}

export function SideBar(props:SideBarStyles)
{
    const { showError } = useGlobalUI();
    const Navigate = useNavigate();
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
                showError("Error encountered while fetching users profile data!");
                return;
            }
       };   
       FetchData(); 
    } , []);
    function LogOut()
    {
        localStorage.removeItem("token");
        Navigate("/LiveLink/Introduction");
    }
    return<>
    <div className="lg:h-screen pt-[1rem] pb-[1rem] lg:pl-[1rem] w-full lg:w-auto h-auto fixed bottom-0 z-50 lg:static">
        <div className="bg-black-500 w-full lg:w-[16rem] lg:h-full rounded-t-xl lg:rounded-md lg:pl-[2rem] lg:pr-[2rem] lg:pt-[1rem] lg:pb-[1rem] border-t lg:border border-slate-500 flex lg:flex-col flex-row lg:justify-start items-center">
            <div className="hidden lg:flex justify-start items-center">
                <div className="font-bold text-blue-800 text-[1.6rem]">
                    LiveLink
                </div>
            </div>
            <div className="flex lg:hidden justify-around items-center w-full py-2 px-1">
                <MobileNavButton label="Home" isActive={props.Selector == "Home"} onClick={() => props.OnClick("Home")} />
                <MobileNavButton label="Groups" isActive={props.Selector == "Groups"} onClick={() => props.OnClick("Groups")} />
                <MobileNavButton label="Alerts" isActive={props.Selector == "Notification"} onClick={() => props.OnClick("Notification")} />
                <MobileNavButton label="Settings" isActive={props.Selector == "Settings"} onClick={() => props.OnClick("Settings")} />
            </div>
            <div className="hidden lg:flex justify-center w-full items-center mt-[2rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Home" ?<Button size="HomeSize" text="Home" FrontIcon={<MainHomeIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Home")}/>:<Button size="HomeSize" text="Home" FrontIcon={<MainHomeIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Home")}/>
                    }
                </div>
            </div>
            <div className="hidden lg:flex justify-center w-full items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Groups" ?<Button size="HomeSize" text="Groups" FrontIcon={<MainGroupIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Groups")}/>:<Button size="HomeSize" text="Groups" FrontIcon={<MainGroupIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Groups")}/>
                    }
                </div>
            </div>
            <div className="hidden lg:flex justify-center w-full items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Notification" ?<Button size="HomeSize" text="Notifications" FrontIcon={<MainNotifictionIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Notification")}/>:<Button size="HomeSize" text="Notification" FrontIcon={<MainNotifictionIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Notification")}/>
                    }
                </div>
            </div>
            <div className="hidden lg:flex justify-center w-full items-center mt-[12rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Settings" ?<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Settings")}/>:<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Settings")}/>
                    }
                </div>
            </div>
            <div className="hidden lg:flex justify-center w-full items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    <Button size="HomeSize" text="Log Out" FrontIcon={<LogOutIcon/>} color="Red" onClick={() => LogOut()}/>
                </div>
            </div>
            <div className="hidden lg:flex justify-center items-center mt-[2rem]">
                <div className="bg-slate-500 h-[1px] w-full rounded-xl"></div>
            </div>
            {UserData != null
                ?<div className="w-full hidden lg:flex mt-[2rem] justify-center items-center rounded-lg bg-slate-900 pt-[0.5rem] pb-[0.5rem] border border-blue-500">
                    <SideBarProfile  Name={UserData.name} Image={UserData.ProfilePhoto}/>
                </div>
                :null
            }
        </div>
    </div>
    </>
}