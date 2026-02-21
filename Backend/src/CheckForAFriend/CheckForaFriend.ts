export function CheckFortheFriend(RecieverId:String , PersonalMessagingList : any)
{
    for(let i = 0 ; i<PersonalMessagingList.length ; i++)
    {
        if(PersonalMessagingList[i]._id == RecieverId)
        {
            return true;
        }
    }
    return false;
}