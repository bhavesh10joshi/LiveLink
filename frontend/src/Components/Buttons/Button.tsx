import type { ReactElement } from "react";

interface ButtonStyles{
    size : "primary" | "secondry" | "tertiary" | "extrasized" ,
    text : string ,
    FrontIcon ?: ReactElement ,
    BackIcon ?:ReactElement,
    onClick ?: ()=>void,
    color : "Blue" | "Grey"
};
const Variants = {
    "primary" : "h-8 w-40" ,
    "secondry" : "h-8 w-20" ,
    "tertiary" : "h-12 w-52" ,
    "extrasized" : "h-12 w-[29rem]"
};
const BorderStylingVariants = {
    "primary" : "rounded-md" , 
    "secondry" : "rounded-md" , 
    "tertiary" : "rounded-xl",
    "extrasized" : "rounded-md"
};
const ColorVarients = { 
    "Blue" : "bg-blue-800 hover:shadow-blue-800/80" , 
    "Grey" : "bg-slate-700 hover:shadow-slate-700/80"
};
const DefaultStyles:String = "flex items-center justify-center gap-2 text-white text-bold  text-[0.9rem] font-[550]";
const hoverEffects:String = "shadow-lg hover:-translate-y-0.5";
export function Button(props : ButtonStyles)
{
 return<>
    <button onClick={props.onClick} type="button" className={`${ColorVarients[props.color]} ${BorderStylingVariants[props.size]} ${Variants[props.size]} ${DefaultStyles} ${hoverEffects}`}>{props.FrontIcon}<span>{props.text}</span>{props.BackIcon}</button>
 </>
}