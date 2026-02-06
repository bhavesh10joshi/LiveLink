import { Button } from "../Buttons/Button"
import { FreeTick } from "../Icons/FreePricingTick" 
import { PaidTick } from "../Icons/PricingPaidTick"
import { useState } from "react"

interface Style{
    IsMonthly : Boolean ,
    type : "FREE" | "PRO" | "ENTERPRISE" ,
    Selection : String,
    onclick : ()=>void
}
const PriceMonthly = {
    "FREE" : "0" ,
    "PRO" : "19",
    "ENTERPRISE" : "99"
}
const PriceYearly = {
    "FREE" : "0" ,
    "PRO" : "228",
    "ENTERPRISE" : "1188"
}
const Subhead = {
    "FREE" : "Perfect for Side Projects and small experiments . " ,
    "PRO" : "Advanced features for growing professional teams .",
    "ENTERPRISE" : "Maximum security and control for large organizations ."
}
const Features={
    "FREE" : ["Up to 5 users" , "7 day Message History" , "Basic Integrations" , "Mobile App Access"], 
    "PRO" : ["Unlimited Users" , "Unlimited History" , "Custom emojis and Reactions" , "Priority 24/7 Support" , "Advanced Analaytics"], 
    "ENTERPRISE" : ["SAML , SSO & Security" , "Dedicated Account Manager" , "99.9% Uptime SLA" , "Custom Branding & Theme" , "Enterprise data export"],      
}

export function PricingDetails(props:Style)
{
    
    return <>
    {
        props.Selection == props.type
        ?<div className="border border-blue-800 border-[0.2rem] bg-slate-900 rounded h-[39rem] pt-[2rem] pl-[2rem] pr-[2rem] w-[23rem]">
            <div className="text-blue-800 font-bold text-[0.9rem]">
                {props.type}
            </div>
            {
                props.IsMonthly ?
                <div className="flex">
                    <div className="text-white text-[3.5rem] font-extrabold">{`$${PriceMonthly[props.type]}`}</div>
                    <div className="flex justify-center items-end mb-[1rem]">
                        <div className="text-slate-300 font-bold">/mo</div>
                    </div> 
                </div>
                :<div className="flex">
                    <div className="text-white text-[3.5rem] font-extrabold">{`$${PriceYearly[props.type]}`}</div>
                    <div  className="flex justify-center items-end mb-[1rem]"><div className="text-slate-300 font-bold">/yr</div></div>
                </div>
            }
            <div className="text-slate-500 mt-5">
                {`${Subhead[props.type]}`}
            </div>
            <div className="mt-5">
               {
                   props.Selection == props.type
                   ?<button type="submit" onClick={props.onclick} className="flex justify-center items-center bg-blue-800 text-white font-bold h-[3rem] rounded-xl w-full hover:bg-blue-800"><span> {`Select ${props.type}`}</span></button>
                   :<button type="submit" onClick={props.onclick} className="flex justify-center items-center bg-slate-800 text-white font-bold h-[3rem] rounded-xl w-full hover:bg-slate-700"><span> {`Select ${props.type}`}</span></button>
               }
            </div>
            <div className="bg-slate-700 h-[0.1rem] mt-5">
            </div>
            <div className="flex flex-col gap-3 mt-5">
                {Features[props.type]?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-300">
                        {/* A simple checkmark icon for the list items */}
                            <span className="text-blue-500"><FreeTick/></span>
                                <p className="text-[0.9rem]">{item}</p>
                    </div>
                ))}
            </div>
        </div>
        :<div className="border border-slate-500 bg-slate-900 rounded h-[35rem] pt-[2rem] pl-[2rem] pr-[2rem] w-[23rem]">
            <div className="text-slate-500 font-bold text-[0.9rem]">
                {props.type}
            </div>
            {
                props.IsMonthly ?
                <div className="flex">
                    <div className="text-white text-[3.5rem] font-extrabold">{`$${PriceMonthly[props.type]}`}</div>
                    <div className="flex justify-center items-end mb-[1rem]">
                        <div className="text-slate-300 font-bold">/mo</div>
                    </div> 
                </div>
                :<div className="flex">
                    <div className="text-white text-[3.5rem] font-extrabold">{`$${PriceYearly[props.type]}`}</div>
                    <div  className="flex justify-center items-end mb-[1rem]"><div className="text-slate-300 font-bold">/yr</div></div>
                </div>
            }
            <div className="text-slate-500 mt-5">
                {`${Subhead[props.type]}`}
            </div>
            <div className="mt-5">
               {
                   props.Selection == props.type
                   ?<button type="submit" onClick={props.onclick} className="flex justify-center items-center bg-blue-800"><span> {`Select ${props.type}`}</span></button>
                   :<button type="submit" onClick={props.onclick} className="flex justify-center items-center bg-slate-800 text-white font-bold h-[3rem] rounded-xl w-full hover:bg-blue-800"><span> {`Select ${props.type}`}</span></button>
               }
            </div>
            <div className="bg-slate-700 h-[0.1rem] mt-5">
            </div>
            <div className="flex flex-col gap-3 mt-5">
                {Features[props.type]?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-300">
                        {/* A simple checkmark icon for the list items */}
                            <span className="text-blue-500"><FreeTick/></span>
                                <p className="text-[0.9rem]">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    }
    </>
}