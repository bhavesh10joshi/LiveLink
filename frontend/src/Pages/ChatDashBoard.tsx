import { SideBar } from "../Components/SideBar/SideBar"
import { FriendsSideBar } from "../Components/FriendsSideBar/FriendsSideBar"

export function ChatDashboard()
{
    return<>
        <div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
            <div className="flex">
                <SideBar/>
                <FriendsSideBar/>
            </div>
        </div>
    </>
}