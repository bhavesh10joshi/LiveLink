import { CloseIcon } from "../Components/Icons/CloseIcon"
import { useState } from "react"
import { FingerPrint } from "../Components/Icons/FingerPrint"
import axios from "axios"
import { APIurl } from "../Config/ApiConfig"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

interface Style
{
    SetChangePasswordFunction:()=>void
}

export function ConfirmPasswordChange(props:Style)
{
    const Navigate = useNavigate();
    const [NewPassword , SetNewPassword] = useState(null);
    const [ConfirmNewPassword , SetConfirmNewPassword] = useState(null);

    const PasswordRef:any = useRef(null);
    const ConfirmPasswordRef:any = useRef(null);

    async function ConfirmPasswordChange()
    {
        const token = localStorage.getItem("token");
        const Config = {
            headers : {
                "authorization" : token
            }
        };
        const Payload = {
            password : NewPassword
        }
        try
        {
            await axios.post(`${APIurl}/Users/Profile/Change/password` , Payload , Config);
            localStorage.removeItem("token");
            Navigate("/LiveLink/Introduction");
            return;
        }
        catch(e)
        {
            alert("Error Occurred while changing the password !");
            return;
        }
    }

    return<>
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className=" bg-black-500 w-[30rem] h-[43rem] rounded-xl border-slate-300 border flex flex-col">
            <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Change Password</div></div>
                <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={() => props.SetChangePasswordFunction()}><div><CloseIcon/></div></button></div>
            </div>
            <div className="bg-slate-500 h-[0.1px] mt-[1rem] "></div>
            <div className="w-full flex justify-center items-center mt-[2rem]"> 
                <div className=" bg-black-800 rounded-full"> 
                    <FingerPrint/>
                </div>
            </div>
            <div className="flex justify-center items-center pl-[2rem] pr-[2rem] ">
                <div className="text-white font-bold text-[0.8rem] mt-[1rem] text-[1.5rem]">Change Password</div>
            </div>
            <div className="flex justify-center items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[0.5rem]">
                <div>
                    Update your security settings to keep your account safe.
                </div>
            </div>
            <div className="w-full pl-[2rem] pr-[2rem] mt-[3rem]">
                <div className="w-full bg-black border border-blue-800 bg-black-800 text-slate-400 text-[0.8rem] rounded-md pl-[0.5rem] pr-[0.5rem] text-center pt-[0.5rem] pb-[0.5rem]">
                    New Password should have a minimum length of 10 , in which at least one should be a Number and a Character
                </div>
            </div>
            <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[3rem]">
                Enter the New Password
            </div>
            <div className="w-full h-[2.5rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                <input type="password" className="w-full h-full rounded-md bg-slate-700 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="New Password" aria-label="Name" ref={PasswordRef} onChange={() => {SetNewPassword(PasswordRef.current.value)}}/>
            </div>
            <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                {NewPassword != ConfirmNewPassword 
                    ?<>
                        <div className="w-2/4">Confirm New Password</div>
                        <div className="w-2/4 text-red-600 flex justify-end items-center">Passwords are not same</div>
                    </>
                    :<>
                        Confirm New Password
                    </>
                }
            </div>
            <div className="w-full h-[2.5rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                <input type="password" className="w-full h-full rounded-md bg-slate-700 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="Confirm New Password" aria-label="Name" ref={ConfirmPasswordRef} onChange={() => {SetConfirmNewPassword(ConfirmPasswordRef.current.value)}}/>
            </div>
            <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem] mt-[1rem]">
               {NewPassword == ConfirmNewPassword 
                ?<button type="button" aria-label="Name" className="flex justify-center items-center w-full bg-blue-800 rounded-md h-[3rem]" onClick={() => ConfirmPasswordChange()}>
                    <div className="ml-[0.2rem] text-[1rem] text-slate-300">Save Changes</div>
                </button>
                :<button type="button" aria-label="Name" className="flex justify-center items-center w-full bg-blue-800 rounded-md h-[3rem]" onClick={() => alert("Passwords are not same!")}>
                    <div className="ml-[0.2rem] text-[1rem] text-slate-300">Save Changes</div>
                </button>
                }
            </div>            
        </div>
    </div>
    </>
}