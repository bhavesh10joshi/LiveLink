import { FriendsSideBar } from "../FriendsSideBar/FriendsSideBar"
import { UserToUserNavBar } from "../Chatting/UserToUserNavBar"
import { TypeTheMessage } from "../Chatting/TypeMessageSend"
import { UserInfo } from "../../Pages/UserInfo"
import { useEffect, useState } from "react"
import axios from "axios"
import { AddUserToGroup } from "../../Pages/AddUserToGroup"
import { APIurl } from "../../Config/ApiConfig"
import { SearchBar } from "../SearchBar/SearchBar"

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
    const[MessagesData , SetMessagesData]:any = useState(null);

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
        const token = localStorage.getItem("token");
        const HitBackend = async () =>
        {
            const config = {
                headers : {
                    "authorization" : token
                }
            };
            const result:any = await axios.get(`${APIurl}/Users/Get/Personal/Messaging/List` , config);  
            SetFriendsList(result.data.msg);
        }
        const HitBackendForMessages = async () => {
            console.log("selectedId is "+ selectedId);
            console.log("O My");
            const config = {
                headers : {
                    "authorization" : token
                } , 
                params : {
                    RecieverUniqueId : selectedId
                }
            };
            try{
                const result:any = await axios.get(`${APIurl}/Users/Message/UserToUser/Access/Messages/All` , config);
                console.log(result.data.msg);
                SetMessagesData(result.data.msg);
                return;
            }
            catch(e)
            {
                console.log(e);
                alert("Error Occured while fetching Messages !");
                return;
            }
        }
        HitBackend();
        HitBackendForMessages();
    },[selectedId]);
    
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
                <div className="h-full pt-[1rem] pb-[1rem]">
                    <div className="bg-black-500 w-[20rem] rounded-md px-8 py-4 ml-4 flex flex-col gap-4 border border-slate-500  h-full">
                        <div className="w-full">
                            <SearchBar placeholder="Search by Name or Unique Id" />
                                <div className="flex flex-col gap-2 overflow-y-auto overflow-hidden mt-[1rem]">
                                    {FriendsList.map((user:any)=>(<FriendsSideBar ProfileImage={user.profilephoto} Name={user.name}  UniqueId={user.uniqueid} SetSelectedId={()=>SetSelectedId(user.UniqueId)} selectedId={selectedId}/>))}
                                </div>
                        </div>
                    </div>
                </div>
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
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 ">
                    {MessagesData != null
                        ?MessagesData.map((msg:any, index:any) => (
                            <div
                                key={index}
                                className={`flex w-full ${
                                    msg.ContentType === "Sent" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div className={`flex max-w-[60%] ${
                                    msg.ContentType === "Sent" ? "flex-row-reverse" : "flex-row"
                                } gap-2`}>
                                    
                                    {/* Profile Photo (Optional: Hide for sent messages if you prefer) */}
                                    {/* <img 
                                        src={msg.ProfilePhoto} 
                                        alt="profile" 
                                        className="w-8 h-8 rounded-full mt-1 invisible"
                                    /> */}

                                    {/* Message Bubble */}
                                    <div className={`flex flex-col ${
                                        msg.ContentType === "Sent" 
                                            ? "items-end" 
                                            : "items-start"
                                    }`}>
                                        
                                        {/* Content Bubble */}
                                        <div className={`p-3 rounded-2xl ${
                                            msg.ContentType === "Sent"
                                                ? "bg-blue-600 rounded-tr-none text-white"
                                                : "bg-gray-800 rounded-tl-none text-gray-200"
                                        }`}>
                                            {/* Render Image or Text based on type */}
                                            {msg.ContentType === "image" ? (
                                                <img 
                                                    src={msg.Content} 
                                                    alt="Sent attachment" 
                                                    className="rounded-lg max-w-[250px] object-cover"
                                                />
                                            ) : (
                                                <p className="text-sm">{msg.Content}</p>
                                            )}
                                        </div>

                                        {/* Timestamp */}
                                        <span className="text-[10px] text-gray-500 mt-1 px-1">
                                            {`${msg.time} ${msg.Date}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                        :<div className="flex justify-center items center w-full h-full font-bold text-slate-600 text-[1.3rem] text-center mt-[12rem]">Take the leap, type the first word, and transform this silence into a connection worth remembering.</div>
                    }
                </div>
                <div className="bg-black-500 backdrop-blur-md  border rounded-lg border-slate-500 border-md border-full  mb-[1rem] mr-[1rem] ml-[1rem]">
                    <TypeTheMessage type="personal" RecieverUniqueId={selectedId}/>
                </div>
            </div> 
        </div>
        :<AddUserToGroup SetAddUserToGroupfunction={()=>SetAddUserToGroupFunction()} UniqueId={selectedId}/>
    }
    </>
}