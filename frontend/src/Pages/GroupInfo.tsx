import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { AddMembersToGroup } from "../Components/Icons/AddMembers"
import { AddMembers } from "./AddMemberstoGroup"
import { useState } from "react"
import { EditGroupInfo } from "./EditGroupInfo"
import { SuccessLeaveGroup } from "./SuccessLeftGroup"

interface GroupMember{
    MemberName : string , 
    OnlineOrNot : Boolean , 
    CreatorOrNot : Boolean , 
    ProfilePhoto : string,
    UniqueId : string
}
interface FriendsUsers {
    ProfileImage: string;
    Name: string;
    UniqueId : string;
}
interface GroupInfoStyle{
    SetGroupSelector : ()=>void , 
    GroupName : string , 
    GroupInfo : string , 
    Members : GroupMember[] , 
    GroupProfilePhoto : string , 
    CreationDate : string ,
    FriendsUser : FriendsUsers[]  
}

export function GroupInfo(props:GroupInfoStyle)
{
    const[Addmembers,SetAddMembers] = useState(true);
    const[EditGroupinfo , SetEditGroupInfo] = useState(false);
    const[LeaveGroup , SetLeaveGroup] = useState(false);

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

    return<>{
        Addmembers
        ?<div><AddMembers SetAddMembersFunction={()=>SetAddMembersfunction()} GroupMembersList={props.Members} FriendsUser={props.FriendsUser}/></div>
        : !EditGroupinfo ? !LeaveGroup ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Group Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetGroupSelector()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <img src={Profile} alt="" className="rounded-full w-[10rem]"/>
                    {<button type="button" aria-label="Name" className="bg-blue-800 w-[2rem] h-[2rem] rounded-full flex justify-center items-center mt-[4rem] ml-[-1.5rem]" onClick={()=>SetEditGroupInfofunction()}>
                        <div><EditPencil/></div>
                    </button>}
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[1rem] pl-[2rem] pr-[2rem] text-white font-bold">{props.GroupName}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-slate-400">{props.GroupInfo}</div></div>
                <div className="flex place-content-between pl-[2rem] pr-[2rem] mt-[2rem]">
                    <div className="text-slate-200 border border-slate-500 rounded-md font-bold flex justify-center items-center pl-[1rem] pr-[1rem] bg-blue-800  text-[0.8rem]"><div>MEMBERS</div></div>
                    <div>
                        <button type="button" aria-label="Name" className="bg-green-800 flex justify-center items-center text-[0.9rem] text-white rounded-md pl-[1rem] pr-[1rem]" onClick={()=>SetAddMembersfunction()}><div className="mr-[0.4rem]"></div>Add Members</button>
                    </div>
                    <div>
                        <button type="button" aria-label="Name" className="bg-red-600 flex justify-center items-center text-[0.9rem] border border-red-800 rounded-md pl-[1rem] pr-[1rem] font-bold text-white" onClick={()=>SetLeaveGroupfunction()}>Leave Group</button>
                    </div>
                </div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] mt-[1rem]"><input className="h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Members ...."/></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[1rem]"></div>
                <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4">
                    {props.Members.map((user)=>(<div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
                        <div className="w-1/6">
                            <img src={user.ProfilePhoto} alt="MemberInfo" className="w-[3rem] rounded-full"/>
                        </div>
                        <div className="w-0/6">{
                            user.OnlineOrNot
                            ?<div className="w-[1rem] h-[1rem] bg-green-500 rounded-full ml-[-1.6rem] mt-[2rem]"></div>
                            : null}
                        </div>
                        <div className="w-3/6 place-content-center">
                            <div className="flex justify-start items-start w-full"><div className="text-[0.9rem]">{user.MemberName}</div></div>
                            <div className="flex justify-start items-center">{user.OnlineOrNot ?<div className="text-[0.7rem] text-slate-500 font-bold">Online</div> :<div className="text-[0.7rem] text-slate-500 font-bold">Away</div>}</div>
                        </div>
                        <div className="w-2/6 flex justify-end items-center">
                            {
                                user.CreatorOrNot 
                                ?<div className="flex justify-center items-center text-blue-800 border-blue-800 border rounded-md pl-[1rem] pr-[1rem] text-[0.9rem]">Admin</div>
                                :<div className="flex justify-center items-center text-slate-500 border-slate-500 border rounded-md pl-[1rem] pr-[1rem] text-[0.9rem]">Member</div>
                            }
                        </div>
                    </div>))}
                </div>
            </div>
        </div>:<SuccessLeaveGroup Name={props.GroupName} SetLeaveGroupFunction={()=>SetLeaveGroupfunction()}/> : <div><EditGroupInfo SetEditGroupSelector={()=>SetEditGroupInfofunction()} ProfileImage={props.GroupProfilePhoto} Name={props.GroupName} About={props.GroupInfo} /></div>
        }
    </>
}