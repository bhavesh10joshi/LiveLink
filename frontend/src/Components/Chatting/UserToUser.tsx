import { RecievedMessage } from "../Messages/Message";
import { UserToUserNavBar } from "./UserToUserNavBar";
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"


export function UserToUserMessagePortal()
{
    return<>
        <div>
            <UserToUserNavBar Name="Bhavesh Joshi" ProfilePhoto={Profile} IsOnlineOrNot={true}/>
        </div>
    </>   
}