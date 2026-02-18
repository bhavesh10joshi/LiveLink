import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { UnfriendOrLeaveGroup } from "../Components/Icons/LeaveGrouporUnfriend"
import { SucessUnfriend } from "../Components/Icons/SuccessUnfriend"
import { useState } from "react"

interface UserInfoStyle{
    SetUserSelector : ()=>void , 
    Name : string , 
    About : string ,
    OnlineOrOffline : Boolean,
    ProfileImage : string , 
    UniqueId:string
}

export function UserInfo(props:UserInfoStyle)
{
    const[UnfreindUser , SetUnfriendUser] = useState(false);

    function SetUnfriendUserfunction()
    {
        SetUnfriendUser(!UnfreindUser);
    }

    return<>
        {!UnfreindUser
        ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[30rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">User Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetUserSelector()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <img src={Profile} alt="" className="rounded-full w-[10rem]"/>
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[1rem] pl-[2rem] pr-[2rem] text-white font-bold">{props.Name}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-slate-400">{props.About}</div></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[2rem]"></div>
               <div className="flex justify-center items-center w-full mt-[1.5rem]">
                    <button type="button" aria-label="Name" className="flex justify-center items-center text-white font-bold border border-red-500 rounded-md pl-[5rem] pr-[5rem] bg-red-600 text-[0.8rem]"><div><UnfriendOrLeaveGroup/></div><div>Unfriend this User</div></button>
                </div>
                <div className="text-red-700 flex justify-center items-center text-[0.8rem] mt-[0.5rem] text-center font-bold">You may have to send request to this user again for messaging!</div>
            </div>
        </div>
        :<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[23rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="w-full flex justify-center items-center">
                    <div className="bg-green-950 w-[9rem] h-[6rem] flex justify-center items-center mt-[2rem] rounded-md">
                        <SucessUnfriend/>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[2rem] pl-[2rem] pr-[2rem] text-white font-bold">{`You Unfriended ${props.Name}!`}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-green-500">{`${props.Name} was successfully removed from the Friends List!`}</div></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[2rem]"></div>
               <div className="flex justify-center items-center w-full mt-[1.5rem]">
                    <button type="button" aria-label="Name" className=" h-[3rem] flex justify-center items-center text-white font-bold border border-black-800 rounded-md pl-[5rem] pr-[5rem] bg-green-900 text-[0.8rem]" onClick={()=>SetUnfriendUserfunction()}><div>Continue to Profile</div></button>
                </div>
            </div>
        </div>}
    </>
}