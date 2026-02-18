import { CloseIcon } from "../Components/Icons/CloseIcon"
import { Camera } from "../Components/Icons/Camera"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { useState } from "react"
import { DeleteUserAccount } from "./DeleteUserAccount"
import { EditUserProfile } from "./EditUserProfile"

interface FriendsUsers {
    ProfileImage: string,
    Name: string,
    UniqueId : string,
}
interface CreateNewGroupStyle
{
    SetCreateNewGroupFunction : ()=>void ,
    Friends : FriendsUsers[] ,   
}


export function CreateNewGroup(props:CreateNewGroupStyle)
{
    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[45rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className="flex justify-start items-center text-[1.1rem] text-blue-800 font-bold">Create New Group</div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetCreateNewGroupFunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[1rem]">
                    {<button type="button" aria-label="Name" className=" rounded-full flex justify-center items-center mt-[1rem] mb-[2rem]" >
                        <div className="p-[1rem] bg-black-500 border-dotted border-slate-500 border rounded-full h-[8rem] w-[8rem] flex justify-center items-center border-[0.1rem]"><Camera/></div>
                        <div className="mt-[4rem] ml-[-1.5rem] bg-blue-800 w-[2rem] h-[2rem] flex justify-center items-center rounded-full"><EditPencil/></div>
                    </button>}
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                    Group Name
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="Enter the Group Name.." aria-label="Name"/>
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                    About Section
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="Enter the Description of the group..." aria-label="Name"/>
                </div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] mt-[1rem]"><input className="h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Friends ...."/></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[1rem]"></div>
                <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4">
                    {props.Friends.map((user)=>(<div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
                        <div className="w-1/6">
                            <img src={user.ProfileImage} alt="MemberInfo" className="w-[3rem] rounded-full"/>
                        </div>
                        <div className="w-3/6 place-content-center">
                            <div className="flex justify-start items-start w-full"><div className="text-[0.9rem]">{user.Name}</div></div>
                        </div>
                        <div className="w-2/6 flex justify-end items-center">
                            <button className="bg-green-700 text-white border-white border pl-[1rem] pr-[1rem] rounded-md" type="button">Add</button>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    </>
}