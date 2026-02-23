export function CheckForaGroupMember(UsersList:any , UserId:String , creatorId:String)
{
    for(let i = 0 ; i<UsersList.length ; i++)
    {
        if(UsersList[i] == UserId)
        {
            if(UserId == creatorId)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    return false;
}