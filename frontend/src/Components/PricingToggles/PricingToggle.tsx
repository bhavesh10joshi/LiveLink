interface Style
{
    IsYearly : Boolean , 
    OnClick : ()=>void
}
export function Toggle(props : Style)
{
    return<>
    {
        props.IsYearly ?<div className="flex gap-3 ">
            <div>
                <button type="button" onClick={props.OnClick} className="text-slate-400 font-bold text-[1rem]">Monthly</button>
            </div>
            <div>
                <div className="bg-slate-700 w-[4rem] h-[1.6rem] rounded-xl flex justify-end p-1">
                    <div className="bg-blue-800 w-[1rem] h-[1rem] rounded-xl"></div>
                </div>
            </div>
            <div><button type="button" onClick={props.OnClick} className="text-white text-[0.9rem] font-bold hover:text-slate-400">Yearly</button></div>
            <div className="flex justify-center items-center">
                <div className="bg-[#052e16] w-[4rem] h-[1.2rem] rounded-xl pt-[0.2rem] flex justify-center items-center border border-[#4ade80]">
                    <div className="text-[#4ade80] font-bold text-[10px]">Save 20%</div>
                </div>
            </div>
        </div> :<div className="flex gap-3 ml-[1.7rem] lg:ml-[0rem]">
            <div>
                <button type="button" onClick={props.OnClick} className="text-white text-[0.9rem] font-bold hover:text-slate-400">Monthly</button>
            </div>
            <div>
                <div className="bg-slate-700 w-[4rem] h-[1.6rem] rounded-xl flex justify-start p-1">
                    <div className="bg-blue-800 w-[1rem] h-[1rem] rounded-xl"></div>
                </div>
            </div>
            <div><button type="button" onClick={props.OnClick} className="text-slate-400 font-bold text-[1rem]">Yearly</button></div>
            <div className="flex justify-center items-center">
                <div className="bg-[#052e16] w-[4rem] h-[1.2rem] rounded-xl pt-[0.2rem] flex justify-center items-center border border-[#4ade80]">
                    <div className="text-[#4ade80] font-bold text-[10px]">Save 20%</div>
                </div>
            </div>
        </div> 
    }
    </>
}
// "text-white text-[0.9rem]"