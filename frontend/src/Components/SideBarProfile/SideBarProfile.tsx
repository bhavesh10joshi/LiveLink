import type { ReactElement } from "react"

interface style{
    Name : string ,
    Image : string
}  

export function SideBarProfile(props:style)
{
    return<>
    <div className="flex justify-start items-center">
        <img src={props.Image} alt="" className="w-[2.5rem] rounded-xl"/>
        <div className="ml-[1rem]">
            <div className="text-slate-300 font-bold text-[1rem]">{props.Name}</div>
            <div className="text-green-500 font-bold text-[0.8rem]">ONLINE</div>
        </div>
    </div>
    </>
}