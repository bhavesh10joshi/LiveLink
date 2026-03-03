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
    const [selectedId, setSelectedId] = useState<string>("82804af0-03f9-4e08-bcfe-51d18b9757ed");
    const [GroupList , SetGroupList]:any = useState([]);
    const [UserFriends , SetUserFriends]:any = useState([]);

    function SetGroupInfoFunction()
    {
        SetGroupInfo(!GroupInfoStatus);
    }
    function SetSelectedId(val:string)
    {
        setSelectedId(val);
    }
    useEffect(function() {
        const GetGroupList = async () =>{
            const token = localStorage.getItem("token");
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
        GetGroupList();
    },[])
    return <>
    {
        // GroupInfoStatus ?<div className="w-full h-full flex justify-center items-center"><GroupInfo SetGroupSelector={SetGroupInfoFunction} GroupName={}/></div>:
        GroupInfoStatus ?<div className="w-full h-full flex justify-center items-center">{
            GroupList.map((user:any)=>
              user.Groupuniqueid == selectedId ?<GroupInfo SetGroupSelector={()=>SetGroupInfoFunction()} GroupUniqueId={selectedId} FriendsUser={UserFriends}/> :null  
            )
        }</div>:
        <div className="flex w-full h-full justify-center items-center">
            <div className="h-full pt-[1rem] pb-[1rem]">
                <div className="bg-black-500 w-[20rem] rounded-md px-8 py-4 ml-4 flex flex-col gap-4 border border-slate-500  h-full">
                    <div className="w-full">
                        <SearchBar placeholder="Search by Name or Unique Id" />
                         <div className="flex flex-col gap-2 overflow-y-auto overflow-hidden mt-[1rem]">
                            {GroupList.map((user:any)=>(<FriendsSideBar ProfileImage={user.Groupprofilephoto} Name={user.name}  UniqueId={user.Groupuniqueid} SetSelectedId={()=>SetSelectedId(user.Groupuniqueid)} selectedId={selectedId}/>))}
                         </div>
                    </div>
                </div>
            </div>            
            <div className="bg-slate-600 w-[0.2px]"></div>
            {/* 3. Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Header / Top Bar could go here */}
                    {/* Input  Area (Your UserToUser or GroupToUser Portal) */}
                <div className=" bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                    {
                    GroupList.map((user:any)=>
                    user.Groupuniqueid == selectedId ?<UserToGroupNavBar name={user.name} Groupprofilephoto={user.Groupprofilephoto} SetGroupSelector={()=>SetGroupInfoFunction()} GroupUniqueId={user.Groupuniqueid}/> :null  )}
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
                    <div className="bg-black-500 backdrop-blur-md border rounded-lg border-slate-500 border-md border-full w-full mb-[1rem] mr-[1rem] ml-[1rem]">
                        <TypeTheMessage type="personal" RecieverUniqueId={selectedId}/>
                    </div>
                </div>
        </div>
    }
    </>
}