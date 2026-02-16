import { SearchBar } from "../SearchBar/SearchBar"

interface FriendsUsers {
    ProfileImage: string;
    Name: string;
    IsStatus ?: boolean;
    WasLastMessage ?: boolean;
    LastMessage ?: string;
    TypingStatus ?: boolean;
    OnlineOrOfflineDots ?: boolean;
    UniqueId : string;
    IsSelected: boolean;
    SetSelectedId : (val:string)=>void ,
    selectedId:string
}

export function FriendsSideBar(props:FriendsUsers) {
    
    return (
        <div className="bg-black-500 w-[20rem] h-screen rounded-s-lg px-8 py-4 ml-4 flex flex-col gap-4">
            
            <div className="w-full">
                <SearchBar placeholder="Search by Name or Unique Id" />
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto overflow-hidden">
                    <div
                        // 1. KEY: Essential for React performance
                        key={props.UniqueId} 
                        
                        // 2. CLICK HANDLER: Updates the selected state
                        onClick={()=>props.SetSelectedId} 

                        // 3. DYNAMIC STYLING: Changes background if selected
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            props.selectedId === props.UniqueId 
                                ? "bg-blue-600 text-white" // Selected Style
                                : "bg-gray-800 text-gray-200 hover:bg-gray-700" // Default Style
                        }`}
                    >
                        {/* Profile Image */}
                        <div className="relative">
                            <img 
                                src={props.ProfileImage} 
                                alt={props.Name} 
                                className="w-12 h-12 rounded-full object-cover" 
                            />
                            {/* Online Dot (Conditional Rendering) */}
                            {props.OnlineOrOfflineDots ?
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></span>
                                : null}
                        </div>

                        {/* User Text Info */}
                        <div className="flex flex-col w-full overflow-hidden">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-sm truncate">{props.Name}</h3>
                                {props.IsStatus && <span className="text-[10px] opacity-70">Now</span>}
                            </div>
                            
                            <p className="text-xs truncate opacity-80">
                                {props.TypingStatus ? (
                                    <span className="text-green-400">Typing...</span>
                                ) : (
                                    props.WasLastMessage ?<div>{props.LastMessage}</div> :null  
                                )}
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
}