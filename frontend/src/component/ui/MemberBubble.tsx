interface MemberBubble  {
  Username : string 
};
const Defaultstyles:string = "flex place-self-start p-[1rem] bg-blue-200 w-full rounded-xl font-bold mb-[0.2rem]";
export function MemberBubble(props:MemberBubble)
{
    return <>
        <div className={`${Defaultstyles}`}>
            {props.Username}
        </div>
    </>
}