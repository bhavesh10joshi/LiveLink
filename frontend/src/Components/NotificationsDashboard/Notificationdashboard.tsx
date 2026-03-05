import { useState } from "react";
import axios from "axios";
import { APIurl } from "../../Config/ApiConfig";
import { useEffect } from "react";
import { config } from "zod/v4/core";

interface NotificationStyle{
    TypeOfNotification : "UserToUserRequest" | "UserToGroupRequest" , 
    ReadOrUnread : Boolean , //If it is False it means it is not Read And if it is true it means it is read 
    SenderProfilePhoto : String ,
    NameOfSender : String , 
    NameOfGroup ?: String ,
    Date : String ,
    Time : String
}

const TextStyle:any = {
    "Personal" : "Wants To Start A Chat With You !" ,
    "Group" : "Sent You An invitation for the Group ",
};

export function NotificationDashboard()
{
    const[NotificationSelector , SetNotificationSelector] = useState("Personal"); //There are total 2 options that are "Personal"=>Personal Invitation Notification and "Group" => Group Invitation Notification 
    //By default the button will be at "Personal"
    const[PersonalNotificationdata , SetPersonalNotificationdata]:any = useState([]); 
    const[GroupNotificationData , SetGroupNotificationData]:any = useState([]);
    const[TotalNotifications , SetTotalNotifications]:any = useState(0);
    useEffect(function()
    {
        const PersonalInvitesDataFetch = async ()=>{
            const token = localStorage.getItem("token");
            const Config = {
                headers : {
                    "authorization" : token
                }
            };
            try
            {
                const data = await axios.get(`${APIurl}/Users/Personal/Notifications/Get/All` , Config);
                SetPersonalNotificationdata(data.data.msg);
                return;
            }
            catch(e)
            {   
                alert("Error occurred while fetching personal Invitation Notifications !");
                return;
            }
        };
        const GroupInvitesDataFetch = async ()=>{
            const token = localStorage.getItem("token");
            const Config = {
                headers : {
                    "authorization" : token
                }
            };
            try
            {
                const data = await axios.get(`${APIurl}/Users/Group/Notifications/Get/All` , Config);
                SetGroupNotificationData(data.data.msg);
                return;
            }
            catch(e)
            {   
                alert("Error occurred while fetching Group Invitation Notifications !");
                return;
            }
        };
        const CountTotalNotifications = ()=>{
            const total:any = PersonalNotificationdata.length + GroupNotificationData.length ; 
            SetTotalNotifications(total);
            return;
        }
        PersonalInvitesDataFetch();
        GroupInvitesDataFetch();
        CountTotalNotifications();
    } , [NotificationSelector]);
    async function HitGroupInvitation(GroupUniqueId : String , GroupInvitationUniqueId : String , Decision : Boolean)
    {
        const token = localStorage.getItem("token");
        const Config = {
            headers : {
                "authorization" : token
            }
        };
        const payload = {
            GroupUniqueId  : GroupUniqueId ,
            GroupInvitationUniqueId : GroupInvitationUniqueId , 
            Decision : Decision
        }
        try{
            await axios.post(`${APIurl}/Users/Groups/Invitation/Group-Invite` , payload , Config);
            if(Decision)
            {
                alert("Accepted the Invitation Successfully !");
                return;
            }
            alert("Rejected the Invitation Successfully !");
            return;
        }
        catch(e)
        {
            alert("Error Occurred while Reacting to Invitation !");
            return;
        }
    }
    async function HitPersonalInvitation(PersonalInvitationUniqueId:String , SenderUniqueId:String , Decision : Boolean)
    {
        const token = localStorage.getItem("token");
        const Config = {
            headers : {
                "authorization" : token
            }
        };
        const payload = {
            SenderUniqueId  : SenderUniqueId ,
            PersonalInvitationUniqueId : PersonalInvitationUniqueId , 
            Decision : Decision
        }
        try{
            await axios.post(`${APIurl}/Users/Groups/Invitation/Personal/Message-Invite` , payload , Config);
            if(Decision)
            {
                alert("Accepted the Invitation Successfully !");
                return;
            }
            alert("Rejected the Invitation Successfully !");
            return;
        }
        catch(e)
        {
            alert("Error Occurred while Reacting to Invitation !");
            return;
        }
    }
    return<>
        <div className="w-full pt-[2rem] pl-[4rem] pr-[4rem] border border-white rounded-md mt-[1rem] ml-[2rem] mr-[2rem] mb-[1rem] overflow-hidden">
            <div className="flex place-content-between">
                <div className="font-bold text-[2rem] text-white">Notifications</div>
            </div>
            <div className="text-green-600 text-[0.8rem] font-bold">
                {   TotalNotifications != 0            
                    ?`You Have Total ${TotalNotifications} Unread Messages`
                    :`You're all caught up!`
                }            
            </div>
            <div className="flex w-[7rem] place-content-between mt-[3rem]">
                {
                    NotificationSelector == "Personal" ?<div><div className="text-blue-800 text-[0.9rem] flex justify-center items-center font-bold">Personal </div><div className="bg-blue-800 w-full h-[0.2rem]"></div></div> :<button type="button" onClick={()=>SetNotificationSelector("Personal")} className="text-[0.9rem] flex justify-center items-center text-slate-500">Personal</button>
                }
                {
                    NotificationSelector == "Group" ?<div><div className="text-blue-800 text-[0.9rem] flex justify-center items-center font-bold ml-[3rem]">Group </div><div className="bg-blue-800 w-full h-[0.2rem] ml-[1.7rem]"></div></div> :<button type="button" onClick={()=>SetNotificationSelector("Group")} className="text-[0.9rem] flex justify-center items-center text-slate-500 ml-[3rem]">Group</button>
                }
            </div>
            <div className="bg-slate-800 w-full h-[0.2rem] mt-[-0.2rem]"></div>
            <div className="w-full h-full mt-[3rem] overflow-auto">
               {
                NotificationSelector == "Personal"
                    ? PersonalNotificationdata.length != 0
                        ?PersonalNotificationdata.map((Notifications:any) => (<div className="bg-[#020618] pt-[1rem] mt-[1rem] rounded-xl pl-[1rem] pr-[1rem] pb-[1rem] border-blue-800 border">
                            <div className="flex place-content-between  w-full">
                                <div className="w-0/4"><img src={Notifications.SenderProfilePhoto} alt="SendersProfilephoto" className="rounded-xl w-[2.5rem] mr-[1rem]"/></div>
                                <div className="w-3/4">
                                    <div className="flex justify-start"><div className="font-bold text-[1rem]">{Notifications.NameOfSender}</div></div>
                                    <div className="flex justify-start text-slate-500 text-[0.7rem] font-semibold">
                                        {`${Notifications.NameOfSender} ${TextStyle[NotificationSelector]}`}
                                    </div>
                                </div>
                                <div className="w-1/4 flex justify-end flex justify-start text-slate-500 text-[0.7rem] font-bold">
                                    {`${Notifications.Time} ${Notifications.Date}`}
                                </div>
                            </div>
                            <div className="flex justify-start items-center pl-[4rem] mt-[1rem]">
                                <div className="mr-[1rem]"><button type="button" className="bg-green-600 text-white rounded-xl pt-[0.2rem] pl-[1rem] pr-[1rem] pb-[0.2rem] text-[0.9rem]" onClick={() => HitPersonalInvitation(Notifications.UniqueId,Notifications.SenderUniqueId,true)}>Accept</button></div>
                                <div><button type="button"  className="bg-slate-800 rounded-xl pt-[0.2rem] pl-[1rem] pr-[1rem] pb-[0.2rem] text-[0.9rem]" onClick={() => HitPersonalInvitation(Notifications.UniqueId,Notifications.SenderUniqueId,false)} >Reject</button></div>
                            </div>
                            </div>))
                        :<div className="mt-[10rem] flex justify-center items-center text-slate-600 text-[1.5rem]">Looks like you're up to date</div>

                    : GroupNotificationData.length != 0
                        ?GroupNotificationData.map((Notifications:any) => (<div className="bg-[#020618] pt-[1rem] mt-[1rem] rounded-xl pl-[1rem] pr-[1rem] pb-[1rem] border-blue-800 border">
                            <div className="flex place-content-between  w-full">
                                <div className="w-0/4"><img src={Notifications.SenderProfilePhoto} alt="SendersProfilephoto" className="rounded-xl w-[2.5rem] mr-[1rem]"/></div>
                                <div className="w-3/4">
                                    <div className="flex justify-start"><div className="font-bold text-[1rem]">{Notifications.NameOfSender}</div></div>
                                    <div className="flex justify-start text-slate-500 text-[0.7rem] font-semibold mt-[0.5rem]">
                                        {`${Notifications.NameOfSender} ${TextStyle[NotificationSelector]}`}
                                        <div className="flex ml-[0.5rem] text-white font-bold">{`"${Notifications.GroupName}"`}</div>
                                    </div>
                                </div>
                                <div className="w-1/4 flex justify-end flex justify-start text-slate-500 text-[0.7rem] font-bold">
                                    {`${Notifications.Time} ${Notifications.Date}`}
                                </div>
                            </div>
                            <div className="flex justify-start items-center pl-[4rem] mt-[1rem]">
                                <div className="mr-[1rem]"><button type="button" className="bg-green-600 text-white rounded-xl pt-[0.2rem] pl-[1rem] pr-[1rem] pb-[0.2rem] text-[0.9rem]" onClick={() => HitGroupInvitation(Notifications.GroupUniqueId , Notifications.UniqueId , true)}>Accept</button></div>
                                <div><button type="button"  className="bg-slate-800 rounded-xl pt-[0.2rem] pl-[1rem] pr-[1rem] pb-[0.2rem] text-[0.9rem]" onClick={() => HitGroupInvitation(Notifications.GroupUniqueId , Notifications.UniqueId , false)}>Reject</button></div>
                            </div>
                            </div>))
                        :<div className="mt-[10rem] flex justify-center items-center text-slate-600 text-[1.5rem]">Looks like you're up to date</div>
               }
            </div>
        </div>
    </>
}