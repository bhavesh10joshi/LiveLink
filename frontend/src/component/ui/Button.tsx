import type { ReactElement } from "react";

interface ButtonStyles 
{
    sizes : "sm" | "md" | "lg" , 
    onclick ?: ()=>void , 
    text : string , 
    fronticon ?: ReactElement ,
    endicon ?: ReactElement , 
    bgcolor ?: string ,
    textcolor ?: string
}  
const Buttonsizes = {
   "sm" : "w-[12rem] h-[2rem] text-[1rem] font-bold" ,
   "md" : "w-[12rem] h-[2rem] text-[1.1rem] " ,
    "lg" : "w-[13.9rem] h-[3rem] text-[1.1rem] "
};
const defaultstyles : string = "rounded-xl mt-[1rem] font-bold"; 
const hoverEffects : string = "hover:cursor:pointer hover:bg-blue-400"
export function Button(props : ButtonStyles)
{
    return<>
    <button type="button" onClick={props.onclick} className={`${Buttonsizes[props.sizes]} ${defaultstyles} ${props.bgcolor} ${props.textcolor} ${hoverEffects}`}>{props.fronticon} {props.text} {props.endicon}</button>
    </>
}
