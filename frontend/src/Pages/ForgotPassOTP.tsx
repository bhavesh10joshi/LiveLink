import { Button } from "../Components/Buttons/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthEmail } from "../Components/Icons/AuthEmail";
import { VerifyOtp } from "../Components/Otp/VerifyOtp";
import axios from "axios";
import { APIurl } from "../Config/ApiConfig";

export function VerifyEmailOTP()
{
    const Navigate = useNavigate();
    const[otp , Setotp]:any = useState(new Array(6).fill(""));
    async function HitBackend()
    {
        const otpRecieved = otp.join("");
        console.log(otpRecieved);
        const Payload = {
            email : localStorage.getItem("email") , 
            otp : otpRecieved
        };
        try
        {
            await axios.post(`${APIurl}/Users/Otp/Authentication` , Payload);
            Navigate("/LiveLink/User/SignIn/Change/Password");
            return;
        } 
        catch(e)
        {
            alert("Wrong Otp Entered !");
            return;
        }
    }
    async function ResendOtp()
    {
        const email = localStorage.getItem("email"); 
        const Payload = {
            input : email
        };
        try
        {
            await axios.post(`${APIurl}/Users/Login/ForgotPassword/otp-Generate` , Payload );
            alert("Otp Sent !");
            return;
        }
        catch(e)
        {
            alert("Error Occurred while Generating Otp !");
            return;
        }
    }
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
            <div className="flex justify-center items-center text-slate-300 text-[0.8rem] ">
                We've sent a 6-digit verifiction code to your registered Email. Please enter it below.
            </div>
            <div className="flex justify-center items-center flex-col w-[40rem] h-[20rem] rounded-md bg-blue-950 mt-[2rem] pl-[3rem] pr-[3rem]">
                <VerifyOtp length={6} Otp={otp} SetOtp={(val)=>{Setotp(val)}}/>
                <div className="mt-[3rem] w-full pl-[3rem] pr-[3rem]">
                    <button type="button" className="flex justify-center items-center pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem] bg-blue-800 text-white font-bold rounded-md w-full" onClick={() => HitBackend()}>Submit & Proceed</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[1rem] text-[0.8rem]">
                <div className="text-slate-500 mr-[0.2rem]">Didn't Recieve the code ?</div>
                <div><button type="button" className="text-blue-800 font-bold" onClick={() => ResendOtp()}>Resend Code</button></div>
            </div>
        </div>
    </>
}