import { FriendsSideBar } from "../FriendsSideBar/FriendsSideBar"
import { UserToUserNavBar } from "../Chatting/UserToUserNavBar"
import { TypeTheMessage } from "../Chatting/TypeMessageSend"
import { UserInfo } from "../../Pages/UserInfo"
import { useEffect, useState } from "react"
import axios from "axios"
import { AddUserToGroup } from "../../Pages/AddUserToGroup"
import { APIurl } from "../../Config/ApiConfig"
import { SearchIcon } from "../Icons/Search"
import { SearchUserPage } from "../../Pages/SearchUserPage"
import { SkeletonProfile, SkeletonMessage } from "../Loader/Skeleton"
import { useGlobalUI } from "../../Config/GlobalUIContext"

export function UserToUserChatDashboard() {
    const { showError } = useGlobalUI();
    const[UserInfoStatus , SetUserInfo] = useState(false);
    const [selectedId, setSelectedId]:any = useState(null);
    const [FriendsList , SetFriendsList]:any = useState([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);
    const[AddUserToGroupState , SetAddUserToGroup] = useState(false);
    const[MessagesData , SetMessagesData]:any = useState(null);
    const[isLoadingMessages, setIsLoadingMessages] = useState(false);
    const[SearchUser , SetSearchUser]:any = useState(false);
    const[MessageSent , SetMessageSent]:any = useState(false);
    const[refreshFriends, setRefreshFriends] = useState(false);

    function SetSearchUserFunction()
    {
        SetSearchUser(!SearchUser);
    }
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
    function triggerFriendsRefresh() {
        setRefreshFriends(prev => !prev);
        setSelectedId(null);
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
            try{
                const result:any = await axios.get(`${APIurl}/Users/Get/Personal/Messaging/List` , config);  
                console.log(result);
                SetFriendsList(result.data.msg);
                setIsLoadingFriends(false);
                return;
            }
            catch(e)
            {
                setIsLoadingFriends(false);
                showError("Error occurred while fetching details for Users!");
                return;
            }
        }
        HitBackend();
    },[refreshFriends]);
    useEffect(
        function()
        {
            if(!selectedId)
            {
                return;
            }
            const token = localStorage.getItem("token");
            const HitBackendForMessages = async () => {
                console.log("selectedId is "+ selectedId);
                console.log("O My");
                setIsLoadingMessages(true);
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
                    setIsLoadingMessages(false);
                    return;
                }
                catch(e)
                {
                    console.log(e);
                    setIsLoadingMessages(false);
                    showError("Error occurred while fetching Messages!");
                    return;
                }
            }
            HitBackendForMessages();
        },[selectedId , MessageSent]
    )
    
    return <>
    {
        UserInfoStatus ? 
        <div className="w-full h-full flex justify-center items-center">{
            FriendsList.map((user:any)=>
                user.uniqueid == selectedId ?<UserInfo Name={user.name} ProfileImage={user.profilephoto} SetUserSelector={()=>{ SetUserInfoFunction(); triggerFriendsRefresh(); }} About={user.bio} OnlineOrOffline={user.isonline} UniqueId={user.uniqueid} /> :null  
            )
        }</div> 
        : !SearchUser
            ? !AddUserToGroupState
            ?<>
            <div className="flex w-full h-full justify-center items-center flex-col lg:flex-row">
                    <div className={`h-full pt-[1rem] pb-[1rem] w-full lg:w-auto lg:block ${selectedId ? 'hidden' : 'block'}`}>
                        <div className="bg-black-500 w-full lg:w-[20rem] rounded-md px-4 lg:px-8 py-4 lg:ml-4 flex flex-col gap-4 border border-slate-500 h-full">
                            <div className="w-full">
                                <button type="button" aria-label="name" className="w-full h-[3rem] bg-blue-950 rounded-full border border-blue-500 pl-[1rem] pr-[1rem] flex justify-center items-center" onClick={() => SetSearchUserFunction()}>
                                    <div className=" w-1/5 flex justify-start items-center"><SearchIcon/></div>
                                    <div className="w-4/5 flex justify-start items-center text-[0.9rem] text-slate-300">Search Users</div>
                                </button>
                                {
                                isLoadingFriends 
                                    ? <div className="flex flex-col gap-2 overflow-y-auto overflow-hidden mt-[1rem]">
                                        <SkeletonProfile /><SkeletonProfile /><SkeletonProfile />
                                      </div>
                                    : FriendsList.length != 0    
                                    ?<div className="flex flex-col gap-2 overflow-y-auto overflow-hidden mt-[1rem]">
                                        {FriendsList.map((user:any)=>(<FriendsSideBar ProfileImage={user.profilephoto} Name={user.name}  UniqueId={user.uniqueid} SetSelectedId={()=>SetSelectedId(user.uniqueid)} selectedId={selectedId}/>))}
                                    </div>
                                    :<div className="w-full h-full flex justify-center items-center mt-[1rem] text-slate-500 font-mono"> No Friends Exists </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`flex-1 flex flex-col h-full relative w-full lg:w-auto lg:flex ${selectedId ? 'flex' : 'hidden'}`}>
                    {selectedId != null
                        ?<>
                        <div className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                            {
                                FriendsList.map((user:any)=>
                                user.uniqueid == selectedId ?<div><UserToUserNavBar Name={user.name} ProfilePhoto={user.profilephoto} SetGroupSelector={()=>SetUserInfoFunction()} IsOnlineOrNot={user.isonline} SetAddUserToGroupfunction={() => SetAddUserToGroupFunction()}/> </div>: null  )
                            }
                        </div>
                        <div className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
                            {isLoadingMessages
                                ? <div className="flex flex-col gap-4 w-full"><SkeletonMessage /><SkeletonMessage isSender /><SkeletonMessage /><SkeletonMessage isSender /></div>
                                : MessagesData != null
                                ?MessagesData.map((msg:any, index:any) => (
                                    <div
                                        key={index}
                                        className={`flex w-full ${
                                            msg.MessageType === "Sent" ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <div className={`flex max-w-[85%] lg:max-w-[60%] ${
                                            msg.MessageType === "Sent" ? "flex-row-reverse" : "flex-row"
                                        } gap-2`}>
                                            <div className={`flex flex-col ${
                                                msg.MessageType === "Sent" 
                                                    ? "items-end" 
                                                    : "items-start"
                                            }`}>
                                                <div className={`p-3 rounded-2xl ${
                                                    msg.MessageType === "Sent"
                                                        ? "bg-blue-600 rounded-tr-none text-white"
                                                        : "bg-gray-800 rounded-tl-none text-gray-200"
                                                }`}>
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
                                                <span className="text-[10px] text-gray-500 mt-1 px-1">
                                                    {`${msg.time} ${msg.Date}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :<div className="flex justify-center items-center w-full h-full font-bold text-slate-600 text-[1rem] lg:text-[1.3rem] text-center px-4 mt-[4rem] lg:mt-[12rem]">Take the leap, type the first word, and transform this silence into a connection worth remembering.</div>
                            }
                        </div>
                    <div className="bg-black-500 backdrop-blur-md border rounded-lg border-slate-500 mx-2 mb-2 lg:mb-[1rem] lg:mr-[1rem] lg:ml-[1rem]">
                        <TypeTheMessage type="personal" RecieverUniqueId={selectedId} SetMessageSent={() => SetMessageSent(!MessageSent)}/>
                    </div>
                    </>
                    :<div className="flex justify-center items-center w-full h-full text-slate-700 text-[4rem] lg:text-[10rem] font-bold">
                        LiveLink
                    </div>
                }
                </div> 
            </div>
            </>
            :<AddUserToGroup SetAddUserToGroupfunction={()=>SetAddUserToGroupFunction()} UniqueId={selectedId}/>
        :<SearchUserPage SetSearchUserfunction={() => SetSearchUserFunction()}/>
    }
    </>
}