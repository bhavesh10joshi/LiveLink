import { MainGroupIcon } from "../Icons/GroupIcon"
import { MainHomeIcon } from "../Icons/Home"
import { MainNotifictionIcon } from "../Icons/Notification"
import { MainSettingsIcon } from "../Icons/Settings"
import { Button } from "../Buttons/Button"
import { SideBarProfile } from "../SideBarProfile/SideBarProfile"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { FormNewGroup } from "../Icons/FormNewGroup"

interface SideBarStyles{
    Selector : String ,
    OnClick : (val:string)=>void
}
export function SideBar(props:SideBarStyles)
{
    return<>
        <div className=" bg-black-500 w-[18rem] h-screen rounded-xl pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]">
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
            <div className="flex justify-center items-center mt-[15rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "NewGroup" ?<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="light"/>} color="Blue" onClick={() => props.OnClick("NewGroup")}/>:<Button size="HomeSize" text="New Group" FrontIcon={<FormNewGroup/>} color="Black" onClick={() => props.OnClick("NewGroup")}/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center mt-[1rem]">
                <div className="w-full flex justify-center items-center">
                    {
                        props.Selector == "Settings" ?<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="light"/>} color="Blue" onClick={() => props.OnClick("Settings")}/>:<Button size="HomeSize" text="Settings" FrontIcon={<MainSettingsIcon type="dark"/>} color="Black" onClick={() => props.OnClick("Settings")}/>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center mt-[2rem]">
                <div className="bg-slate-500 h-[1px] w-full rounded-xl"></div>
            </div>
            <div className="mt-[2rem]">
                <SideBarProfile Status="Offline" Name="Bhavesh Joshi" Image={Profile}/>
            </div>
        </div>
    </>
}