import { Button } from "../Components/Buttons/Button"
import { Features } from "../Components/Features/features"
import { Navbar } from "../Components/NavBar/Navbar"
import { Footer } from "../Components/Footer/Footer"
import PersonChatting from "../Components/ui/Image/PersonChatting/PersonChatting.png"
import { useNavigate } from "react-router-dom"

export function FeaturesPage()
{
    const Navigate = useNavigate();

    function NavigatetosignIn()
    {   
        Navigate("/LiveLink/User/SignIn");
    }   
    function NavigatetoSignUp()
    {
        Navigate("/LiveLink/User/Create/Account");
    }

    return<>
    <div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
        <Navbar/>
            <div className="w-full flex justify-center items-center ">
                <div className="flex text-blue-800 font-bold border border-blue-800 pl-3 pr-3 pt-1 pb-1 rounded-xl bg-[#172554] mt-10 lg:mt-10">
                    <div className="text-[0.5rem] font-bold lg:text-[0.7rem]">●</div>
                    <div className="text-[0.5rem] ml-1 font-bold lg:text-[0.7rem] ">APP FEATURES</div>
                </div>
            </div>
            <div className=" w-full justify-center items-center mt-5 text-[3rem] lg:text-[4.5rem]">
                <div className="text-white font-extrabold  flex justify-center items-center lg:mr-2">Elevate Your</div>
                <div className="text-blue-800 font-extrabold flex justify-center items-center lg:mr-2 lg:mt-[-2rem]">Communication.</div>
            </div>
            <div className="mt-5 text-[0.6rem] text-slate-400 font-bold lg:text-[1rem]">
                <div className="w-full flex justify-center items-center">Experience real-time chat web Application designed for speed , security , and team collaboration. Everything you need to stay connected in one sleek interface.</div>
            </div>
            <div className="flex justify-center align-center mt-20">
                <img src={PersonChatting} alt="MainPageDesign" className="h-[13rem] rounded-xl lg:h-[40rem]"/>
            </div>
            <div className="flex justify-start items-center ml-[3rem] mt-[2rem]">
                <div className="text-white font-bold mt-[4rem] text-[2rem]">
                    Powerful Features for Modern Teams
                </div>
            </div>
            <div className="h-[0.4rem] bg-blue-800 w-[6rem] ml-[3rem]"> 
            </div>
            <div className="mt-20 pl-5 pr-5 lg:flex lg:gap-8 lg:pl-10 lg:pr-10 lg:mt-15">
                <Features type="Realtime"/>
                <Features type="RichMediaSupport"/>
                <Features type="Collab"/>
                <Features type="CustomThemes"/>
            </div>
            <div className=" mt-[7rem] ml-[2rem] mr-[2rem] ">
                <div className="rounded-xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f1c3d] via-[#050a18] to-[#0d59f2]">
                    <div className=" w-full justify-center items-center pt-[4rem] text-[3rem] lg:text-[3rem]">
                        <div className="text-white font-extrabold  flex justify-center items-center lg:mr-2">Ready to transform Your WorkFlow?</div>
                    </div>
                    <div className="mt-5 text-[0.6rem] text-slate-400 font-bold lg:text-[1rem]">
                        <div className="w-full flex justify-center items-center">Join Thousands of teams already using our platform to communicate faster and build better Together.</div>
                    </div>
                    <div className=" w-full justify-center items-center mt-16 pb-[5rem] gap-8 lg:flex">
                        <div className="flex justify-center items-center">
                            <Button size="tertiary"  text="Create Free Account" color="Blue" onClick={() => NavigatetosignIn()}/>
                        </div>
                        <div className="flex justify-center items-center mt-2 lg:mt-0">
                            <Button size="tertiary"  text="Account Exists" color="Grey" onClick={() => NavigatetoSignUp()}/>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="mt-20">
                <Footer/>
            </div>
    </div>
    </> 
}