import { useEffect } from "react";
import { SucessUnfriend } from "../Icons/SuccessUnfriend"
import { useNavigate } from "react-router-dom"


export function Editsuccess()
{
    const Navigate = useNavigate();

    useEffect( function()
    {
        const time = setTimeout(function(){
            Navigate("/LiveLink/User/Dashboard/Chat");
        }, 3000);
        
        return ()=>{
            clearTimeout(time);
        }
    } , []);

    return<>
    <div className="min-h-screen w-full bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)] text-white">
            <div className="flex h-screen overflow-hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                        <div className=" bg-black-500 w-[30rem] h-[13rem] rounded-xl border-slate-300 border flex flex-col justify-center items-center">   
                            <SucessUnfriend/>
                            <div className="flex justify-center items-center font-bold text-[1.7rem]">
                                {`Changes Saved Successfully !`}
                            </div>
                            <div className="flex justify-center items-center text-white text-[0.8rem]">
                                You will be automatically redirected to the Home page 
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </>
} 