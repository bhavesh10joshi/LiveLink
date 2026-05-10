import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthEmail } from "../Components/Icons/AuthEmail";
import { VerifyOtp } from "../Components/Otp/VerifyOtp";
import axios from "axios";
import { APIurl } from "../Config/ApiConfig";
import { useGlobalUI } from "../Config/GlobalUIContext";

export function VerifyEmailOTP()
{
    const { showLoading, hideLoading, showError, showSuccess } = useGlobalUI();
    const Navigate = useNavigate();
    const[otp , Setotp]:any = useState(new Array(6).fill(""));
    const[OtpState , SetOtpState]:any = useState(true);
    async function HitBackend()
    {
        const otpRecieved = otp.join("");
        console.log(otpRecieved);
        const Payload = {
            email : localStorage.getItem("email") , 
            otp : otpRecieved
        };
        showLoading("Verifying OTP...");
        try
        {
            await axios.post(`${APIurl}/Users/Otp/Authentication` , Payload);
            hideLoading();
            Navigate("/LiveLink/User/SignIn/Change/Password");
            return;
        } 
        catch(e)
        {
            hideLoading();
            SetOtpState(!OtpState);
            return;
        }
    }
    async function ResendOtp()
    {
        const email = localStorage.getItem("email"); 
        const Payload = {
            input : email
        };
        showLoading("Resending OTP...");
        try
        {
            await axios.post(`${APIurl}/Users/Login/ForgotPassword/otp-Generate` , Payload );
            hideLoading();
            showSuccess("OTP Sent!");
            return;
        }
        catch(e)
        {
            hideLoading();
            showError("Error occurred while generating OTP!");
            return;
        }
    }
    return<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md flex-col p-4">
            <div className="w-full flex justify-center items-center">
                <div className="rounded-full bg-blue-800 w-[5rem] h-[5rem] flex justify-center items-center">
                    <AuthEmail/>
                </div>
            </div>
            <div className="text-white font-bold text-[1.4rem] lg:text-[1.7rem] mt-[1rem]">
                Check Your Email
            </div>
            <div className="flex justify-center items-center text-slate-300 text-[0.7rem] lg:text-[0.8rem] text-center px-4">
                We've sent a 6-digit verifiction code to your registered Email. Please enter it below.
            </div>
            <div className="flex justify-center items-center flex-col w-[95%] max-w-[40rem] h-auto rounded-md bg-blue-950 mt-[2rem] px-[1rem] py-[2rem] lg:px-[3rem]">
                <VerifyOtp length={6} Otp={otp} SetOtp={(val)=>{Setotp(val)}}/>
                <div className="mt-[3rem] w-full px-[1rem] lg:px-[3rem]">
                    <button type="button" className="flex justify-center items-center pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem] bg-blue-800 text-white font-bold rounded-md w-full" onClick={() => HitBackend()}>Submit & Proceed</button>
                </div>
                {!OtpState
                ?<div className="flex justify-center items-center text-red-500 font-mono mt-[0.5rem] text-[0.8rem] text-center">
                    Wrong OTP Entered , Please Check Again ! 
                </div>
                :null}
            </div>
            <div className="flex justify-center items-center mt-[1rem] text-[0.8rem]">
                <div className="text-slate-500 mr-[0.2rem]">Didn't Recieve the code ?</div>
                <div><button type="button" className="text-blue-800 font-bold" onClick={() => ResendOtp()}>Resend Code</button></div>
            </div>
        </div>
    </>
}