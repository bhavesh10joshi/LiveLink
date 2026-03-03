import { More } from "../Icons/MoreIcon"

interface UserStyle{
    name : string ,
    Groupprofilephoto : string   ,
    SetGroupSelector : ()=>void  ,
    GroupUniqueId : String
}

export function UserToGroupNavBar(props:UserStyle)
{
    return<>
        <div className="flex bg-black-500 pt-[1rem] pl-[2rem] pb-[1rem] pr-[2rem] h-[4rem] mt-[1rem] rounded-md border border-slate-500 place-content-between ml-[1rem] mr-[1rem]" >
            <div className=" flex justify-center items-center">
                <div className="flex justify-center items-center mr-[1rem]">
                    <img src={props.Groupprofilephoto} alt="UsersProfilePhoto" className="w-[2.5rem] rounded-xl"/>
                </div>
                <div>
                    <div className="text-white font-bold">
                        {props.name}
                    </div>
                </div>
            </div>
                <div className="flex justify-center items-end ">
                   <div>
                        <button type="button" className="flex justify-center items-center" aria-label="Name" onClick={()=>props.SetGroupSelector()}><More/></button>
                   </div>
                </div>
        </div>
    </>
}