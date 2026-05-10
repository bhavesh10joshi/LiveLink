import { useNavigate } from "react-router-dom"
import { CloseIcon } from "../Components/Icons/CloseIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { APIurl } from "../Config/ApiConfig";
import { useGlobalUI } from "../Config/GlobalUIContext";
import { SkeletonProfile } from "../Components/Loader/Skeleton";

interface Style{
    UniqueId : String
    SetAddUserToGroupfunction : ()=>void
};
export function AddUserToGroup(props:Style) {
    const { showLoading, hideLoading, showError } = useGlobalUI();
    const [GroupData, SetGroupData]: any = useState();
    const [isLoading, setIsLoading] = useState(true);
    const Navigate = useNavigate();
    
    useEffect(function() {
        const FetchData = async () => {
            const token = localStorage.getItem("token");
            const config: any = {
                headers: {
                    "authorization": token
                }
            }; 
            try {
                const data: any = await axios.get(`${APIurl}/Users/Profile/Details`, config);
                SetGroupData(data.data.msg.GroupList);
                console.log(data.data.msg.GroupList);
                setIsLoading(false);
            } catch (e) {
                console.log("Error hei" + e);
                setIsLoading(false);
                showError("Error encountered while fetching data!");
                return;
            }
        };
        FetchData() 
    }, []);
    async function SendInvite(GroupUniqueId:String , RecieverUniqueId:String)
    {
        console.log("GroupUniqueId : "+GroupUniqueId );
        console.log("RecieverUniqueId : "+RecieverUniqueId );
        const token = localStorage.getItem("token");
        const config = {
            headers : {
                "authorization" : token
            }
        };
        const payload = {
            GroupUniqueId : GroupUniqueId ,
            RecieverUniqueId : RecieverUniqueId
        }
        showLoading("Sending invite...");
        try{
            await axios.post(`${APIurl}/Users/Groups/Add-Members/Send/Group-Invite` , payload , config);
            hideLoading();
            Navigate("/LiveLink/User/Edit/Success");
        }
        catch(e:any)
        {
            hideLoading();
            if (e.response && e.response.status === 409) {
                showError("Member already exists in this Group!");
            } 
            else {
                console.log(e);
                showError("Error encountered while sending invite!");
            }
        }
    } 
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-black-500 w-[95%] max-w-[30rem] max-h-[90vh] rounded-xl border-slate-300 border flex flex-col overflow-y-auto">

                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className="font-bold text-[1.3rem] text-white-800 flex justify-center items-center">
                        <div className="text-[1.2rem] text-blue-400">Add to Group</div>
                    </div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl">
                        <button type="button" aria-label="Close" onClick={() => props.SetAddUserToGroupfunction()}>
                            <div><CloseIcon /></div>
                        </button>
                    </div>
                </div>
                
                <div className="bg-slate-500 h-[0.3px] mt-[1rem]"></div>
                
                <div className="flex justify-center items-center mt-[2rem] w-full pl-[2rem] pr-[2rem]">
                    <input type="text" aria-label="name" placeholder="Search Groups" className="w-full h-[2rem] rounded-md bg-black-800 border border-white pl-[2rem] pr-[2rem] pt-[1.2rem] pb-[1.2rem]" />
                </div>
                {isLoading
                    ? <div className="flex flex-col pl-[2rem] pr-[2rem] pt-[2rem] pb-[1rem] gap-3">
                        <SkeletonProfile /><SkeletonProfile /><SkeletonProfile />
                      </div>
                    : GroupData && GroupData.length > 0 ? (
                    <div className="flex flex-col pl-[2rem] pr-[2rem] pt-[2rem] pb-[1rem] flex-1 overflow-y-auto gap-3">
                        {GroupData.map((users: any, index: number) => (
                            <div key={index} className="w-full bg-black-800 min-h-[4rem] flex place-content-between pl-[1rem] pr-[1rem] border border-slate-400 rounded-md py-2">
                                <div className="flex justify-center items-center">
                                    <img src={users.Groupprofilephoto} alt="Group Profile Image" className="w-[3rem] h-[3rem] rounded-full object-cover" />
                                    <div className="flex flex-col justify-center items-start ml-[1rem]">
                                        <div className="font-bold">{users.name}</div>
                                        <div className="text-[0.8rem] text-slate-400 line-clamp-1">{users.about}</div>
                                    </div>
                                </div>
                                <div className="w-2/9 flex justify-center items-center">
                                    <button aria-label="Send Invite" className="text-white bg-blue-800 rounded-md pl-[0.5rem] pr-[0.5rem] py-[0.3rem] text-[0.95rem] font-bold" onClick={() => SendInvite(users.Groupuniqueid , props.UniqueId)}>
                                        Send Invite
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col justify-center items-center px-8 py-8 text-center min-h-[12rem]">
                        <div className="text-slate-600 text-[2.5rem] font-bold mb-2">📭</div>
                        <div className="text-white font-bold text-[1.1rem]">No Groups Added</div>
                        <div className="text-slate-500 text-[0.8rem] mt-1">Create or join a group first to start adding members</div>
                    </div>
                )}
            </div>
        </div>
    );
}