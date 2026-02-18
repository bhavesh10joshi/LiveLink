import { CloseIcon } from "../Components/Icons/CloseIcon"
import { SaveChanges } from "../Components/Icons/SaveChanges"
import { useState } from "react"
import { EmailAuthChangePassword } from "./AuthenticationChangePassword"
import { FingerPrint } from "../Components/Icons/FingerPrint"

interface Style
{
    SetChangePasswordFunction:()=>void
}

export function ConfirmPasswordChange(props:Style)
{
    return<>
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className=" bg-black-500 w-[30rem] h-[38rem] rounded-xl border-slate-300 border flex flex-col">
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
            <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[5rem]">
                Enter the New Password
            </div>
            <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="New Password" aria-label="Name"/>
            </div>
            <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                About / Description 
            </div>
            <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="Confirm New Password" aria-label="Name"/>
            </div>
            <div className="h-[2px] w-full bg-slate-700 mt-[2rem]"></div>
            <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]">
                <button type="button" aria-label="Name" className="flex justify-center items-center w-4/6 bg-blue-950 border-blue-800 border rounded-md h-[3rem]">
                    <div><SaveChanges/></div>
                    <div className="ml-[0.2rem] text-[1rem] text-slate-300">Save Changes</div>
                </button>
            </div>            
        </div>
    </div>
    </>
}