import type { ReactElement } from "react"

interface style{
    Inputtype : "text" | "password" , 
    placeholder : string , 
    EndIcon ?: ReactElement
}
const defaultstyle:string = "bg-slate-900 border border-slate-500 rounded placeholder:text-slate-600 w-full h-[2.7rem] pl-[1rem] pr-[3rem] text-white ";
export function Input(props:style)
{
    return<>
        <div className="flex">
            <input type={props.Inputtype} placeholder={props.placeholder} className={defaultstyle}/>
            <div className="ml-[-3rem] flex justify-center items-center">
                {props.EndIcon}
            </div>
        </div>
    </>
}