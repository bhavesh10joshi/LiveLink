import { CloseIcon } from "../Components/Icons/CloseIcon"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { useEffect, useState } from "react"
import { DeleteUserAccount } from "./DeleteUserAccount"
import { EditUserProfile } from "./EditUserProfile"
import { CreateNewGroup } from "./CreateNewGroup"
import axios from "axios"
import { APIurl } from "../Config/ApiConfig"

interface FriendsUsers {
    ProfileImage: string,
    Name: string,
    UniqueId : string,
}
interface Styles{
    SetSelectorFunction : ()=>void
}


export function UserSettings( props:Styles )
{
    const[DeleteAccount , SetAccountDelete] = useState(false);
    const [UserProfileChange , SetProfileChange] = useState(false);
    const[CreatenewGroup , SetCreateNewGroup] = useState(false);
    const[BackendData , SetBackenddata] = useState({
        "name": "",
        "ProfilePhoto": Profile,
        "UniqueId": "",
        "GroupList": [],
        "PersonalMessagingList": [{
            "name" : "", 
            "profilephoto" : Profile ,
            "uniqueid" : ""
        }],
        "about" : "" 
    });

    function SetDeleteAccountFunction()
    {
        SetAccountDelete(!DeleteAccount);
    }
    function SetChangeUserProfileFunction()
    {
        SetProfileChange(!UserProfileChange);
    }
    function SetCreateNewGroupfunction()
    {
        SetCreateNewGroup(!CreatenewGroup);
    }

    useEffect(function(){
        const HitBackend = async() =>
            {
                try{
                        const token = localStorage.getItem("token");
                        const payload = {
                            headers: {
                                "authorization": token
                            }
                        };
                        const response:any = await axios.get( `${APIurl}/Users/Profile/Details` , payload);
                        console.log(response.data.msg.PersonalMessagingList);
                        SetBackenddata(response.data.msg);
                }
                catch(e)
                {       
                    alert("Error While Fetching the User Info !");
                }
            }
        HitBackend();
    }, []);

    return<>{!UserProfileChange
        ? !DeleteAccount
        ? !CreatenewGroup 
                ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                    <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                        <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                            <div className="flex justify-center items-center"><button type="button" className="border-[2px] bg-black-800 border-red-600 w-[10rem] h-[2rem] rounded-md text-white text-[0.9rem] hover:shadow-red-600/80" onClick={()=>SetDeleteAccountFunction()}>Delete Account</button></div>
                            <div className="flex justify-center items-center"><button type="button" className="border-[2px]  bg-black-800 border-green-600 w-[10rem] h-[2rem] rounded-md text-white text-[0.9rem] ml-[-3rem] hover:shadow-green-600/80" onClick={()=>SetCreateNewGroupfunction()}>Create New Group</button></div>
                            <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetSelectorFunction()}><div><CloseIcon/></div></button></div>
                        </div>
                        <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                        <div className="flex justify-center items-center mt-[2rem]">
                            <img src={BackendData.ProfilePhoto} alt="" className="rounded-full w-[10rem]"/>
                            {<button type="button" aria-label="Name" className="bg-blue-800 w-[2rem] h-[2rem] rounded-full flex justify-center items-center mt-[4rem] ml-[-1.5rem]" onClick={()=>SetChangeUserProfileFunction()}>
                                <div><EditPencil/></div>
                            </button>}
                        </div>
                        <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[1rem] pl-[2rem] pr-[2rem] text-white font-bold">{BackendData.name}</div></div>
                        <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-slate-400">{BackendData.about}</div></div>
                        
                        <div className=" pl-[2rem] pr-[2rem] relative flex-1 overflow-y-auto mb-4 mt-[1rem]">
                            {BackendData.PersonalMessagingList.map((user)=>(<div className="bg-black-800 w-full h-[4rem] pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] rounded-xl flex mt-[1rem] ">
                                <div className="w-1/6">
                                    <img src={user.profilephoto} alt="MemberInfo" className="w-[3rem] rounded-full"/>
                                </div>
                                <div className="w-3/6 place-content-center">
                                    <div className="flex justify-start items-start w-full"><div className="text-[0.9rem]">{user.name}</div></div>
                                </div>
                            </div>))}
                        </div>
                    </div>
                </div>
            :<CreateNewGroup SetCreateNewGroupFunction={() => SetCreateNewGroupfunction()}/>
        :<div><DeleteUserAccount SetDeleteGroupFunction={()=>SetDeleteAccountFunction()}/></div>
        :<div><EditUserProfile ProfileImage={BackendData.ProfilePhoto} About={BackendData.about} Name={BackendData.name} SetEditUserProfileSelector={()=>SetChangeUserProfileFunction()}/></div>
        }
    </>
}