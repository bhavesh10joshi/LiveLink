import { useState , useEffect , useRef} from "react"
import { CloseIcon } from "../Components/Icons/CloseIcon"
import { APIurl } from "../Config/ApiConfig"
import axios from "axios"
import { FriendsSideBar } from "../Components/FriendsSideBar/FriendsSideBar"

interface Style{
    SetSearchUserfunction : () => void
};

export function SearchUserPage(props:Style)
{
    const SearchRef:any = useRef(null);
    const[SelectedId , SetSelectedId]:any = useState(null);
    const[SearchInput , SetSearchInput]:any = useState(null);
    const[Data , SetData]:any = useState([]);

    async function SendInvite()
    {
        const token = localStorage.getItem("token");
        const Config = {
            headers : {
                "authorization" : token
            }
        };
        const Payload = {
            UserUniqueId : SelectedId
        }
        try{
            await axios.post(`${APIurl}/Users/Personal/Start-messaging/Send-Invite` , Payload , Config);
            alert("Request Sent");
            return;
        }
        catch(e)
        {
            console.log(e);
            alert("Error Occurred while sending request !");
            return;
        }
    }
    useEffect(function()
    {
        const Timeout = setTimeout(function(){
            const HitBackend = async ()=>{
                const token = localStorage.getItem("token");
                const Config = {
                    headers : {
                        "authorization" : token
                    },
                    params : {
                        name : SearchInput 
                    }
                };
                console.log("User is ",SearchInput);
                try{
                    const data = await axios.get(`${APIurl}/Users/Search` , Config);
                    console.log(data);
                    SetData(data.data.msg);
                    return;
                }
                catch(e)
                {
                    console.log(e);
                    alert("Error Occurred while searching for users !");
                    return ;
                }
            }
            HitBackend();
        } , .900);
        return () => clearTimeout(Timeout);
    } , [SearchInput]);

    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[60rem] h-[42rem] rounded-xl border-slate-300 border flex flex-col ">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Search users</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetSearchUserfunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className=" w-full h-full flex justify-center items-center pl-[1rem] pr-[1rem] pb-[1rem] pt-[1rem] gap-2">
                    <div className="w-2/4 h-full border border-slate-600 rounded-md bg-black-800 pl-[2rem] pr-[2rem]">
                        <div className="flex justify-center items-center pl-[2rem] pr-[2rem] mt-[1rem]"><input className="h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Members ...." ref={SearchRef} onChange={() => SetSearchInput(SearchRef.current.value)}/></div>
                        {
                            Data.length != 0
                                ?<div className="flex flex-col gap-2 overflow-y-auto overflow-hidden mt-[1rem]">
                                    {Data.map((user:any)=>(<FriendsSideBar ProfileImage={user.ProfilePhoto} Name={user.name}  UniqueId={user.UniqueId} SetSelectedId={()=>SetSelectedId(user.UniqueId)} selectedId={SelectedId}/>))}
                                </div>
                                :<div className="flex justify-center items-center text-[1rem] text-slate-700 mt-[1.2rem]">
                                    No Users Found
                                </div>
                        }
                    </div>
                    <div className="w-2/4 h-full border border-slate-600 rounded-md bg-black-800">
                        {
                            SelectedId == null
                            ?<div className="flex flex-col justify-center items-center w-full h-full text-slate-700 text-[5rem] font-bold">
                                <div className="flex justify-center items-center">LiveLink</div>
                                <div className="flex justify-center items-center text-[1rem] font-mono mt-[-1rem]">No User Selected</div>
                            </div> 
                            :<div className="w-full h-full">
                                {
                                    Data.map((user:any) => (
                                        user.UniqueId == SelectedId
                                        ?<div className="w-full h-full p-[1rem] flex flex-col justify-center items-center">
                                            <div className="w-full h-full flex justify-center items-center flex-col bg-blue-900 pt-[2rem] pl-[1rem] pr-[1rem] pb-[2rem] rounded-md">
                                                <img src={user.ProfilePhoto} alt="SelectedUserImage" className="w-[8rem] h-[8rem] rounded-full"/>
                                                <div className="mt-[1rem] font-bold text-[1.7rem] font-mono">
                                                    {user.name}
                                                </div>
                                                <div className="text-[0.9rem] text-slate-400 font-bold">
                                                    {user.about}
                                                </div>
                                                <div className="flex justify-center items-center mt-[2rem] gap-2">
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex justify-center items-center bg-green-700 font-bold pt-[0.5rem] pb-[0.5rem] pl-[2rem] pr-[2rem] rounded-md">
                                                            {`Friends : ${user.PersonalMessagingList.length}`}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center items-center">
                                                        <div className="flex justify-center items-center bg-green-700 font-bold pt-[0.5rem] pb-[0.5rem] pl-[2rem] pr-[2rem] rounded-md">
                                                            {`Groups : ${user.PersonalMessagingList.length}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {Data.PersonalMessagingList?.length == 0
                                                ?Data.PersonalMessagingList?.map((Friends:any)=>
                                                    Friends.uniqueid != SelectedId
                                                    ?<div className="flex justify-center items-center mt-[1rem] w-full">
                                                        <button type="button" aria-label="name" className="flex justify-center items-center bg-red-800 text-white w-full pt-[0.5rem] pb-[0.5rem] rounded-md" onClick={() => SendInvite()}>
                                                            Send Invite
                                                        </button>
                                                    </div>
                                                    :<div className="flex justify-center items-center mt-[1rem] w-full">
                                                        <div className="flex justify-center items-center bg-red-800 text-white w-full pt-[0.5rem] pb-[0.5rem] rounded-md" >
                                                            Already a Friend
                                                        </div>
                                                    </div>
                                                )
                                                :<div className="flex justify-center items-center mt-[1rem] w-full">
                                                        <button type="button" aria-label="name" className="flex justify-center items-center bg-red-800 text-white w-full pt-[0.5rem] pb-[0.5rem] rounded-md" onClick={() => SendInvite()}>
                                                            Send Invite
                                                        </button>
                                                </div>
                                            }
                                        </div>
                                        :null
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}