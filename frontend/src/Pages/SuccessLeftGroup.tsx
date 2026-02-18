import { SucessUnfriend } from "../Components/Icons/SuccessUnfriend"

interface Style{
    Name : string ,
    SetLeaveGroupFunction : ()=>void 
}

export function SuccessLeaveGroup(props:Style)
{
    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[23rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="w-full flex justify-center items-center">
                    <div className="bg-green-950 w-[9rem] h-[6rem] flex justify-center items-center mt-[2rem] rounded-md">
                        <SucessUnfriend/>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[1.5rem] mt-[2rem] pl-[2rem] pr-[2rem] text-white font-bold">{`You Left ${props.Name}!`}</div></div>
                <div className="flex w-full justify-center items-center"><div className="text-center text-[0.8rem] mt-[0.5rem] pl-[2rem] pr-[2rem] text-green-500">{`You are no longer the part of ${props.Name} Group!`}</div></div>
                <div className="w-full h-[1px] bg-slate-500 mt-[2rem]"></div>
                <div className="flex justify-center items-center w-full mt-[1.5rem]">
                    <button type="button" aria-label="Name" className=" h-[3rem] flex justify-center items-center text-white font-bold border border-black-800 rounded-md pl-[5rem] pr-[5rem] bg-green-900 text-[0.8rem]" onClick={()=>props.SetLeaveGroupFunction()}><div>Continue to Group Profile</div></button>
                </div>
            </div>
        </div>
    </>
}