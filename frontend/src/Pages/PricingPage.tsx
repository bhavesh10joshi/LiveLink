import { Button } from "../Components/Buttons/Button"
import Mainpagedesign from "../Components/ui/Image/IntropageImage/Mainpagedesign.png"
import { FrontArrow } from "../Components/Icons/RightArrow"
import { Features } from "../Components/Features/features"
import { Navbar } from "../Components/NavBar/Navbar"
import { Footer } from "../Components/Footer/Footer"
import { Toggle } from "../Components/PricingToggles/PricingToggle";
import { useState } from "react"
import { PricingDetails } from "../Components/PricingDetails/pricingdetails";
import { question } from "../Components/Faq/Faq"

export function PricingPage()
{
    function SetMonthly()
    {
        SetIsmonthly(function(Ismonthly)
        {
            return !Ismonthly;
        });
    }
    const [selected , SetSelected] = useState("PRO");
    const [Ismonthly , SetIsmonthly] = useState(true);
    return<>
    <div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
        <Navbar/>
            <div className=" w-full justify-center items-center mt-5 text-[3rem] lg:text-[3.5rem] lg:flex lg:gap-2">
                <div className="text-white font-bold  flex justify-center items-center mt-20 lg:mr-2">Choose the plan that's right for your team. </div>
            </div>
            <div className="mt-5 text-[0.6rem] text-slate-400 font-bold lg:text-[1rem]">
                <div className="w-full flex justify-center items-center">Simple, Transparent pricing for teams of all sizes . No hidden fees or complicated contracts !</div>
            </div>
            <div className=" w-full justify-center items-center mt-16 gap-8 lg:flex">
                <Toggle OnClick={SetMonthly} IsYearly={Ismonthly}/>
            </div>
            <div className="mt-10 pl-5 pr-5 lg:flex lg:gap-[4rem] lg:pl-10 lg:pr-10 lg:mt-20 lg:flex lg:place-content-center">
               <div className="flex justify-center items-center"><PricingDetails type="FREE" IsMonthly={Ismonthly} Selection={selected} onclick={()=>{SetSelected("FREE")}}/></div>
               <div className="flex justify-center items-center"><PricingDetails type="PRO" IsMonthly={Ismonthly} Selection={selected} onclick={()=>{SetSelected("PRO")}}/></div>
               <div className="flex justify-center items-center"><PricingDetails type="ENTERPRISE" IsMonthly={Ismonthly} Selection={selected} onclick={()=>{SetSelected("ENTERPRISE")}}/></div> 
            </div>
            <div className=" w-full justify-center items-center mt-5 text-[0.7rem] lg:text-[2rem] lg:flex lg:gap-2">
                <div className="text-white font-bold  flex justify-center items-center mt-20 lg:mr-2">Frequently Asked Questions</div>
            </div>
            <div>
                <div>
                    question
                </div>
                <div></div>
                <div></div>
            </div>
            <div className="mt-20">
                <Footer/>
            </div>
    </div>
    </> 
}