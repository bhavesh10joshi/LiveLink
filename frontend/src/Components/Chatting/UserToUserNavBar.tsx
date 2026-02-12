import { Button } from "../Buttons/Button"
import { AddtoGroupUser } from "../Icons/AddtoGroupUserIcon"
import { More } from "../Icons/MoreIcon"

interface UserStyle{
    Name : string ,
    IsOnlineOrNot : Boolean ,
    ProfilePhoto : string     
}

export function UserToUserNavBar(props:UserStyle)
{
    return<>
        <div className="flex bg-black-500 ml-[1rem] rounded-xl pt-[1rem] pl-[2rem] pb-[1rem] pr-[2rem] w-[52rem]" >
            <div>
                <img src={props.ProfilePhoto} alt="UsersProfilePhoto" className="w-[3rem] rounded-xl"/>
            </div>
            <div className="ml-[1rem] flex justify-center items-center">
                <div >
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
                <div className="flex justify-end items-center">
                    <div className="ml-[25rem]">
                        <Button size="AddUserSize" text="Add to Group" FrontIcon={<AddtoGroupUser/>} color="NoColor" />
                    </div>
                </div>
            <div>
                <More/>
            </div>
        </div>
    </>
}