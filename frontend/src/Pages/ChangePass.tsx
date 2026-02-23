import { Button } from "../Components/Buttons/Button"
import { FingerPrint } from "../Components/Icons/FingerPrint"
import { useNavigate } from "react-router-dom"

export function ChangePass()
{
    const Navigate = useNavigate(); 

    return<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md flex-col">
            <div className=" flex justify-start items-start w-full">
                <button type="button" className="ml-[1rem] mt-[-5rem] bg-blue-800 text-white rounded-md pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem]" onClick={() => Navigate("/LiveLink/User/SignIn")}>Back to SignIn</button>    
            </div> 
            <FingerPrint/>
            <div className="flex justify-center items-center text-white text-[2rem]">
                Change Password 
            </div>
            <div className="text-slate-500 text-[0.8rem]" >
                Update Your security settings to keep your account safe.
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="pl-[2rem] pr-[2rem] flex justify-center items-center flex-col bg-slate-800 h-[20rem] w-[33rem] mt-[1rem] rounded-md">
                    <div className="text-slate-400 flex justify-start w-full text-[0.9rem]">New Password</div>
                    <div className="w-full">
                        <input type="text" aria-label="name" placeholder="New Password" className="bg-black-500 h-[3rem] rounded-md pl-[1rem] pr-[1rem] w-full text-[0.9rem] placeholder:text-slate-600"/>
                    </div>
                    <div className="text-slate-400 flex justify-start w-full mt-[1rem] text-[0.9rem]">Confirm New Password</div>
                    <div className="w-full">
                        <input type="text" aria-label="name" placeholder=" Confirm New Password" className="bg-black-500 h-[3rem] rounded-md pl-[1rem] pr-[1rem] w-full text-[0.9rem] placeholder:text-slate-600"/>
                    </div>
                    <div className="mt-[2rem]">
                        <Button 
                            size="extrasized" 
                            color="Blue" 
                            text="Verify and Proceed" 
                        />
                    </div>
                </div>
            </div>           
        </div>
    </>
}