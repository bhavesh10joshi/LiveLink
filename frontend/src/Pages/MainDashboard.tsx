import { UserToGroupChatDashboard } from "../Components/ChattingDashboards/UserToGroupChatDashboard"
import { UserToUserChatDashboard } from "../Components/ChattingDashboards/UserToUserChatDashboard"
import { SideBar } from "../Components/SideBar/SideBar"
import { useState } from "react"
import { NotificationDashboard } from "../Components/NotificationsDashboard/Notificationdashboard"
import { UserSettings } from "./UserSettings"
import { NewGroup } from "./NewGroup"

export function MainDashboard()
{
    const [selector , setselctor] = useState("Home");
    
    return<>
        <div className="min-h-screen w-full bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)] text-white">
            <div className="flex h-screen overflow-hidden">
                <SideBar Selector={selector} OnClick={(val:string)=>setselctor(val)}/>
                {
                    selector == "Home" ?<UserToUserChatDashboard/>: null
                }
                {
                    selector == "Settings" ?<UserSettings SetSelectorFunction={()=>setselctor("Home")}/> : null
                }
                {
                    selector == "Groups" ?<UserToGroupChatDashboard SetSelectorFunction={()=>setselctor("Groups")}/> : null
                }
                {
                    selector == "Notification" ?<NotificationDashboard/> : null
                }
            </div>
        </div>
    </>
}
