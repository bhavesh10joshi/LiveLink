import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { AddMembersToGroup } from "../Components/Icons/AddMembers"
import { AddMembers } from "./AddMemberstoGroup"
import { useEffect, useState } from "react"
import { EditGroupInfo } from "./EditGroupInfo"
import { SuccessLeaveGroup } from "./SuccessLeftGroup"
import { APIurl } from "../Config/ApiConfig"
import axios from "axios"

interface GroupInfoStyle{
    SetGroupSelector : ()=>void ,
    GroupUniqueId : String , 
    FriendsUser ?: any
}

export function GroupInfo(props:GroupInfoStyle)
{
    const[Addmembers,SetAddMembers] = useState(false);
    const[EditGroupinfo , SetEditGroupInfo] = useState(false);
    const[LeaveGroup , SetLeaveGroup] = useState(false);
    const[GroupInfo , SetGroupInfo]:any = useState([]);
    const [CreatorId , SetCreatorId]:any = useState("");

    function SetAddMembersfunction()
    {       
        SetAddMembers(!Addmembers);
    }
     function SetEditGroupInfofunction()
    {       
        SetEditGroupInfo(!EditGroupinfo);
    }
    function SetLeaveGroupfunction()
    {
        SetLeaveGroup(!LeaveGroup);
    }
    useEffect(function(){
        const HitGroupDetailsBackend = async () => {
            const token = localStorage.getItem("token"); 
            const Config = {
                headers : {
                    "authorization" : token
                } , 
                params : {
                    GroupUniqueId : props.GroupUniqueId
                }
            };
            try{
                const data:any = await axios.get(`${APIurl}/Users/Groups/Details/Get` , Config);
                console.log(data);
                SetGroupInfo(data.data.msg);
                SetCreatorId(data.data.msg.creatorId);
                return;
            }   
            catch(e)
            {
                console.log("Error hei "+e);
                alert("Error Occurred while fetching groupInfo !");
                return;
            }         
        };
        HitGroupDetailsBackend();
    },[]);
    async function LeaveGroupBackend()
    {
        const token = localStorage.getItem("token");
        const Config = {
            headers : {
                "authorization" : token
            }
        };
        const Payload = {
            GroupUniqueId : props.GroupUniqueId
        }
        try{
            await axios.post(`${APIurl}/Users/Groups/Leave` , Payload , Config);
            SetLeaveGroupfunction();
            return ;
        }
        catch(e)
        {
            alert("Error Occurred while leaving group !");
            return;
        }
    };
    return<>
        {
        Addmembers
        ?<div><AddMembers SetAddMembersFunction={()=>SetAddMembersfunction()} GroupMembersList={GroupInfo.UsersList} FriendsUser={props.FriendsUser}/></div>
        : !EditGroupinfo ? !LeaveGroup ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Group Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetGroupSelector()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <img src={GroupInfo.GroupProfileImage} alt="Group Profile Image" className="rounded-full w-[10rem]"/>
                    {<button type="button" aria-label="Name" className="bg-blue-800 w-[2rem] h-[2rem] rounded-full flex justify-center items-center mt-[4rem] ml-[-1.5rem]" onClick={()=>SetEditGroupInfofunction()}>
                        <div><EditPencil/></div>
                    </button>}
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[1rem] pl-[2rem] pr-[2rem] text-white font-bold">{GroupInfo.name}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] pl-[2rem] pr-[2rem] text-slate-400">{GroupInfo.bio}</div></div>
                <div className="w-full flex justify-center items-center pl-[2rem] pr-[2rem] mt-[2rem]">
                    <div className="mr-[1rem] w-3/5">
                        <button type="button" aria-label="Name" className="h-[2rem] bg-blue-800 flex justify-center items-center text-[0.9rem] text-white rounded-md pl-[1rem] pr-[1rem] w-full" onClick={()=>SetAddMembersfunction()}><div className="mr-[0.4rem]"></div>Add Members</button>
                    </div>
                    <div className=" w-2/5">
                        <button type="button" aria-label="Name" className="h-[2rem] bg-red-600 flex justify-center items-center text-[0.9rem] border border-red-800 rounded-md pl-[1rem] pr-[1rem] text-white w-full" onClick={()=>LeaveGroupBackend()}>Leave Group</button>
                    </div>
                </div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] mt-[1rem]"><input className="h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Members ...."/></div>
                <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4">
                    {GroupInfo.UsersList?.map((user:any)=>(<div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
                        <div className="w-1/6">
                            <img src={user.ProfileImage} alt="MemberInfo" className="w-[3rem] rounded-full"/>
                        </div>
                        <div className="w-0/6">{
                            user.OnlineOrNot
                            ?<div className="w-[1rem] h-[1rem] bg-green-500 rounded-full ml-[-1.6rem] mt-[2rem]"></div>
                            : null}
                        </div>
                        <div className="w-3/6 place-content-center">
                            <div className="flex justify-start items-start w-full"><div className="text-[0.9rem]">{user.name}</div></div>
                            <div className="flex justify-start items-center">{user.OnlineOrNot ?<div className="text-[0.7rem] text-slate-500 font-bold">Online</div> :<div className="text-[0.7rem] text-slate-500 font-bold">Away</div>}</div>
                        </div>
                        <div className="w-2/6 flex justify-end items-center">
                            {
                                user.UserId == CreatorId
                                ?<div className="flex justify-center items-center text-blue-800 border-blue-800 border rounded-md pl-[1rem] pr-[1rem] text-[0.9rem]">Admin</div>
                                :<div className="flex justify-center items-center text-slate-500 border-slate-500 border rounded-md pl-[1rem] pr-[1rem] text-[0.9rem]">Member</div>
                            }
                        </div>
                    </div>))}
                </div>
            </div>
        </div>:<SuccessLeaveGroup Name={GroupInfo.name} SetLeaveGroupFunction={()=>SetLeaveGroupfunction()}/> : <div><EditGroupInfo SetEditGroupSelector={()=>SetEditGroupInfofunction()} ProfileImage={GroupInfo.GroupProfileImage} Name={GroupInfo.name} About={GroupInfo.bio} UniqueGroupId={props.GroupUniqueId} IsCreator={CreatorId}/></div>
        }
    </>
}