import { SearchBar } from "../SearchBar/SearchBar"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { useState } from "react"

interface FriendsUsers {
    ProfileImage: string;
    Name: string;
    IsStatus: boolean;
    WasLastMessage: boolean;
    LastMessage?: string;
    TypingStatus: boolean;
    OnlineOrOfflineDots?: boolean;
    UniqueId: string;
    IsSelected: boolean;
}

const UsersFriends: FriendsUsers[] = [{
    ProfileImage: Profile,
    Name: "Bhavesh Joshi",
    IsStatus: false,
    WasLastMessage: true,
    LastMessage: "Hi my name is Bhavesh Joshi",
    TypingStatus: false,
    OnlineOrOfflineDots: false,
    UniqueId: "kskjfhdks45646_shdjagjhj",
    IsSelected: true
},
{
    ProfileImage: Profile,
    Name: "Rahul Verma",
    IsStatus: false,
    WasLastMessage: false,
    LastMessage: "Are we meeting today?",
    TypingStatus: false,
    OnlineOrOfflineDots: false,
    UniqueId: "user_002_rahul",
    IsSelected: false
} ];

export function FriendsSideBar() {
    const [selectedId, setSelectedId] = useState<string>("kskjfhdks45646_shdjagjhj");

    return (
        <div className="bg-black-500 w-[23rem] h-screen rounded-xl px-8 py-4 ml-4 flex flex-col gap-4">
            
            <div className="w-full">
                <SearchBar placeholder="Search by Name or Unique Id" />
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto overflow-hidden">
                {UsersFriends.map((user) => (
                    <div
                        // 1. KEY: Essential for React performance
                        key={user.UniqueId} 
                        
                        // 2. CLICK HANDLER: Updates the selected state
                        onClick={() => setSelectedId(user.UniqueId)} 

                        // 3. DYNAMIC STYLING: Changes background if selected
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedId === user.UniqueId 
                                ? "bg-blue-600 text-white" // Selected Style
                                : "bg-gray-800 text-gray-200 hover:bg-gray-700" // Default Style
                        }`}
                    >
                        {/* Profile Image */}
                        <div className="relative">
                            <img 
                                src={user.ProfileImage} 
                                alt={user.Name} 
                                className="w-12 h-12 rounded-full object-cover" 
                            />
                            {/* Online Dot (Conditional Rendering) */}
                            {user.OnlineOrOfflineDots ?
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></span>
                                : null}
                        </div>

                        {/* User Text Info */}
                        <div className="flex flex-col w-full overflow-hidden">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-sm truncate">{user.Name}</h3>
                                {user.IsStatus && <span className="text-[10px] opacity-70">Now</span>}
                            </div>
                            
                            <p className="text-xs truncate opacity-80">
                                {user.TypingStatus ? (
                                    <span className="text-green-400">Typing...</span>
                                ) : (
                                    user.LastMessage
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}