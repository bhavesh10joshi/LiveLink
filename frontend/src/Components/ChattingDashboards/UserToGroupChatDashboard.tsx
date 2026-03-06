import { FriendsSideBar } from "../FriendsSideBar/FriendsSideBar"
import { UserToGroupNavBar } from "../Chatting/UserToGroupNavBar"
import DocumentImage from "../ui/Image/SampleImages/ChattingImages/DocumentImage.png"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { TypeTheMessage } from "../Chatting/TypeMessageSend"
import { GroupInfo } from "../../Pages/GroupInfo";
import { useEffect, useState } from "react"
import axios from "axios";
import { APIurl } from "../../Config/ApiConfig"
import { SearchBar } from "../SearchBar/SearchBar"
import { config } from "zod/v4/core"
import { setErrorMap } from "zod/v3"

interface GeneralStyle{
    SetSelectorFunction : (val:string)=>void
}

interface messagestyle{
    typeofMessage : "Sent" | "Recieved" | "Date",
    typeOfContent : "text" | "Image",
    ImageMessage ?: string ,
    TextMessage ?: string , 
    TimeOfMesage : string ,
    DateOfMessage : Number,
    ProfilePhoto : string 
}
interface GroupMembers{
    MemberName : string ,
    OnlineOrNot : Boolean , 
    CreatorOrNot : Boolean , 
    ProfilePhoto : string ,
    UniqueId : string
}
const MessageData:messagestyle[] = [
{
    typeofMessage : "Sent" ,
    typeOfContent : "text" , 
    TextMessage : "Hey There how are you doing ??", 
    TimeOfMesage : "3:59 Am",
    DateOfMessage : 12,
    ProfilePhoto : Profile ,
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

interface Usersgroup {
    ProfileImage: string;
    Name: string;
    UniqueId: string;
    IsSelected: boolean;
    Groupmembers : GroupMembers[];
    GroupInfo:string , 
    CreationDate : string
}

interface FriendsUsers {
    ProfileImage: string;
    Name: string;
    UniqueId : string;
}

const UserFriends : FriendsUsers[] = [{
        Name : "Bhavesh Joshi",  
        ProfileImage : Profile,
        UniqueId:"kshjahkjsakjdhakljshdklja"
    },{
        Name : "Bhavesh Joshi", 
        ProfileImage : Profile,
        UniqueId:"ndsbfkbkfhhflsdjkahkfhsadkl"
    },{
        Name : "Bhavesh Joshi",  
        ProfileImage : Profile,
        UniqueId:"sjkhlkfihaiofhjdsabfb"
    },{
       Name : "Bhavesh Joshi", 
        ProfileImage : Profile,
        UniqueId:"dfkjbcscaKVWaiudiuau"
    }]

const UsersGroup: Usersgroup[] = [{
    ProfileImage: Profile,
    Name: "College-23-27",
    UniqueId: "kskjfhdks45646_shdjagjhj",
    IsSelected: true ,
    GroupInfo : "My new College group , beacuse i am a brerozgaar aadmi , what about you gang , are you good hahahahahahah",  
    Groupmembers : [{
        MemberName : "Bhavesh Joshi", 
        OnlineOrNot : true , 
        CreatorOrNot : true , 
        ProfilePhoto : Profile,
        UniqueId:"kshjahkjsakjdhakljshdklja"
    },{
        MemberName : "Bhavesh Joshi", 
        OnlineOrNot : false , 
        CreatorOrNot : false , 
        ProfilePhoto : Profile,
        UniqueId:"ndsbfkbkfhhflsdjkahkfhsadkl"
    },{
        MemberName : "Bhavesh Joshi", 
        OnlineOrNot : true , 
        CreatorOrNot : false , 
        ProfilePhoto : Profile,
        UniqueId:"sjkhlkfihaiofhjdsabfb"
    },{
        MemberName : "Bhavesh Joshi", 
        OnlineOrNot : false , 
        CreatorOrNot : false , 
        ProfilePhoto : Profile,
        UniqueId:"dfkjbcscaKVWaiudiuau"
    }],
    CreationDate : "14-02-2026"
}];

export function UserToGroupChatDashboard(props:GeneralStyle) {
    const[GroupInfoStatus , SetGroupInfo] = useState(false);
    const [selectedId, setSelectedId]:any = useState(null);
    const [GroupList , SetGroupList]:any = useState([]);
    const [UserFriends , SetUserFriends]:any = useState([]);
    const [Messagedata , SetMessagedata]:any = useState(null); 
    const [UserDetails , SetUserDetails]:any = useState();

    function SetGroupInfoFunction()
    {
        SetGroupInfo(!GroupInfoStatus);
    }
    function SetSelectedId(val:string)
    {
        setSelectedId(val);
    }
    useEffect(function() {
        const token = localStorage.getItem("token");
        const GetGroupList = async () =>{
            const Config = {
                headers : {
                    "authorization" : token
                }
            };
            try{
                const data = await axios.get(`${APIurl}/Users/Profile/Details` , Config);
                SetGroupList(data.data.msg.GroupList);
                SetUserFriends(data.data.msg.PersonalMessagingList);
                return;
            }
            catch(e)
            {
                alert("Error Occurred while Fetching Group List !");
                return;
            }
        };
        const GetUserDetails = async () => {
            const Config = {
                headers : {
                    "authorization" : token
                }
            };
            try{
                const data = await axios.get(`${APIurl}/Users/Profile/Details` , Config);
                SetUserDetails(data.data.msg);
                return;
            }
            catch(e)
            {
                alert("Error Occurred while Fetching Users Data !");
                return;
            }
        }
        GetGroupList();
        GetUserDetails();
    },[]);
    useEffect(function(){
        const token = localStorage.getItem("token");
        const GetMessageData = async () => {
            const Config = {
                headers : {
                    "authorization" : token
                } , 
                params : {
                    groupUniqueId : selectedId
                }
            };
            try{
                const result:any = await axios.get(`${APIurl}/Users/Message/UserToGroup/Access/All` , Config);
                if(result.data.msg.length != 0)
                {
                    SetMessagedata(result.data.msg[0].messages);
                    return ;
                }
                return;
            }
            catch(e)
            {   
                console.log(e);
                alert("Error Occurred while fetching messages data!");
                return;
            }
        };
        GetMessageData();
    }
    , [selectedId]);
    return <>
    {
        // GroupInfoStatus ?<div className="w-full h-full flex justify-center items-center"><GroupInfo SetGroupSelector={SetGroupInfoFunction} GroupName={}/></div>:
        GroupInfoStatus ?<div className="w-full h-full flex justify-center items-center">{
            GroupList.map((user:any)=>
              user.Groupuniqueid == selectedId ?<GroupInfo SetGroupSelector={()=>SetGroupInfoFunction()} GroupUniqueId={selectedId} FriendsUser={UserFriends}/> :null  
            )
        }</div>:
        <>
        <div className="flex w-full h-full justify-center items-center">
            <div className="h-full pt-[1rem] pb-[1rem]">
                <div className="bg-black-500 w-[20rem] rounded-md px-8 py-4 ml-4 flex flex-col gap-4 border border-slate-500  h-full">
                    <div className="w-full">
                         <div className="flex flex-col gap-2 overflow-y-auto overflow-hidden">
                            {GroupList.map((user:any)=>(<FriendsSideBar ProfileImage={user.Groupprofilephoto} Name={user.name}  UniqueId={user.Groupuniqueid} SetSelectedId={()=>SetSelectedId(user.Groupuniqueid)} selectedId={selectedId}/>))}
                         </div>
                    </div>
                </div>
            </div>            
            <div className="bg-slate-600 w-[0.2px]"></div>
            
            <div className="flex-1 flex flex-col h-full relative">
            {selectedId != null
            ?<>
                <div className=" bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                    {
                    GroupList.map((user:any)=>
                    user.Groupuniqueid == selectedId ?<UserToGroupNavBar name={user.name} Groupprofilephoto={user.Groupprofilephoto} SetGroupSelector={()=>SetGroupInfoFunction()} GroupUniqueId={user.Groupuniqueid}/> :null  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
                    {Messagedata != null
                        ? Messagedata.map((msg:any, index:any) => (
                            <div
                                key={index}
                                className={`flex w-full ${
                                    msg.senderUniqueId === UserDetails.UniqueId ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div className={`flex max-w-[60%] ${
                                    msg.senderUniqueId === UserDetails.UniqueId ? "flex-row-reverse" : "flex-row"
                                } gap-2`}>

                                        {/* Message Bubble */}
                                        <div className={`flex flex-col ${
                                            msg.senderUniqueId === UserDetails.UniqueId
                                                ? "items-end" 
                                                : "items-start"
                                        }`}>
                                        {
                                            msg.senderUniqueId == UserDetails.UniqueId
                                            ?<div className="text-slate-500 text-[0.8rem] mb-[0.2rem]">{msg.name}</div>
                                            :null
                                        }
                                        {/* Content Bubble */}
                                        <div className={`p-3 rounded-2xl ${
                                            msg.senderUniqueId === UserDetails.UniqueId
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
                                        <span className="flex mt-1 px-1">
                                            <span className="text-[10px] text-gray-500 mr-[0.5rem]">{`${msg.Date}`}</span>
                                            <span className="text-[10px] text-gray-500">{`${msg.time}`}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                        :<div className="flex justify-center items center w-full h-full font-bold text-slate-600 text-[1.3rem] text-center mt-[12rem]">Take the leap, type the first word, and transform this silence into a connection worth remembering.</div>
                    }
                </div>
                <div className="bg-black-500 backdrop-blur-md border rounded-lg border-slate-500 border-md border-full w-full mb-[1rem] mr-[1rem] ml-[1rem]">
                    <TypeTheMessage type="group" groupUniqueId={selectedId}/>
                </div>
            </>
            :<div className="flex justify-center items-center w-full h-full text-slate-700 text-[10rem] font-bold">
                LiveLink
            </div>
            }
            </div>
        </div>
        </>
    }
    </>
}