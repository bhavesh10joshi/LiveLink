import { CloseIcon } from "../Components/Icons/CloseIcon"
import { SaveChanges } from "../Components/Icons/SaveChanges"
import { useState } from "react"
import { ConfirmDeleteGroup } from "./DeleteGroupConfirm"

interface EditStyle
{
    SetEditGroupSelector : ()=>void , 
    ProfileImage : string , 
    About:string ,
    Name : string 
}
export function EditGroupInfo(props:EditStyle)
{
    const[DeleteGroup , SetDeleteGroup] = useState(false);

    function SetDeleteGroupFunction()
    {
        SetDeleteGroup(!DeleteGroup);
    }

    return<>{
    !DeleteGroup
    ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[45rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Edit Group Info</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetEditGroupSelector()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem] "></div>
                <div className="flex justify-center items-center mt-[2rem] pl-[2rem] pr-[2rem]">
                    <button type="button" aria-label="Name"><img src={props.ProfileImage} alt="" className="rounded-full w-[10rem]"/></button>
                </div>
                <div className="flex justify-center items-center pl-[2rem] pr-[2rem] pl-[2rem] pr-[2rem]">
                    <div className="text-slate-500 font-bold text-[0.8rem] mt-[1rem]">Click to Change the Group Avatar!</div>
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[2rem]">
                    Group Name
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder={props.Name} aria-label="Name"/>
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                    About Section
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder={props.About} aria-label="Name"/>
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <div className="flex justify-center items-center bg-blue-950 h-[3rem] rounded-md mt-[1rem] pl-[1rem] pr-[1rem]">
                        <div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold mr-[0.5rem]"><div>!</div></div>
                        <div className="text-[0.7rem] text-slate-300 font-bold">Changing the Group Name or Avatar will be visible to all members of this Group Instantly.</div>
                    </div>
                </div>
                <div className="h-[2px] w-full bg-slate-700 mt-[2rem]"></div>
                <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]">
                    <button type="button" aria-label="Name" className="flex justify-center items-center w-4/6 bg-blue-950 border-blue-800 border rounded-md h-[3rem]">
                        <div><SaveChanges/></div>
                        <div className="ml-[0.2rem] text-[1rem] text-slate-300">Save Changes</div>
                    </button>
                    <button type="button" aria-label="Name" className="flex justify-center items-center w-2/6 bg-slate-900 border-slate-300 border rounded-md h-[3rem] ml-[0.7rem]" onClick={()=>props.SetEditGroupSelector()}>Cancel</button>
                </div>
                <div className="flex justify-center items-center"><button type="button" aria-label="Name" className="flex justify-center items-center w-2/6 bg-red-300 border-slate-300 border rounded-md h-[3rem] ml-[0.7rem] text-red-900 font-bold" onClick={()=>SetDeleteGroupFunction()}>Delete Group</button></div>
            </div>
        </div>
        :<div><ConfirmDeleteGroup Name={props.Name}  SetDeleteGroupFunction={()=>SetDeleteGroupFunction()}/></div>
        }
    </>
}