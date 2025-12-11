interface RoomStyle {
    RoomName : string ,
    Members : string , 
    Onclick : () => void
};
export function Rooms(props : RoomStyle)
{
    return <>
    <button className="w-full" onClick={props.Onclick}>
        <div className = "bg-grey-200 text-blue-800 rounded-xl flex justify-center items-center p-[0.5rem] w-full">
            <div className="font-bold text-[1.1rem] whitespace-nowrap">
                {props.RoomName}
            </div>
            <div className="w-full flex justify-end items-center">
                <div className="bg-blue-600 text-[#FFFFFF] rounded-xl w-[12rem] pr-[1rem] place-items-end font-bold">
                    <div>
                        {props.Members}
                    </div>  
                </div>
                <div className=" ml-[1rem] bg-red-800 w-[2rem] rounded-xl text-red-800">h</div>
            </div>
        </div>
    </button>
    </>
}