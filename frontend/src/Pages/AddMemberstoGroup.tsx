import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { AddtoGroupUser } from "../Components/Icons/AddtoGroupUserIcon"
import { AddMembersToGroup } from "../Components/Icons/AddMembers"
import { useState } from "react"

interface GroupMembers{
    MemberName : string ,
    OnlineOrNot : Boolean , 
    CreatorOrNot : Boolean , 
    ProfilePhoto : string ,
    UniqueId : string
}

interface FriendsUsers {
    ProfileImage: string;
    Name: string;
    UniqueId : string;
}

interface FunctionStyle {
    SetAddMembersFunction : ()=>void , 
    GroupMembersList : GroupMembers[] ,
    FriendsUser : FriendsUsers[]
}

export function AddMembers(props:FunctionStyle)
{
    return <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Add Members</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetAddMembersFunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] mt-[1rem]"><input className="h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Members ...."/></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[1rem]"></div>
                <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4">
                    {props.GroupMembersList.map((user)=>(
                        props.FriendsUser.map((friend)=>(
                            friend.UniqueId != user.UniqueId
                                ?<div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
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
                                       <button type="button" aria-label="Name" className="text-green-500 font-bold border border-green-500 flex justify-center items-center rounded-md pl-[1rem] pr-[1rem]">Add</button>
                                    </div>
                                </div>
                                :null
                        ))
                    ))}
                </div>
            </div>
        </div>
    </>
}