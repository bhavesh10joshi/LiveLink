import { Navbar } from "../Components/NavBar/Navbar";
import { Input } from "../Components/Inputs/InputBox";
import { Button } from "../Components/Buttons/Button";
import { Footer } from "../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useRef , useState } from "react";
import axios from "axios";
import { APIurl } from "../Config/ApiConfig";
import { ForgotPassword } from "./ForgotPassEmailVerify";
import { useGlobalUI } from "../Config/GlobalUIContext";

export function SignInPage()
{
    const { showLoading, hideLoading, showError } = useGlobalUI();
    const Navigate = useNavigate();
    const EmailRef:any = useRef(null);
    const PasswordRef:any = useRef(null);
    const [Forgotpassword , SetForgotPassword] = useState(false);
    async function HitBackend()
    {
        const payload:any  = {
            email : EmailRef.current.value , 
            password : PasswordRef.current.value
        };

        showLoading("Signing in...");
        try
        {
            const result = await axios.post(`${APIurl}/Users/Login` , payload);

            if(result)
            {
                localStorage.setItem("token" , result.data.token);
                hideLoading();
                Navigate("/LiveLink/User/Dashboard/Chat");
            }   
            else
            {
                hideLoading();
                showError("Error while Logging In, Please try again later!");
            }
        }
        catch(e)
        {
            hideLoading();
            showError("Error while Logging In, Please try again later!");
        }
    }
    function Navigatetosignin()
    {
        Navigate("/LiveLink/User/Create/Account")
    }

    return<>
        {!Forgotpassword
            ?<div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
            <Navbar/>
        <div className="flex justify-center items-center mt-[4rem]">
            <div className="text-white text-[1.4rem] lg:text-[1.8rem] font-bold">Welcome Back</div>
        </div>
        <div className="flex justify-center items-center lg:mt-[1rem]">
            <div className="text-slate-500 text-[0.7rem] lg:text-[0.9rem] font-bold">Please Enter Your details to Sign In</div>
        </div>
        <div className="w-full flex justify-center items-center mt-[2rem]">
            <div className="bg-slate-800 w-[95%] max-w-[30rem] h-auto rounded border-slate-600 border pl-[1.5rem] pr-[1.5rem] lg:pl-[2rem] lg:pr-[2rem] mb-[5rem]">
                <div className="text-slate-300 font-bold text-[0.9rem] mt-[2rem]">Email</div>
                <div className="mt-[0.4rem]"><Input Inputtype="text" placeholder="Enter Your Email" Reference={EmailRef}/></div>
                <div className="text-slate-300 font-bold text-[0.9rem] mt-[1rem] flex">
                    <div>Password</div>
                    <div className="w-full flex justify-end">
                        <button type="button" className="text-blue-800 hover:text-slate-500" onClick={() => SetForgotPassword(!Forgotpassword)}>Forgot Password</button>
                    </div>
                </div>
                <div className="mt-[0.4rem]"><Input Inputtype="password" placeholder="Enter Your Password" Reference={PasswordRef}/></div>
                <div className="flex justify-center items-center w-full mt-[2rem]">
                    <button type="button" onClick={() => HitBackend()} className="bg-blue-800 hover:shadow-blue-800/80 rounded-md h-12 w-full flex items-center justify-center gap-2 text-white font-[550] shadow-lg hover:-translate-y-0.5">Sign In</button>
                </div>
                <div className="flex justify-between items-center mt-[2rem] lg:mt-[3rem]">
                    <div className="h-[0.1rem] flex-1 bg-slate-500"></div>
                    <div className="text-slate-500 px-3"><div className="font-bold text-[0.8rem]">OR</div></div>
                    <div className="h-[0.1rem] flex-1 bg-slate-500"></div>
                </div>
                <div className="flex justify-center items-center mt-[2rem] lg:pb-[10rem] pb-[5rem]">
                    <div className="flex">
                        <div className="text-slate-300 text-[0.6rem] lg:text-[0.8rem] font-bold" onClick={()=>Navigatetosignin()}>Don't have an Account ?</div>
                        <button type="button" className="text-blue-800 hover:text-slate-500 text-[0.6rem] lg:text-[0.8rem] font-bold ml-[0.2rem]" onClick={() => Navigatetosignin()}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/></div>
        :<div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]"><ForgotPassword/></div>}
    </>
}