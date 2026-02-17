import { FriendsSideBar } from "../FriendsSideBar/FriendsSideBar"
import { UserToGroupNavBar } from "../Chatting/UserToGroupNavBar"
import DocumentImage from "../ui/Image/SampleImages/ChattingImages/DocumentImage.png"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { TypeTheMessage } from "../Chatting/TypeMessageSend"
import { GroupInfo } from "../../Pages/GroupInfo";
import { useState } from "react"

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

export function UserToGroupChatDashboard() {
    const[GroupInfoStatus , SetGroupInfo] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("kskjfhdks45646_shdjagjhj");

    function SetGroupInfoFunction()
    {
        SetGroupInfo(!GroupInfoStatus);
    }
    function SetSelectedId(val:string)
    {
        setSelectedId(val);
    }
    return <>
    {
        // GroupInfoStatus ?<div className="w-full h-full flex justify-center items-center"><GroupInfo SetGroupSelector={SetGroupInfoFunction} GroupName={}/></div>:
        GroupInfoStatus ?<div className="w-full h-full flex justify-center items-center">{
            UsersGroup.map((user)=>
              user.UniqueId == selectedId ?<GroupInfo GroupName={user.Name} GroupInfo={user.GroupInfo} Members={user.Groupmembers} GroupProfilePhoto={user.ProfileImage} CreationDate={user.CreationDate} SetGroupSelector={()=>SetGroupInfoFunction()} FriendsUser={UserFriends}/> :null  
            )
        }</div>:
        <div className="flex w-full h-full justify-center items-center">
            {UsersGroup.map((user)=>(<FriendsSideBar ProfileImage={user.ProfileImage} Name={user.Name}  UniqueId={user.UniqueId} IsSelected={user.IsSelected} SetSelectedId={()=>SetSelectedId(user.UniqueId)} selectedId={selectedId}/>))}
            <div className="bg-slate-600 w-[0.2px]"></div>
            {/* 3. Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Header / Top Bar could go here */}
                    {/* Input Area (Your UserToUser or GroupToUser Portal) */}
                <div className=" bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
                    {
                    UsersGroup.map((user)=>
                    user.UniqueId == selectedId ?<UserToGroupNavBar Name={user.Name} ProfilePhoto={user.ProfileImage} SetGroupSelector={()=>SetGroupInfoFunction()}/> :null  )}
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
                        <TypeTheMessage/>
                    </div>
                </div>
        </div>
    }
    </>
}