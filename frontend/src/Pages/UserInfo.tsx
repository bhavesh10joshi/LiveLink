import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { UnfriendOrLeaveGroup } from "../Components/Icons/LeaveGrouporUnfriend"


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
    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[30rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Group Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetUserSelector()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <img src={Profile} alt="" className="rounded-full w-[10rem]"/>
                    <button type="button" aria-label="Name" className="bg-blue-800 w-[2rem] h-[2rem] rounded-full flex justify-center items-center mt-[4rem] ml-[-1.5rem]">
                        <div><EditPencil/></div>
                    </button>
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[1rem] pl-[2rem] pr-[2rem] text-white font-bold">{props.Name}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-slate-400">{props.About}</div></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[2rem]"></div>
               <div className="flex justify-center items-center h-full w-full">
                    <button type="button" aria-label="Name" className="flex justify-center items-center text-red-900 font-bold pt-[1rem] border border-red-500 rounded-xl pb-[1rem] pl-[5rem] pr-[5rem] bg-red-200"><div><UnfriendOrLeaveGroup/></div><div>Unfriend</div></button>
                </div>
            </div>
        </div>
    </>
}