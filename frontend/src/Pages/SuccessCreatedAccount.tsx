import { Button } from "../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";

export function SuccessCreatedAccount()
{
    const Navigate = useNavigate();

    function redirect()
    {
        Navigate("/LiveLink/User/SignIn");
    }

    return<>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
                    {/* The actual Pop-over box */}
                    <div className="bg-slate-800 w-[20rem] p-[2rem] rounded-xl border border-slate-600 shadow-2xl flex flex-col items-center">
                        <div className="text-white text-[1.5rem] font-bold mb-[1rem]">Success!</div>
                        <div className="text-slate-300 text-center text-[0.9rem] mb-[2rem]">
                            Your account has been created. Check your email to verify.
                        </div>
                        {/* Button to close the pop-over */}
                        <Button 
                            size="HomeSize" 
                            color="Blue" 
                            text="Close" 
                            onClick={() => redirect()} 
                        />
                    </div>
                </div>
    </>
}