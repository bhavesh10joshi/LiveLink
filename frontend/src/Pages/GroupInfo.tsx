import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"

interface GroupMember{
    MemberName : string , 
    OnlineOrNot : Boolean , 
    CreatorOrNot : Boolean , 
    ProfilePhoto : string
}
interface GroupInfoStyle{
    SetGroupSelector : ()=>void , 
    GroupName : string , 
    GroupInfo : string , 
    Members : GroupMember[] , 
    GroupProfilePhoto : string , 
    CreationDate : string
}

export function GroupInfo(props:GroupInfoStyle)
{
    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Group Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name"><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[2rem]"><img src={Profile} alt="" className="rounded-full w-[10rem]"/></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </>
}