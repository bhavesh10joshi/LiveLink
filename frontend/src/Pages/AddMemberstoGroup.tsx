import { CloseIcon } from "../Components/Icons/CloseIcon"
import { useEffect, useState } from "react"
import { SuccessAddedtheMember } from "./SuccessAddedtheMember"
import axios from "axios"
import { APIurl } from "../Config/ApiConfig"

interface FunctionStyle {
    SetAddMembersFunction : ()=>void , 
    GroupMembersList : any ,
    FriendsUser : any , 
    GroupUniqueId : String
}

export function AddMembers(props:FunctionStyle)
{
    const[AddtheMember , SetAddtheMember] = useState(false);
    const[FilteredData , SetFileterdData] = useState([]);
    async function AddMemberToGroup(RecieverUniqueId:String)
    {
        const token = localStorage.getItem("token");
        const Config = {
            headers : {
                "authorization" : token 
            }
        };
        const Payload = {
            GroupUniqueId : props.GroupUniqueId , 
            RecieverUniqueId : RecieverUniqueId
        };
        try{
            await axios.post(`${APIurl}/Users/Groups/Add-Members/Send/Group-Invite` , Payload , Config);
            alert("Added the members successfully !");
            return;
        }
        catch(e)
        {
            alert("Error occurred while adding members to the group !");
            return;
        }
    }
    function SuccessAddedTheMemberFunction()
    {
        SetAddtheMember(!AddtheMember);
    }
    useEffect(() => {
    const groupMemberIds = new Set(props.GroupMembersList.map((member:any) => member.UserUniqueId));
    const dummy:any = props.FriendsUser.filter((friend:any) => !groupMemberIds.has(friend.uniqueid));
    
    SetFileterdData(dummy);
    }, []);

    return <>
        {!AddtheMember
            ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Add Members</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetAddMembersFunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4">
                    {FilteredData.map((user:any)=>(
                        <div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
                                <div className="w-1/6">
                                    <img src={user.profilephoto} alt="MemberInfo" className="w-[3rem] rounded-full"/>
                                </div>
                                <div className="w-0/6">
                                    <div className="w-[1rem] h-[1rem] bg-green-500 rounded-full ml-[-1.6rem] mt-[2rem]"></div>
                                </div>
                                <div className="w-3/6 place-content-center">
                                    <div className="flex justify-start items-start w-full"><div className="text-[0.9rem]">{user.name}</div></div>
                                    <div className="flex justify-start items-center"><div className="text-[0.7rem] text-slate-500 font-bold">Away</div></div>
                                </div>
                                <div className="w-2/6 flex justify-end items-center">
                                    <button type="button" aria-label="Name" className="bg-green-800 h-[2rem] flex justify-center items-center rounded-md pl-[1rem] pr-[1rem] text-white text-[0.8rem]" onClick={() => AddMemberToGroup(user.uniqueid)}>Send Invite</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        :<SuccessAddedtheMember SetSuccessAddMemberFunction={()=>SuccessAddedTheMemberFunction()}/>
        }
    </>
}