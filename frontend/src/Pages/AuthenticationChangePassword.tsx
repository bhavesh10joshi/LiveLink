import { AuthEmail } from "../Components/Icons/AuthEmail"
import { CloseIcon } from "../Components/Icons/CloseIcon"
import { SaveChanges } from "../Components/Icons/SaveChanges"
import { useState } from "react"
import { Warning } from "../Components/Icons/Warning"
import { ConfirmPasswordChange } from "./ConfirmPasswordChange"

interface AuthStyle
{
    SetChangePasswordFunction : ()=>void
}

export function EmailAuthChangePassword(props:AuthStyle)
{
    const[VerficationStatus , SetVerificationStatus] = useState("Success");

    function SetVerificationStatusFunction(val:string)
    {
        SetVerificationStatus(val);
    }

    return<>
    {VerficationStatus == "InProgress"
        ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Email Verification</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetChangePasswordFunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem] "></div>
                <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] mt-[2rem]">
                    <div className="bg-blue-900 rounded-full p-[1rem] w-[6rem] h-[6rem] flex justify-center items-center"><AuthEmail/></div>
                </div>
                <div className="flex justify-center items-center font-bold text-slate-300 text-[1.5rem] mt-[1rem]">Check Your Email</div>
                <div className="pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-500 text-center mt-[0.5rem]">
                    We have sent a 6-digit verfication code to your registered email Id . Please Enter the Verification Code below for Verfication !
                </div>
                <div className="p-[2rem] flex justify-center items-center">
                    <div className="bg-blue-950 w-full rounded-md h-[12rem] pt-[2rem] pl-[1rem] pr-[1rem]">
                        <div className="flex justify-center items-center">
                            <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-slate-900 text-slate-400 placeholder:text-slate-700 text-[2.5rem] flex justify-center items-center p-[0.7rem]" aria-label="name" placeholder="X"/>
                            <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-slate-900 text-slate-400 placeholder:text-slate-700 text-[2.5rem] flex justify-center items-center p-[0.7rem] ml-[1rem] " aria-label="name" placeholder="X"/>
                            <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-slate-900 text-slate-400 placeholder:text-slate-700 text-[2.5rem] flex justify-center items-center p-[0.7rem] ml-[1rem]" aria-label="name" placeholder="X"/>
                            <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-slate-900 text-slate-400 placeholder:text-slate-700 text-[2.5rem] flex justify-center items-center p-[0.7rem] ml-[1rem]" aria-label="name" placeholder="X"/>
                            <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-slate-900 text-slate-400 placeholder:text-slate-700 text-[2.5rem] flex justify-center items-center p-[0.7rem] ml-[1rem]" aria-label="name" placeholder="X"/>
                            <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-slate-900 text-slate-400 placeholder:text-slate-700 text-[2.5rem] flex justify-center items-center p-[0.7rem] ml-[1rem]" aria-label="name" placeholder="X"/>
                        </div>
                        <div className="p-[2rem] flex justify-center items-center">
                            <div className="flex justify-center items-center text-slate-300 font-bold text-[0.9rem]">Didn't Recieve the code?</div>
                            <div className="ml-[0.5rem]"><button className="text-blue-300 font-bold text-[0.9rem]">Resend Code</button></div>
                        </div>
                    </div>
                </div>
                <div className="h-[2px] w-full bg-slate-700 mt-[2rem]"></div>
                <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]">
                    <button type="button" aria-label="Name" className="flex justify-center items-center w-full bg-blue-950 border-blue-800 border rounded-md h-[3rem]">
                        <div><SaveChanges/></div>
                        <div className="ml-[0.2rem] text-[1rem] text-slate-300 font-bold">Verify & Proceed</div>
                    </button>
                </div>            
            </div>
        </div>
        : VerficationStatus == "Error" 
            ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className=" bg-black-500 w-[30rem] h-[22rem] rounded-xl border-slate-300 border flex flex-col p-[2rem]">
                    <div className="flex justify-center items-center w-full ">
                        <div className="bg-black-800 text-white font-bold w-[8rem] rounded-md h-[8rem] flex justify-center items-center"><Warning/></div>
                    </div>
                    <div className="text-[1.5rem] flex justify-center items-center text-slate-300 mt-[1rem] font-bold">
                        Incorrect Code
                    </div>
                    <div className="flex justify-center items-center mt-[3rem]">
                        <button type="button" className="w-3/5 bg-blue-950 h-[3rem] flex justify-center items-center rounded-md" onClick={()=>SetVerificationStatusFunction("InProgress")}>Try Again</button>
                        <button type="button" className="w-2/5 bg-slate-800 h-[3rem] flex justify-center items-center rounded-md ml-[1rem]" onClick={()=>props.SetChangePasswordFunction()}>Cancel</button>
                    </div>        
                </div>
            </div>
        :<ConfirmPasswordChange SetChangePasswordFunction={() => props.SetChangePasswordFunction()}/> 
    }
    </>
}