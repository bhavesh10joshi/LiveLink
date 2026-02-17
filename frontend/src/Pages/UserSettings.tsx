import { CloseIcon } from "../Components/Icons/CloseIcon"
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
interface UserStyle{
    Name : string , 
    About : string ,  
    ProfilePhoto : string , 
    CreationDate : string ,
    UniqueId : string , 
    UserFriends : FriendsUsers[] 
}
interface Styles{
    SetSelectorFunction : ()=>void
}

const UserFriends : FriendsUsers[] = [{
        Name : "Bhavesh Joshi",  
        ProfileImage : Profile,
        UniqueId:"kshjahkjsakjdhakljshdklja"
    },{
        Name : "Bhavesh Joshi", 
        ProfileImage : Profile,
        UniqueId:"ndsbfkbkfhhflsdjkahkfhsadkl"
    },{
        Name : "Bhavesh Joshi",  
        ProfileImage : Profile,
        UniqueId:"sjkhlkfihaiofhjdsabfb"
    },{
       Name : "Bhavesh Joshi", 
        ProfileImage : Profile,
        UniqueId:"dfkjbcscaKVWaiudiuau"
    }];

const User:UserStyle = {
    Name : "Bhavesh Joshi" , 
    About : "My name is bhavesh joshi , i am good what about you , though i am busy but i am excellent hahahahha" , 
    ProfilePhoto : Profile , 
    CreationDate : "10-01-2026" , 
    UniqueId : "ahhasjkhkjsahkjhaskjhdaksj" ,
    UserFriends : UserFriends
}

export function UserSettings( props:Styles )
{
    const[DeleteAccount , SetAccountDelete] = useState(false);
    const [UserProfileChange , SetProfileChange] = useState(false);

    function SetDeleteAccountFunction()
    {
        SetAccountDelete(!DeleteAccount);
    }
    function SetChangeUserProfileFunction()
    {
        SetProfileChange(!UserProfileChange);
    }

    return<>{!UserProfileChange
        ? !DeleteAccount
        ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className="flex justify-center items-center"><button type="button" className="bg-red-900 w-[10rem] h-[2rem] rounded-md font-bold" onClick={()=>SetDeleteAccountFunction()}>Delete Account</button></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetSelectorFunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[2rem]">
                    <img src={User.ProfilePhoto} alt="" className="rounded-full w-[10rem]"/>
                    {<button type="button" aria-label="Name" className="bg-blue-800 w-[2rem] h-[2rem] rounded-full flex justify-center items-center mt-[4rem] ml-[-1.5rem]" onClick={()=>SetChangeUserProfileFunction()}>
                        <div><EditPencil/></div>
                    </button>}
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[1rem] pl-[2rem] pr-[2rem] text-white font-bold">{User.Name}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-slate-400">{User.About}</div></div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] mt-[1rem]"><input className="h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Friends ...."/></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[1rem]"></div>
                <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4">
                    {User.UserFriends.map((user)=>(<div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
                        <div className="w-1/6">
                            <img src={user.ProfileImage} alt="MemberInfo" className="w-[3rem] rounded-full"/>
                        </div>
                        <div className="w-3/6 place-content-center">
                            <div className="flex justify-start items-start w-full"><div className="text-[0.9rem]">{user.Name}</div></div>
                        </div>
                    </div>))}
                </div>
            </div>
        </div> 
        :<div><DeleteUserAccount SetDeleteGroupFunction={()=>SetDeleteAccountFunction()}/></div>
        :<div><EditUserProfile ProfileImage={User.ProfilePhoto} About={User.About} Name={User.Name} SetEditUserProfileSelector={()=>SetChangeUserProfileFunction()}/></div>
        }
    </>
}