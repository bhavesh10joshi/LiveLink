import { Warning } from "../Components/Icons/Warning"

interface DeleteGroupStyle
{
    Name : string , 
    SetDeleteGroupFunction : ()=>void
}
export function ConfirmDeleteGroup(props:DeleteGroupStyle)
{
    return<>
        <div className="fixed inset-0 bg-black-500 bg-opacity-30 backdrop-blur-md flex justify-center items-center">
                    <div className=" bg-black-500 w-[30rem] h-[30rem] rounded-xl flex flex-col">
                        <div className="flex justify-center items-center pt-[2rem] pl-[2rem] pr-[2rem]">
                            <div className="h-[7rem] w-[7rem] bg-red-950 rounded-md flex justify-center items-center"><Warning/></div>
                        </div>
                        <div className="flex justify-center items-center mt-[1rem] pl-[2rem] pr-[2rem]"><div className="text-[1.3rem] font-bold text-slate-300">Delete Group?</div></div>
                        <div className="flex justify-center items-center text-center text-[0.8rem] text-slate-500 mt-[1rem]">{`Are You sure you want to delete the ${props.Name}?`}</div>
                        <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] pt-[0.5rem]">
                            <div className=" text-red-800 flex justify-center items-center text-[1rem] font-extrabold"><div className="text-black-800 w-[1rem] h-[1rem] bg-red-600 rounded-xl flex justify-center items-center mr-[0.5rem]">!</div><div className="text-[0.7rem]">THIS ACTION CANNOT BE UNDONE</div></div>
                        </div>
                        <div className="h-[3rem] w-full pt-[5rem] pr-[2rem] pl-[2rem] text-white font-bold flex justify-center items-center rounded-xl">
                            <button className="bg-red-600 h-[3rem] w-full rounded-md" type="button">Delete Group</button>
                        </div>
                        <div className="h-[3rem] w-full pt-[5rem] pr-[2rem] pl-[2rem] text-white flex justify-center items-center rounded-xl">
                            <button className="bg-slate-800 h-[3rem] w-[10rem] rounded-md border border-slate-500" type="button" onClick={()=>props.SetDeleteGroupFunction()}>Cancel</button>
                        </div>
                    </div>
                </div>
    </>
}