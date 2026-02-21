import { Logo } from "../Icons/Logo";
import { Button } from "../Buttons/Button";
import { useState } from "react";
import { Drop } from "../Icons/DropDownIcon";
import { DropDown } from "../DropDown/DropDown";
import { useNavigate } from "react-router-dom";

export function Navbar()
{
    const navigate = useNavigate();

    
    function NavigatetoPages(val:String)
    {
        if(val == "CreateAccount")
        {
            navigate("/LiveLink/User/Create/Account");
        }
        else if(val == "Features")
        {
            navigate("/LiveLink/Features");
        }
        else if(val == "Security")
        {
            navigate("/LiveLink/Application/Security");
        }
        else if(val == "Pricing")
        {
            navigate("/LiveLink/Application/Pricing");
        }
        else if(val == "Home")
        {
            navigate("/LiveLink/Application/Pricing");
        }
        else
        {
            navigate("/LiveLink/User/SignIn");
        }
    }

    function SetOpenDropDown()
    {
        SetDropDown(function(dropDown)
        {
            return !dropDown;
        });
    }
    function SetHome(e:any)
    {
        e.preventDefault();
        SetSelector("Home");
        NavigatetoPages("Home");
    }
    function SetSecurity(e:any)
    {
         e.preventDefault();
        SetSelector("Security");
        NavigatetoPages("Security");
    }
    function SetPricing(e:any)
    {
         e.preventDefault();
        SetSelector("Pricing");
        NavigatetoPages("Pricing");
    }
    function SetFeatures(e:any)
    {
         e.preventDefault();
        SetSelector("Features");
        NavigatetoPages("Features");
    }
    
    const [dropDown , SetDropDown] = useState(true);
    const [selector , SetSelector] = useState(String);
    console.log(selector);
    return <> 
        <div className="h-20 w-full bg-black-800 pr-5 flex place-content-between lg:pl-5 lg:pr-10">
            <div className="flex">
                <Logo size="Secondry" mode="dark"/>
                <div className="flex justify-center items-center text-white m-[-0.5rem]">
                    <b className="text-xl">LiveLink</b>
                </div>
            </div>
            <div className="hidden md:flex justify-center items-center gap-8">
                <div>
                    {
                        selector=="Home" ?<div className="flex justify-center items-center flex-col"><a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white " onClick={SetHome}>Home</a><div className="h-[0.2rem] w-full bg-blue-800"></div></div>
                                         :<a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white" onClick={(e) => SetHome(e)}>Home</a>
                    }
                </div>
                <div>
                    {
                        selector=="Security" ?<div className="flex justify-center items-center flex-col"><a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white " onClick={SetSecurity}>Security</a><div className="h-[0.2rem] w-full bg-blue-800"></div></div>
                                         :<a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white" onClick={(e) => SetSecurity(e)}>Security</a>
                    }
                </div>
                <div>
                    {
                        selector=="Pricing" ?<div className="flex justify-center items-center flex-col"><a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white " onClick={SetPricing}>Pricing</a><div className="h-[0.2rem] w-full bg-blue-800"></div></div>
                                         :<a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white" onClick={(e) => SetPricing(e)}>Pricing</a>
                    }
                </div>
                <div>
                   {
                        selector=="Features" ?<div className="flex justify-center items-center flex-col"><a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white " onClick={SetFeatures}>Features</a><div className="h-[0.2rem] w-full bg-blue-800"></div></div>
                                         :<a href="" className="text-slate-300 text-[0.9rem] font-bold hover:text-white" onClick={(e) => SetFeatures(e)}>Features</a>
                    }
                </div>
                <div>
                    <Button size="secondry" text="Sign In" color="Blue" onClick={()=>NavigatetoPages("SignIn")}/>
                </div>
                <div>
                    <Button size="primary" text="Create Account" color="Blue" onClick={()=>NavigatetoPages("CreateAccount")}/>
                </div>
            </div>
            <div className="md:hidden flex justify-center items-center">
                <Drop onClick={SetOpenDropDown}/>
            </div>
        </div>
        <div className="lg:hidden">
                <DropDown DropDown={dropDown}/>
        </div>
        <div className="bg-slate-700 h-[0.4px]">
        </div>
    </>
}