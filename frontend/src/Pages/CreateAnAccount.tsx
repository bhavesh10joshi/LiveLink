import { Navbar } from "../Components/NavBar/Navbar";
import { Input } from "../Components/Inputs/InputBox";
import { Contact } from "../Components/Icons/ContactIcon";
import { Mail } from "../Components/Icons/mail";
import { Key } from "../Components/Icons/Pass";
import { Button } from "../Components/Buttons/Button";
import { Google } from "../Components/Icons/Google";
import { GitHub } from "../Components/Icons/GitHub";
import { Footer } from "../Components/Footer/Footer";

export function CreateAccount()
{
    return<>
    <div className="min-h-screen bg-[#030712] bg-[radial-gradient(circle_at_50%_-20%,_rgba(13,89,242,0.15)_0%,_transparent_70%)]">
        <Navbar/>
        <div className="flex justify-center items-center mt-[4rem]">
            <div className="text-white text-[1.4rem] lg:text-[1.8rem] font-bold">Create Your Account</div>
        </div>
        <div className="flex justify-center items-center lg:mt-[1rem]">
            <div className="text-slate-500 text-[0.7rem] lg:text-[0.9rem] font-bold">Start Chatting with Friends and teams in real-time.</div>
        </div>
        <div className="w-full flex justify-center items-center mt-[2rem]">
            <div className="bg-slate-800 w-[17rem] h-[46rem] lg:h-[40rem] lg:w-[30rem] rounded border-slate-600 border pl-[2rem] pr-[2rem]">
                <div className="text-slate-300 font-bold text-[0.9rem] mt-[2rem]">Full Name</div>
                <div className="mt-[0.4rem]"><Input Inputtype="text" placeholder="John Doe" EndIcon={<Contact/>}/></div>
                <div className="text-slate-300 font-bold text-[0.9rem] mt-[1rem]">Email</div>
                <div className="mt-[0.4rem]"><Input Inputtype="text" placeholder="name@company.com" EndIcon={<Mail/>}/></div>
                <div className="text-slate-300 font-bold text-[0.9rem] mt-[1rem]">Password</div>
                <div className="mt-[0.4rem]"><Input Inputtype="password" placeholder="........." EndIcon={<Key/>}/></div>
                <div className="text-slate-300 font-bold text-[0.9rem] mt-[1rem]">Confirm Password</div>
                <div className="mt-[0.4rem]"><Input Inputtype="password" placeholder="........." EndIcon={<Key/>}/></div>
                <div className="flex justify-center items-center w-full mt-[2rem]">
                    <Button size="extrasized" color="Blue" text="Create Account"/>
                </div>
                <div className="flex justify-between mt-[3rem]">
                    <div className="h-[0.1rem] w-[12rem] bg-slate-500"></div>
                    <div className="text-slate-500 h-[0.1rem] flex justify-center items-center"><div className="font-bold text-[0.8rem]">OR</div></div>
                    <div className="h-[0.1rem] w-[12rem] bg-slate-500"></div>
                </div>
                <div className="flex justify-center items-center mt-[3rem] ml-[2.7rem] lg:ml-[0rem] ">
                    <div className="lg:flex justify-center items-center">
                        <button type="button">
                            <div className="flex justify-between border-slate-500 border rounded pr-[1rem] pl-[1rem] pt-[0.5rem] pb-[0.5rem] mr-[3rem] bg-black-500 hover:bg-slate-900">
                                <div><Google/></div>
                                <div className="text-slate-300 flex justify-center items-center"><div className="text-slate-300 font-bold ml-[1rem]">Google</div></div>
                            </div>
                        </button>
                        <button type="button" className="mt-[2rem]">
                            <div className="flex justify-between border-slate-500 border rounded pr-[1rem] pl-[1rem] pt-[0.5rem] pb-[0.5rem] bg-black-500 hover:bg-slate-900">
                                <div><GitHub/></div>
                                <div className="text-slate-300 flex justify-center items-center"><div className="text-slate-300 font-bold ml-[1rem]">GitHub</div></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center mt-[2rem] lg:pb-[10rem] pb-[5rem]">
            <div className="flex">
                <div className="text-slate-500 text-[0.6rem] lg:text-[0.7rem]">By Signing up , You agree to our </div>
                <div className="text-blue-800 text-[0.6rem] ml-[0.1rem] lg:text-[0.7rem]  lg:ml-[0.5rem]">Terms of Service</div>
                <div className="text-slate-500 text-[0.6rem] ml-[0.1rem] lg:text-[0.7rem]  lg:ml-[0.5rem]">and</div>
                <div className="text-blue-800 text-[0.6rem] ml-[0.1rem] lg:text-[0.7rem]  lg:ml-[0.5rem]">Privacy Policy</div>
            </div>
        </div>
        <Footer/>
    </div>
    </>
}