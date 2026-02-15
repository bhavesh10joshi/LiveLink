import { useState } from "react";
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { MarkAll } from "../Icons/MarkAll";

interface NotificationStyle{
    TypeOfNotification : "UserToUserRequest" | "UserToGroupRequest" , 
    ReadOrUnread : Boolean , //If it is False it means it is not Read And if it is true it means it is read 
    SenderProfilePhoto : string ,
    NameOfSender : string , 
    NameOfGroup ?: string ,
    Date : string ,
    Time : string
}

function IsTodayOrNot(TodaysDate:string):Boolean
{
    const GlobalWholeDate : Date = new Date();
    const LocalWholeDate : string = GlobalWholeDate.toLocaleDateString();

    if(LocalWholeDate == TodaysDate)
    {
        return true;
    }
    return false;
}

const NotificationData:NotificationStyle[] = [{
    TypeOfNotification : "UserToUserRequest" ,
    ReadOrUnread : false , 
    SenderProfilePhoto : Profile , 
    NameOfSender : "Ajay Pant" ,
    Date : "14-02-2026" ,
    Time : "22:56"  
},
{
    TypeOfNotification : "UserToGroupRequest" ,
    ReadOrUnread : false , 
    SenderProfilePhoto : Profile , 
    NameOfSender : "Divyanshu Kandpal" ,
    NameOfGroup : "College 2023-2027" ,
    Date : "14-02-2026" ,
    Time : "12:56"
},{
    TypeOfNotification : "UserToGroupRequest" ,
    ReadOrUnread : false , 
    SenderProfilePhoto : Profile , 
    NameOfSender : "Divyanshu Kandpal" ,
    NameOfGroup : "College 2023-2027" ,
    Date : "14-02-2026" ,
    Time : "12:56"
}];

const TextStyle = {
    "UserToUserRequest" : "Wants To Start A Chat With You !" ,
    "UserToGroupRequest" : "Sent You An invitation for the Group ",
};

function CountTheNumberofUnreadNotifications()
{
    let val = 0;
    for(let i = 0 ; i<NotificationData.length ; i++)
    {
        if(!NotificationData[i].ReadOrUnread)
        {
            val++;
        }
    };
    const value:string = String(val); 
    return value; 
}

export function NotificationDashboard()
{
    const[NotificationSelector , SetNotificationSelector] = useState("Unread"); //There are a total two Options that are "All" and "Unread" , All->shows all read and unread notifications and Unread->shows all the unread messages 
    //By default the button will be at "All"
    return<>
        <div className="w-full h-full pt-[2rem] pl-[4rem] pr-[4rem]">
            <div className="flex place-content-between">
                <div className="font-bold text-[2rem] text-white">Notifications</div>
                <div className="flex justify-center items-center w-[10rem] rounded-xl bg-slate-400 h-[2.5rem]"><button type="button" className="flex justify-center items-center text-[0.9rem] text-black-500"><span className="mr-[0.5rem]"><MarkAll/></span>Mark All as read</button></div>
            </div>
            <div className="text-slate-400 text-[0.8rem] ">
                You Have {CountTheNumberofUnreadNotifications()} Unread Messages!
            </div>
            <div className="flex w-[7rem] place-content-between mt-[3rem]">
                {
                    NotificationSelector == "All" ?<div><div className="text-blue-800 text-[0.9rem] flex justify-center items-center font-bold">All</div><div className="bg-blue-800 w-full h-[0.2rem]"></div></div> :<button onClick={()=>SetNotificationSelector("All")} className="text-[0.9rem] flex justify-center items-center text-slate-500">All</button>
                }
                {
                    NotificationSelector == "Unread" ?<div><div className="text-blue-800 text-[0.9rem] flex justify-center items-center font-bold">Unread</div><div className="bg-blue-800 w-full h-[0.2rem]"></div></div> :<button onClick={()=>SetNotificationSelector("Unread")} className="text-[0.9rem] flex justify-center items-center text-slate-500">Unread</button>
                }
            </div>
            <div className="bg-slate-800 w-full h-[0.2rem] mt-[-0.2rem]"></div>
            <div className="w-full h-full mt-[3rem]">
               {
                    NotificationData.map((Notifications) => (<div className="bg-[#020618] pt-[1rem] mt-[1rem] rounded-xl pl-[1rem] pr-[1rem] pb-[1rem] border-blue-800 border">
                        <div className="flex place-content-between  w-full">
                            <div className="w-0/4"><img src={Notifications.SenderProfilePhoto} alt="SendersProfilephoto" className="rounded-xl w-[2.5rem] mr-[1rem]"/></div>
                            <div className="w-3/4">
                                <div className="flex justify-start"><div className="font-bold text-[1rem]">{Notifications.NameOfSender}</div></div>
                                <div className="flex justify-start text-slate-500 text-[0.7rem] font-semibold">{
                                    Notifications.TypeOfNotification == "UserToUserRequest"
                                    ?`${Notifications.NameOfSender} ${TextStyle[Notifications.TypeOfNotification]}`
                                    :`${Notifications.NameOfSender} ${TextStyle[Notifications.TypeOfNotification]} ${Notifications.NameOfGroup}`
                                }</div>
                            </div>
                            <div className="w-1/4 flex justify-end flex justify-start text-slate-500 text-[0.7rem] font-bold">{
                                IsTodayOrNot(Notifications.Date)
                                ?Notifications.Time
                                :Notifications.Date
                            }</div>
                        </div>
                        <div className="flex justify-start items-center pl-[4rem] mt-[1rem]">
                            <div className="mr-[1rem]"><button type="button" className="bg-blue-800 rounded-xl pt-[0.2rem] pl-[1rem] pr-[1rem] pb-[0.2rem] text-[0.9rem]">Join</button></div>
                            <div><button type="button"  className="bg-slate-800 rounded-xl pt-[0.2rem] pl-[1rem] pr-[1rem] pb-[0.2rem] text-[0.9rem]">Dismiss</button></div>
                        </div>
                    </div>))
               }
            </div>
        </div>
    </>
}