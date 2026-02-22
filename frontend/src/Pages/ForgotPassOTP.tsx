import { Button } from "../Components/Buttons/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthEmail } from "../Components/Icons/AuthEmail";

export function VerifyEmailOTP()
{
    return<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md flex-col">
            <div className="w-full flex justify-center items-center">
                <div className="rounded-full bg-blue-800 w-[5rem] h-[5rem] flex justify-center items-center">
                    <AuthEmail/>
                </div>
            </div>
            <div className="text-white font-bold text-[1.7rem] mt-[1rem]">
                Check Your Email
            </div>
            <div className="flex justify-center items-center text-slate-600 text-[0.8rem] font-bold  mt-[0.5rem]">
                We've sent a 6-digit verifiction code to your registered Email. Please enter it below.
            </div>
            <div className="flex justify-center items-center flex-col w-[30rem] h-[17rem] rounded-md bg-slate-800 mt-[2rem] pl-[3rem] pr-[3rem]">
                <div className="flex justify-center items-center">
                   <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center" aria-label="name"/>
                   <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center ml-[2rem]" aria-label="name"/>
                   <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center ml-[2rem]" aria-label="name"/>
                   <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center ml-[2rem]" aria-label="name"/>
                   <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center ml-[2rem]" aria-label="name"/>
                   <input type="text" className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center ml-[2rem]" aria-label="name"/>
                </div>
                <div className="mt-[3rem]">
                    <Button 
                        size="extrasized" 
                        color="Blue" 
                        text="Verify and Proceed" 
                    />
                </div>
            </div>
            <div className="flex justify-center items-center mt-[1rem] text-[0.8rem]">
                <div className="text-slate-500 mr-[0.2rem]">Didn't Recieve the code ?</div>
                <div><button type="button" className="text-blue-800 font-bold">Resend Code</button></div>
            </div>
        </div>
    </>
}