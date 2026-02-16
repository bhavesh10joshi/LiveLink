import { AddtoGroupUser } from "../Icons/AddtoGroupUserIcon"
import { More } from "../Icons/MoreIcon"

interface UserStyle{
    Name : string ,
    IsOnlineOrNot : Boolean ,
    ProfilePhoto : string    ,
    SetGroupSelector : ()=>void 
}

export function UserToUserNavBar(props:UserStyle)
{
    return<>
        <div className="flex bg-black-500 pt-[1rem] pl-[2rem] pb-[1rem] pr-[2rem] w-full h-[4rem] border border-slate-500 place-content-between" >
            <div className=" flex justify-center items-center">
                <div className="flex justify-center items-center mr-[1rem]">
                    <img src={props.ProfilePhoto} alt="UsersProfilePhoto" className="w-[2.5rem] rounded-xl"/>
                </div>
                <div>
                    <div className="text-white font-bold">
                        {props.Name}
                    </div>
                    <div className="text-green-500 text-[0.8rem]">
                        {   
                            props.IsOnlineOrNot ?<div>ONLINE</div> :<div>OFFLINE</div> 
                        }
                    </div>
                </div>
            </div>
                <div className="flex justify-center items-end ">
                   <div className="flex justify-center items-center">
                        <button className="flex justify-center items-center" aria-label="Name"><AddtoGroupUser/><span className="text-[#808080] font-bold text-[0.9rem] ml-[0.5rem]">Add To Group</span></button>
                   </div>
                   <div>
                        <button type="button" className="flex justify-center items-center" aria-label="Name" onClick={()=>props.SetGroupSelector()}><More/></button>
                   </div>
                </div>
        </div>
    </>
}