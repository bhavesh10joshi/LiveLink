import { Logo } from "../Icons/Logo"


export function Footer()
{
    return <>
        <div className="h-40 w-full bg-black-800 pl-5 place-content-between lg:h-20 lg:pr-10 lg:flex">
            <div className="flex justify-center ml-[-4rem] lg:ml-[0rem]">
                <div className="lg:mt-[0rem] mt-[-2rem]">
                    <Logo size="Secondry" mode="dark"/>
                </div>
                <div className="flex justify-center items-start text-white m-[-0.5rem] lg:items-center">
                    <b className="lg:text-xl">LiveLink</b>
                </div>
            </div>
            <div className="gap-8 lg:flex lg:justify-center lg:items-center">
                <div className="flex justify-center items-center ">
                    <a href="" className="text-slate-300 lg:text-[0.9rem] text-[0.7rem] hover:text-white">Privacy Policy</a>
                </div>
                <div className="flex justify-center items-center mt-[0.5rem] lg:mt-[0rem]">
                    <a href="" className="text-slate-300 lg:text-[0.9rem] text-[0.7rem]  hover:text-white">Terms Of Service</a>
                </div>
                <div className="flex justify-center items-center  mt-[0.5rem] lg:mt-[0rem]">
                    <a href="" className="text-slate-300 lg:text-[0.9rem] text-[0.7rem]  hover:text-white">Contact Support</a>
                </div>
            </div>
            <div className="text-slate-500 lg:text-[0.9rem] text-[0.7rem] font-bold flex justify-center items-center mt-[1rem] lg:mt-[0rem]">
                © 2023 NexusChat Inc. All rights reserved.
            </div>
        </div>
    </>
}