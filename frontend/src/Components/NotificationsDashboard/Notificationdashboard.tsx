import { useState } from "react";
import axios from "axios";
import { APIurl } from "../../Config/ApiConfig";
import { useEffect } from "react";
import { useGlobalUI } from "../../Config/GlobalUIContext";
import { SkeletonProfile } from "../Loader/Skeleton";

const TextStyle:any = {
    "Personal" : "Wants To Start A Chat With You !" ,
    "Group" : "Sent You An invitation for the Group ",
};

export function NotificationDashboard()
{
    const { showLoading, hideLoading, showError, showSuccess } = useGlobalUI();
    const[NotificationSelector , SetNotificationSelector] = useState("Personal");
    const[PersonalNotificationdata , SetPersonalNotificationdata]:any = useState([]); 
    const[GroupNotificationData , SetGroupNotificationData]:any = useState([]);
    const[TotalNotifications , SetTotalNotifications]:any = useState(0);
    const[isLoadingNotifications, setIsLoadingNotifications] = useState(true);
    const[refreshTrigger, setRefreshTrigger] = useState(false);

    function fetchNotifications() {
        setIsLoadingNotifications(true);
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
                showError("Error occurred while fetching personal Invitation Notifications!");
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
                showError("Error occurred while fetching Group Invitation Notifications!");
                return;
            }
        };
        Promise.all([PersonalInvitesDataFetch(), GroupInvitesDataFetch()]).then(() => {
            setIsLoadingNotifications(false);
        });
    }

    useEffect(function()
    {
        fetchNotifications();
    } , [NotificationSelector, refreshTrigger]);

    useEffect(function() {
        const total = PersonalNotificationdata.length + GroupNotificationData.length;
        SetTotalNotifications(total);
    }, [PersonalNotificationdata, GroupNotificationData]);

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
        showLoading("Processing invitation...");
        try{
            await axios.post(`${APIurl}/Users/Groups/Invitation/Group-Invite` , payload , Config);
            hideLoading();
            if(Decision)
            {
                showSuccess("Accepted the Invitation Successfully!");
            } else {
                showSuccess("Rejected the Invitation Successfully!");
            }
            setRefreshTrigger(prev => !prev);
            return;
        }
        catch(e)
        {
            hideLoading();
            showError("Error occurred while reacting to Invitation!");
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
        showLoading("Processing invitation...");
        try{
            await axios.post(`${APIurl}/Users/Invitation/Personal/Message-Invite` , payload , Config);
            hideLoading();
            if(Decision)
            {
                showSuccess("Accepted the Invitation Successfully!");
            } else {
                showSuccess("Rejected the Invitation Successfully!");
            }
            setRefreshTrigger(prev => !prev);
            return;
        }
        catch(e)
        {
            hideLoading();
            showError("Error occurred while reacting to Invitation!");
            return;
        }
    }
    return<>
        <div className="w-full h-full pt-[1rem] lg:pt-[2rem] px-[1rem] lg:pl-[4rem] lg:pr-[4rem] border border-white rounded-md mt-[0.5rem] lg:mt-[1rem] lg:ml-[2rem] lg:mr-[2rem] mb-[1rem] overflow-hidden flex flex-col">
            <div className="flex place-content-between">
                <div className="font-bold text-[1.3rem] lg:text-[2rem] text-white">Notifications</div>
            </div>
            <div className="text-green-600 text-[0.7rem] lg:text-[0.8rem] font-bold mt-[0.2rem]">
                {   TotalNotifications != 0            
                    ?`You Have Total ${TotalNotifications} Unread Messages`
                    :`You're all caught up!`
                }            
            </div>
            <div className="flex gap-4 mt-[0.8rem]">
                {
                    NotificationSelector == "Personal" ?<div><div className="text-blue-800 text-[0.85rem] flex justify-center items-center font-bold">Personal </div><div className="bg-blue-800 w-full h-[0.2rem]"></div></div> :<button type="button" onClick={()=>SetNotificationSelector("Personal")} className="text-[0.85rem] flex justify-center items-center text-slate-500">Personal</button>
                }
                {
                    NotificationSelector == "Group" ?<div><div className="text-blue-800 text-[0.85rem] flex justify-center items-center font-bold">Group </div><div className="bg-blue-800 w-full h-[0.2rem]"></div></div> :<button type="button" onClick={()=>SetNotificationSelector("Group")} className="text-[0.85rem] flex justify-center items-center text-slate-500">Group</button>
                }
            </div>
            <div className="bg-slate-800 w-full h-[0.2rem] mt-[-0.2rem]"></div>
            <div className="w-full flex-1 mt-[1rem] overflow-auto pb-[1rem]">
               {isLoadingNotifications
                ? <div className="flex flex-col gap-3">
                    <SkeletonProfile /><SkeletonProfile /><SkeletonProfile /><SkeletonProfile />
                  </div>
                : NotificationSelector == "Personal"
                    ? PersonalNotificationdata.length != 0
                        ?PersonalNotificationdata.map((Notifications:any) => (<div className="bg-[#020618] pt-[0.8rem] lg:pt-[1rem] mt-[0.5rem] lg:mt-[1rem] rounded-xl pl-[0.8rem] pr-[0.8rem] lg:pl-[1rem] lg:pr-[1rem] pb-[0.8rem] lg:pb-[1rem] border-blue-800 border">
                            <div className="flex place-content-between w-full">
                                <div className="shrink-0"><img src={Notifications.SenderProfilePhoto} alt="SendersProfilephoto" className="rounded-xl w-[2rem] lg:w-[2.5rem] mr-[0.5rem] lg:mr-[1rem]"/></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-start"><div className="font-bold text-[0.85rem] lg:text-[1rem] truncate">{Notifications.NameOfSender}</div></div>
                                    <div className="flex justify-start text-slate-500 text-[0.65rem] lg:text-[0.7rem] font-semibold">
                                        {`${Notifications.NameOfSender} ${TextStyle[NotificationSelector]}`}
                                    </div>
                                </div>
                                <div className="shrink-0 text-slate-500 text-[0.6rem] lg:text-[0.7rem] font-bold text-right ml-1">
                                    <div>{Notifications.Time}</div>
                                    <div>{Notifications.Date}</div>
                                </div>
                            </div>
                            <div className="flex items-center pl-0 lg:pl-[4rem] mt-[0.6rem] lg:mt-[1rem] gap-2">
                                <button type="button" className="bg-green-600 text-white rounded-xl py-[0.3rem] px-[0.8rem] lg:pt-[0.2rem] lg:pl-[1rem] lg:pr-[1rem] lg:pb-[0.2rem] text-[0.8rem] lg:text-[0.9rem]" onClick={() => HitPersonalInvitation(Notifications.UniqueId,Notifications.SenderUniqueId,true)}>Accept</button>
                                <button type="button" className="bg-slate-800 rounded-xl py-[0.3rem] px-[0.8rem] lg:pt-[0.2rem] lg:pl-[1rem] lg:pr-[1rem] lg:pb-[0.2rem] text-[0.8rem] lg:text-[0.9rem]" onClick={() => HitPersonalInvitation(Notifications.UniqueId,Notifications.SenderUniqueId,false)}>Reject</button>
                            </div>
                            </div>))
                        :<div className="flex justify-center items-center text-slate-600 text-[1rem] lg:text-[1.5rem] h-full text-center">Looks like you're up to date</div>

                    : GroupNotificationData.length != 0
                        ?GroupNotificationData.map((Notifications:any) => (<div className="bg-[#020618] pt-[0.8rem] lg:pt-[1rem] mt-[0.5rem] lg:mt-[1rem] rounded-xl pl-[0.8rem] pr-[0.8rem] lg:pl-[1rem] lg:pr-[1rem] pb-[0.8rem] lg:pb-[1rem] border-blue-800 border">
                            <div className="flex place-content-between w-full">
                                <div className="shrink-0"><img src={Notifications.SenderProfilePhoto} alt="SendersProfilephoto" className="rounded-xl w-[2rem] lg:w-[2.5rem] mr-[0.5rem] lg:mr-[1rem]"/></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-start"><div className="font-bold text-[0.85rem] lg:text-[1rem] truncate">{Notifications.NameOfSender}</div></div>
                                    <div className="flex flex-wrap justify-start text-slate-500 text-[0.65rem] lg:text-[0.7rem] font-semibold mt-[0.3rem] lg:mt-[0.5rem]">
                                        {`${Notifications.NameOfSender} ${TextStyle[NotificationSelector]}`}
                                        <div className="ml-[0.3rem] lg:ml-[0.5rem] text-white font-bold">{`"${Notifications.GroupName}"`}</div>
                                    </div>
                                </div>
                                <div className="shrink-0 text-slate-500 text-[0.6rem] lg:text-[0.7rem] font-bold text-right ml-1">
                                    <div>{Notifications.Time}</div>
                                    <div>{Notifications.Date}</div>
                                </div>
                            </div>
                            <div className="flex items-center pl-0 lg:pl-[4rem] mt-[0.6rem] lg:mt-[1rem] gap-2">
                                <button type="button" className="bg-green-600 text-white rounded-xl py-[0.3rem] px-[0.8rem] lg:pt-[0.2rem] lg:pl-[1rem] lg:pr-[1rem] lg:pb-[0.2rem] text-[0.8rem] lg:text-[0.9rem]" onClick={() => HitGroupInvitation(Notifications.GroupUniqueId , Notifications.UniqueId , true)}>Accept</button>
                                <button type="button" className="bg-slate-800 rounded-xl py-[0.3rem] px-[0.8rem] lg:pt-[0.2rem] lg:pl-[1rem] lg:pr-[1rem] lg:pb-[0.2rem] text-[0.8rem] lg:text-[0.9rem]" onClick={() => HitGroupInvitation(Notifications.GroupUniqueId , Notifications.UniqueId , false)}>Reject</button>
                            </div>
                            </div>))
                        :<div className="flex justify-center items-center text-slate-600 text-[1rem] lg:text-[1.5rem] h-full text-center">Looks like you're up to date</div>
               }
            </div>
        </div>
    </>
}