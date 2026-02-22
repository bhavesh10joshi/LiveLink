import { Button } from "../Components/Buttons/Button"
import { useNavigate } from "react-router-dom"

export function ForgotPassword()
{
    const Navigate = useNavigate();
    return<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md ">
            <div className="w-[32rem] flex justify-center items-center flex-col">
                <div className="text-blue-500 text-[1.2rem] flex justify-start w-full mb-[0.2rem] font-semibold"><div>Forgot Password</div></div>
                <div className="bg-slate-800 w-[32rem] rounded-xl border border-slate-600 shadow-2xl flex flex-col items-center p-[2rem]">
                    <button type="button" className="w-full flex justify-start items-center p-[0.5rem] mb-[1rem]" onClick={() => Navigate("/LiveLink/User/SignIn")}><div className="bg-blue-800 text-white rounded-xl p-[0.5rem] text-[0.7rem]">Back to Sign In</div></button>
                    <div className="text-white text-[1.5rem] font-bold mb-[1rem] w-full"><div className="flex justify-start items-center text-[1.8rem]">Identity Verification</div></div>
                    <div className="text-slate-300 text-left text-[0.8rem] mb-[2rem]">
                        Enter Your email address or your Unique Id and we'll send you a secure code to verify your identity .
                    </div>
                    <div className="flex justify-start items-center w-full">
                        <div className="flex text-slate-300  text-[0.8rem] font-bold">
                            Email or Unique Id
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-[0.5rem] mb-[2rem]">
                        <input type="text" aria-label="Name" className="w-full rounded-md bg-black-500 text-white font-bold h-[3rem] pl-[1rem] pr-[1rem]"/>
                    </div>
                    <Button 
                        size="HomeSize" 
                        color="Blue" 
                        text="Send Verification Code" 
                        onClick={() => Navigate("/LiveLink/User/SignIn/Forgot/Password/Email/Verification")}
                    />
                </div>
            </div>
        </div>
    </>
}