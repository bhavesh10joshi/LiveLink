import { Button } from "../Components/Buttons/Button"
import Mainpagedesign from "../Components/ui/Image/IntropageImage/Mainpagedesign.png"
import { FrontArrow } from "../Components/Icons/RightArrow"
import { Features } from "../Components/Features/features"
import { Navbar } from "../Components/NavBar/Navbar"
import { Footer } from "../Components/Footer/Footer"
import { Secure } from "../Components/Icons/SecureIcon"

export function SecurityPage()
{
    return<>
    <div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
        <Navbar/>
            <div className="w-full flex justify-center items-center mt-[4rem]">
                <div className="border-slate-500 bg-slate-900 rounded-xl border">
                    <Secure/>
                </div>
            </div>
            <div className=" w-full justify-center items-center mt-5 text-[3rem] lg:text-[4.5rem] lg:flex lg:gap-2">
                <div className="text-white font-bold  flex justify-center items-center ml-[2rem] lg:mr-2 lg:ml-[0rem]">Security at Our</div>
                <div className="text-blue-800 font-bold flex justify-center items-center mt-[-4.4rem] ml-[3rem] lg:mr-2 lg:mt-[0rem] lg:ml-[0rem]">Core</div>
            </div>
            <div className="mt-5 text-[0.6rem] text-slate-400 font-bold pl-[2rem] pr-[2rem] lg:text-[1rem] lg:pl-[0rem] lg:pr-[0rem]">
                <div className="w-full flex justify-center items-center">Your Privacy and security are our top priorities . We Buid with a "Security-First" mindset so you can chat with total peace of mind .</div>
            </div>
            <div className="mt-10 pl-5 pr-5 lg:flex lg:gap-8 lg:pl-10 lg:pr-10 lg:mt-20">
                <Features type="Twoafactorauth"/>
                <Features type="Encrypted"/>
                <Features type="DataPrivacy"/>
            </div>
            <div className="mt-20">
                <Footer/>
            </div>
    </div>
    </> 
}