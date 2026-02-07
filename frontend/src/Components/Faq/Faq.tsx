interface style{
    Question : String ,
    Answer : String 
} 
export function Question(props:style)
{
    return <>
    <div className="w-full flex justify-center items-center">
        <div className="border border-slate-500 bg-slate-900 lg:w-[40rem] rounded mt-[1rem] w-[15rem]">
            <div className="pt-[2rem] text-white font-bold pl-[2rem] pr-[2rem] pb-[1rem] text-[0.8rem] lg:text-[1rem]">{props.Question}</div>
            <div className=" text-slate-300  pl-[2rem] pr-[2rem] pb-[2rem] text-[0.8rem] lg:text-[1rem]">{props.Answer}</div>
        </div>
    </div>
    </>
}