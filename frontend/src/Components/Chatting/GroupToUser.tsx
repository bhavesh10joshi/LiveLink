import { UserToGroupNavBar } from "./UserToGroupNavBar";
import GroupProfile from "../ui/Image/SampleImages/GroupProfileImage/GroupProfile.jpg"

export function GroupToUserMessagePortal()
{
    return<>
        <UserToGroupNavBar Name="College-2023-27" ProfilePhoto={GroupProfile} />
    </>   
}