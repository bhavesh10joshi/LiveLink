import { FriendsSideBar } from "../FriendsSideBar/FriendsSideBar"
import { UserToUserMessagePortal } from "../Chatting/UserToUser"
import DocumentImage from "../ui/Image/SampleImages/ChattingImages/DocumentImage.png"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { TypeTheMessage } from "../Chatting/TypeMessageSend"


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

export function UserToUserChatDashboard() {
return<>
    {/* 2. Chat List Sidebar */}
    <FriendsSideBar />
    
    <div className="bg-slate-600 w-[0.2px]"></div>
    {/* 3. Main Chat Area */}
    <div className="flex-1 flex flex-col h-full relative">
        {/* Header / Top Bar could go here */}
            {/* Input Area (Your UserToUser or GroupToUser Portal) */}
        <div className=" bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
            <UserToUserMessagePortal />
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
</>
}