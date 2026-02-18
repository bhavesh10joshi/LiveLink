import { CloseIcon } from "../Components/Icons/CloseIcon"
import { SaveChanges } from "../Components/Icons/SaveChanges"
import { useState } from "react"
import { EmailAuthChangePassword } from "./AuthenticationChangePassword"

interface EditStyle
{
    SetEditUserProfileSelector : ()=>void , 
    ProfileImage : string , 
    About:string ,
    Name : string 
}

export function EditUserProfile(props:EditStyle)
{
    const [ChangePassword , SetChangePassword] = useState(false);

    function SetChangePasswordFunction()
    {
        SetChangePassword(!ChangePassword);
    }

    return<>{
    !ChangePassword    
        ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[45rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Edit Profile Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetEditUserProfileSelector()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem] "></div>
                <div className="flex justify-center items-center mt-[2rem] pl-[2rem] pr-[2rem]">
                    <button type="button" aria-label="Name"><img src={props.ProfileImage} alt="" className="rounded-full w-[10rem]"/></button>
                </div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] pl-[2rem] pr-[2rem]">
                    <div className="text-slate-500 font-bold text-[0.8rem] mt-[1rem]">Click to Change the Profile Image!</div>
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[2rem]">
                    Name
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder={props.Name} aria-label="Name"/>
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                    About / Description 
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder={props.About} aria-label="Name"/>
                </div>
                <div className="w-full pl-[2rem] pr-[2rem] pt-[0.5rem] mt-[0.5rem]">
                    <button type="button" className="flex justify-center items-center h-[3rem] w-full rounded-md bg-blue-900 text-slate-300 font-bold border border-slate-500" onClick={()=>SetChangePasswordFunction()}>
                        Change Password
                    </button>
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem]">
                    <div className="flex justify-center items-center bg-blue-950 h-[3rem] rounded-md mt-[1rem] pl-[1rem] pr-[1rem]">
                        <div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold mr-[0.5rem]"><div>!</div></div>
                        <div className="text-[0.7rem] text-slate-300 font-bold">Changing your Name or Profile Photo will be visible to your Friends Instantly.</div>
                    </div>
                </div>
                <div className="h-[2px] w-full bg-slate-700 mt-[2rem]"></div>
                <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]">
                    <button type="button" aria-label="Name" className="flex justify-center items-center w-4/6 bg-blue-950 border-blue-800 border rounded-md h-[3rem]">
                        <div><SaveChanges/></div>
                        <div className="ml-[0.2rem] text-[1rem] text-slate-300">Save Changes</div>
                    </button>
                    <button type="button" aria-label="Name" className="flex justify-center items-center w-2/6 bg-slate-900 border-slate-300 border rounded-md h-[3rem] ml-[0.7rem]" onClick={()=>props.SetEditUserProfileSelector()}>Cancel</button>
                </div>            
            </div>
        </div>
        :<div>
            <EmailAuthChangePassword SetChangePasswordFunction={()=>SetChangePasswordFunction()}/>
        </div>
        }
    </>
}
