import type { ReactElement } from "react"
import { StatusDot } from "../Icons/UserStatusDot"

interface style{
    ProfileImage : string ,
    Name : string ,
    IsStatus : Boolean , //Tells Us whether the user is online or not
    WasLastMessage : Boolean ,
    LastMessage ?: string , 
    TypingStatus : Boolean ,
    OnlineOrOfflineDots ?: ReactElement , 
    IsSelected : Boolean , 
    UniqueId : string
}     

export function FriendsUsers(props:style)
{
    return<>
        <div>
            {
                props.IsSelected ? <div></div> :<div></div>
            }
            <div>
                <div><img src={props.ProfileImage} alt="" /></div>
                <div>
                    {
                        props.IsStatus ?<StatusDot Status="Online"/>:<StatusDot Status="Offline"/>
                    }
                </div>
            </div>
            <div>
                <div>{props.Name}</div>
                <div>
                    {props.TypingStatus ?<div></div> :<div></div>} 
                </div>
            </div>
        </div>
    </>
}