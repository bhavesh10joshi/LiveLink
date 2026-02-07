import { Logo } from "../Icons/Logo"


export function Footer()
{
    return <>
        <div className="h-[15rem] w-full bg-black-800 pl-5 place-content-between lg:h-20 lg:pr-10 lg:flex">
            <div className="flex justify-center ml-[-4rem] lg:ml-[0rem]">
                <div className=" mt-[1rem] lg:mt-[0rem] mt-[-2rem]">
                    <Logo size="Secondry" mode="dark"/>
                </div>
                <div className="flex justify-center items-start text-white mt-[2.5rem] m-[-0.5rem] lg:items-center lg:mt-[0rem]">
                    <b className="lg:text-xl">LiveLink</b>
                </div>
            </div>
            <div className=" mt-[1rem] gap-8 lg:flex lg:justify-center lg:items-center lg:mt-[0rem]">
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
            <div className=" mt-[2rem] text-slate-500 lg:text-[0.9rem] text-[0.7rem] lg:mt-[0rem] font-bold flex justify-center items-center mt-[1rem] lg:mt-[0rem]">
                © 2023 NexusChat Inc. All rights reserved.
            </div>
        </div>
    </>
}