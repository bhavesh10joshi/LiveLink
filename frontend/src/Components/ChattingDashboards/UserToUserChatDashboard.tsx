import { FriendsSideBar } from "../FriendsSideBar/FriendsSideBar"
import { UserToUserNavBar } from "../Chatting/UserToUserNavBar"
import DocumentImage from "../ui/Image/SampleImages/ChattingImages/DocumentImage.png"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { TypeTheMessage } from "../Chatting/TypeMessageSend"
import { UserInfo } from "../../Pages/UserInfo"
import { useEffect, useState } from "react"
import axios from "axios"
import { boolean } from "zod"
import { AddUserToGroup } from "../../Pages/AddUserToGroup"

interface messagestyle{
    typeofMessage : "Sent" | "Recieved" | "Date",
    typeOfContent : "text" | "Image",
    ImageMessage ?: string ,
    TextMessage ?: string , 
    TimeOfMesage : string ,
    DateOfMessage : Number,
    ProfilePhoto : string
}

const MessageData:messagestyle[] = [
{
    typeofMessage : "Sent" ,
    typeOfContent : "text" , 
    TextMessage : "Hey There how are you doing ??", 
    TimeOfMesage : "3:59 Am",
    DateOfMessage : 12,
    ProfilePhoto : Profile 
},{
    typeofMessage : "Recieved" ,
    typeOfContent : "text" ,
    TextMessage : "Hey There how are you doing ??", 
    TimeOfMesage : "4:59 Am",
    DateOfMessage : 12,
    ProfilePhoto : Profile 
},
{
    typeofMessage : "Sent" ,
    typeOfContent : "Image" , 
    ImageMessage : DocumentImage , 
    TimeOfMesage : "10:59 Pm",
    DateOfMessage : 12,
    ProfilePhoto : Profile 
},{
    typeofMessage : "Recieved" ,
    typeOfContent : "Image" ,
    ImageMessage : DocumentImage , 
    TimeOfMesage : "12:00 Pm",
    DateOfMessage : 12,
    ProfilePhoto : Profile 
}]; 

interface Friend {
    isonline: boolean;
    name: string;
    profilephoto: string;
    typingstatus: boolean;
    uniqueid: string;
    _id: string;
    bio: string;
}

// const UserFriends : FriendsUsers[] = [{
//     ProfileImage : Profile , 
//     Name : "ajay" , 
//     WasLastMessage : false,
//     TypingStatus : true , 
//     OnlineOrOfflineDots : true , 
//     UniqueId : "jksahkhdaskjhdkalshkdja" , 
//     About : "Hi my name is bhavesh joshi this is a realtime chatting application !"
// }]

export function UserToUserChatDashboard() {
    const[UserInfoStatus , SetUserInfo] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("fc5d7203-fd30-42a7-b8dc-4bad5c34a9f1");
    const [FriendsList , SetFriendsList]:any = useState<Friend[]>([]);
    const[AddUserToGroupState , SetAddUserToGroup] = useState(false);

    function SetUserInfoFunction()
    {
        SetUserInfo(!UserInfoStatus);
    }
    function SetSelectedId(val:string)
    {
        setSelectedId(val);
    }
    function SetAddUserToGroupFunction()
    {
        SetAddUserToGroup(!AddUserToGroupState);
    }
    useEffect(function(){
        const HitBackend = async () =>
        {
            const token = localStorage.getItem("token");
            const config = {
                headers : {
                    "authorization" : token
                }
            };
            const result:any = await axios.get("http://localhost:5000/LiveLink/Users/Get/Personal/Messaging/List" , config);  
            SetFriendsList(result.data.msg);
        }
        HitBackend();
    },[]);
    
    return <>
    {
        UserInfoStatus ? 
        <div className="w-full h-full flex justify-center items-center">{
            FriendsList.map((user:any)=>
                user.uniqueid == selectedId ?<UserInfo Name={user.name} ProfileImage={user.profilephoto} SetUserSelector={()=>SetUserInfoFunction()} About={user.bio} OnlineOrOffline={user.isonline} UniqueId={user.uniqueid} /> :null  
            )
        }</div> 
        : !AddUserToGroupState
        ?// --- ADDED FRAGMENT WRAPPER < > ---
            <div className="flex w-full h-full justify-center items-center">
                {FriendsList.map((user:any)=>(<FriendsSideBar ProfileImage={user.profilephoto} Name={user.name}  UniqueId={user.uniqueid} SetSelectedId={()=>SetSelectedId(user.UniqueId)} selectedId={selectedId}/>))}
                <div className="bg-slate-600 w-[0.2px]"></div>
                <div className="flex-1 flex flex-col h-full relative">
                {/* Header / Top Bar could go here */}
                    {/* Input Area (Your UserToUser or GroupToUser Portal) */}
                <div className=" bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                    {
                        FriendsList.map((user:any)=>
                        user.uniqueid == selectedId ?<div><UserToUserNavBar Name={user.name} ProfilePhoto={user.profilephoto} SetGroupSelector={()=>SetUserInfoFunction()} IsOnlineOrNot={user.isonline} SetAddUserToGroupfunction={() => SetAddUserToGroupFunction()}/> </div>: null  )
                    }
                </div>
                {/* MESSAGE CONTAINER: Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
                    {MessageData.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${
                                msg.typeofMessage === "Sent" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div className={`flex max-w-[60%] ${
                                msg.typeofMessage === "Sent" ? "flex-row-reverse" : "flex-row"
                            } gap-2`}>
                                
                                {/* Profile Photo (Optional: Hide for sent messages if you prefer) */}
                                <img 
                                    src={msg.ProfilePhoto} 
                                    alt="profile" 
                                    className="w-8 h-8 rounded-full mt-1"
                                />

                                {/* Message Bubble */}
                                <div className={`flex flex-col ${
                                    msg.typeofMessage === "Sent" 
                                        ? "items-end" 
                                        : "items-start"
                                }`}>
                                    
                                    {/* Content Bubble */}
                                    <div className={`p-3 rounded-2xl ${
                                        msg.typeofMessage === "Sent"
                                            ? "bg-blue-600 rounded-tr-none text-white"
                                            : "bg-gray-800 rounded-tl-none text-gray-200"
                                    }`}>
                                        {/* Render Image or Text based on type */}
                                        {msg.typeOfContent === "Image" ? (
                                            <img 
                                                src={msg.ImageMessage} 
                                                alt="Sent attachment" 
                                                className="rounded-lg max-w-[250px] object-cover"
                                            />
                                        ) : (
                                            <p className="text-sm">{msg.TextMessage}</p>
                                        )}
                                    </div>

                                    {/* Timestamp */}
                                    <span className="text-[10px] text-gray-500 mt-1 px-1">
                                        {msg.TimeOfMesage}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-black-500 backdrop-blur-sm border-t border-gray-800 border border-slate-500 w-full">
                    <TypeTheMessage type="personal" RecieverUniqueId={selectedId}/>
                </div>
            </div> 
        </div>
        :<AddUserToGroup SetAddUserToGroupfunction={()=>SetAddUserToGroupFunction()} UniqueId={selectedId}/>
    }
    </>
}