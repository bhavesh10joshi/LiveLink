interface StylesBubble {
    Message : string , 
    UserName : string , 
    type : "Recieved" | "Sent" ,
};
const typeofmessage = {
    "Recieved" : "w-[12rem] bg-blue-500 rounded-xl p-[0.5rem] text-[#FFFFFF] mb-[1rem]" ,
    "Sent" : "w-[12rem] bg-green-400 rounded-xl p-[0.5rem] text-[#FFFFFF] mb-[1rem] "
}
const UserDetailsStyle:string = "font-bold text-[0.8rem]";
export function MessageBubble(props : StylesBubble)
{
    return <>
    <div className={props.type === "Sent" ? "place-items-end" : ""}>
        <div className={`${UserDetailsStyle}`}>
            {props.UserName}
        </div>
        <div className={`${typeofmessage[props.type]}`}>
            <div className="flex items-center justify-center">
                {props.Message}
            </div>
        </div>
    </div>
    </>
}
