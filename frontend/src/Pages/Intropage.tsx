import { Button } from "../Components/Buttons/Button"
import Mainpagedesign from "../Components/ui/Image/IntropageImage/Mainpagedesign.png"
import { FrontArrow } from "../Components/Icons/RightArrow"
import { Features } from "../Components/Features/features"
import { Navbar } from "../Components/NavBar/Navbar"
import { Footer } from "../Components/Footer/Footer"

export function IntroPage()
{
    return<>
    <div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
        <Navbar/>
            <div className="w-full flex justify-center items-center ">
                <div className="flex text-blue-800 font-bold border border-blue-800 pl-3 pr-3 pt-1 pb-1 rounded-xl bg-[#172554] mt-10 lg:mt-20">
                    <div className="text-[0.5rem] font-bold lg:text-[0.7rem]">●</div>
                    <div className="text-[0.5rem] ml-1 font-bold lg:text-[0.7rem] ">NOW WITH ENTERPISE SECURITY</div>
                </div>
            </div>
            <div className=" w-full justify-center items-center mt-5 text-[3rem] lg:text-[4.5rem] lg:flex lg:gap-2">
                <div className="text-white font-bold  flex justify-center items-center lg:mr-2">Stay</div>
                <div className="text-blue-800 font-bold flex justify-center items-center lg:mr-2">Connected</div>
                <div className="text-white font-bold  flex justify-center items-center lg:mr-2">Everywhere.</div>
            </div>
            <div className="mt-5 text-[0.6rem] text-slate-400 font-bold lg:text-[1.2rem]">
                <div className="w-full flex justify-center items-center">Experience real-time communication like never before. Secure, fast,</div>
                <div className="w-full flex justify-center items-center">and built for modern teams who demand excellence in every</div>
                <div className="w-full flex justify-center items-center">interaction.</div>
            </div>
            <div className=" w-full justify-center items-center mt-16 gap-8 lg:flex">
                <div className="flex justify-center items-center">
                    <Button size="tertiary" BackIcon={<FrontArrow/>} text="Get Started Free" color="Blue"/>
                </div>
                <div className="flex justify-center items-center mt-2 lg:mt-0">
                    <Button size="tertiary"  text="Learn More" color="Grey"/>
                </div>
            </div>
            <div className="flex justify-center align-center mt-20">
                <img src={Mainpagedesign} alt="MainPageDesign" className="h-[13rem] rounded-xl lg:h-[40rem]"/>
            </div>
            <div className="mt-20 pl-5 pr-5 lg:flex lg:gap-8 lg:pl-10 lg:pr-10 lg:mt-40">
                <Features type="Realtime"/>
                <Features type="Encrypted"/>
                <Features type="Collab"/>
            </div>
            <div className="mt-20">
                <Footer/>
            </div>
    </div>
    </> 
}