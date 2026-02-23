import { useEffect} from "react"
import { SucessUnfriend } from "../Components/Icons/SuccessUnfriend"
import { useNavigate } from "react-router-dom"

export function SuccessChangePass()
{
    const Navigate = useNavigate();

    useEffect(function()
    {
        const Time = setTimeout( function()
        {
            Navigate("/LiveLink/User/SignIn")
        } , 5000)

        return ()=>clearTimeout(Time)
    } ,[Navigate])
    return<>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md flex-col">
            <div className="flex justify-center items-center bg-black-500 w-[32rem] h-[20rem] rounded-md flex-col font-bold">
                <SucessUnfriend/>
                <div className="text-white text-[1.5rem] mt-[1rem]">
                    Password changed Successfully!
                </div>
                <div className="flex justify-center items-center text-blue-800 text-[0.7rem] mt-[0.5rem]">
                    You will be Automatically redirected to Sign In page
                </div>
            </div>
        </div>
    </>   
}