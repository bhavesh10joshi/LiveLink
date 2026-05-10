import { AddtoGroupUser } from "../Icons/AddtoGroupUserIcon"
import { More } from "../Icons/MoreIcon"


interface UserStyle{
    Name : string ,
    IsOnlineOrNot : Boolean ,
    ProfilePhoto : string    ,
    SetGroupSelector : ()=>void ,
    SetAddUserToGroupfunction : ()=>void
}

export function UserToUserNavBar(props:UserStyle)
{
    return<>
        <div className="flex bg-black-500 py-2 px-3 lg:pt-[1rem] lg:pl-[2rem] lg:pb-[1rem] lg:pr-[2rem] mt-[0.5rem] lg:mt-[1rem] rounded-md h-auto lg:h-[4rem] border border-slate-500 place-content-between mx-2 lg:ml-[1rem] lg:mr-[1rem] gap-2" >
            <div className="flex items-center min-w-0 flex-1">
                <div className="shrink-0 mr-2 lg:mr-[1rem]">
                    <img src={props.ProfilePhoto} alt="UsersProfilePhoto" className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] rounded-xl object-cover"/>
                </div>
                <div className="min-w-0">
                    <div className="text-white font-bold text-[0.85rem] lg:text-base truncate">
                        {props.Name}
                    </div>
                    <div className="text-green-500 text-[0.65rem] lg:text-[0.8rem]">
                        {   
                            props.IsOnlineOrNot ?<div>ONLINE</div> :<div>OFFLINE</div> 
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <button type="button" className="flex items-center bg-green-800 rounded-lg px-2 py-1 lg:rounded-xl lg:pl-[1rem] lg:pr-[1rem] lg:pt-[0.2rem] lg:pb-[0.2rem] hover:bg-green-600" aria-label="Name" onClick={() => props.SetAddUserToGroupfunction()}><span className="hidden lg:inline"><AddtoGroupUser/></span><span className="text-white font-bold text-[0.7rem] lg:text-[0.9rem] lg:ml-[0.5rem]">Add</span></button>
                <button type="button" className="flex items-center p-1" aria-label="Name" onClick={()=>props.SetGroupSelector()}><More/></button>
            </div>
        </div>
    </>
}