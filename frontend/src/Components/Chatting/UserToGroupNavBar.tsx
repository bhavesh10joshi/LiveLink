import { AddtoGroupUser } from "../Icons/AddtoGroupUserIcon"
import { More } from "../Icons/MoreIcon"

interface UserStyle{
    Name : string ,
    ProfilePhoto : string     
}

export function UserToGroupNavBar(props:UserStyle)
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
                </div>
            </div>
                <div className="flex justify-center items-end ">
                   <div>
                        <button type="button" className="flex justify-center items-center" aria-label="Name"><More/></button>
                   </div>
                </div>
        </div>
    </>
}