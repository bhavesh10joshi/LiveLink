import { useState , useEffect , useRef} from "react"
import { CloseIcon } from "../Components/Icons/CloseIcon"
import { APIurl } from "../Config/ApiConfig"
import axios from "axios"
import { FriendsSideBar } from "../Components/FriendsSideBar/FriendsSideBar"
import { useGlobalUI } from "../Config/GlobalUIContext"
import { SkeletonProfile } from "../Components/Loader/Skeleton"

interface Style{
    SetSearchUserfunction : () => void
};

export function SearchUserPage(props:Style)
{
    const { showLoading, hideLoading, showError, showSuccess } = useGlobalUI();
    const SearchRef:any = useRef(null);
    const[SelectedId , SetSelectedId]:any = useState(null);
    const[SearchInput , SetSearchInput]:any = useState(null);
    const[Data , SetData]:any = useState([]);
    const[isSearching, setIsSearching] = useState(false);
    const[showDetail, setShowDetail] = useState(false);

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
        showLoading("Sending invite...");
        try{
            await axios.post(`${APIurl}/Users/Personal/Start-messaging/Send-Invite` , Payload , Config);
            hideLoading();
            showSuccess("Request Sent!");
            return;
        }
        catch(e)
        {
            console.log(e);
            hideLoading();
            showError("Error occurred while sending request!");
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
                setIsSearching(true);
                try{
                    const data = await axios.get(`${APIurl}/Users/Search` , Config);
                    console.log(data);
                    SetData(data.data.msg);
                    setIsSearching(false);
                    return;
                }
                catch(e)
                {
                    console.log(e);
                    setIsSearching(false);
                    showError("Error occurred while searching for users!");
                    return ;
                }
            }
            HitBackend();
        } , .900);
        return () => clearTimeout(Timeout);
    } , [SearchInput]);

    function handleSelectUser(uniqueId: string) {
        SetSelectedId(uniqueId);
        setShowDetail(true);
    }

    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-2 lg:p-4 z-50">
            <div className="bg-black-500 w-[98%] max-w-[60rem] h-[90vh] max-h-[42rem] rounded-xl border-slate-300 border flex flex-col overflow-hidden">
                <div className="flex place-content-between pt-3 px-3 lg:pt-[1rem] lg:pl-[2rem] lg:pr-[2rem] shrink-0">
                    <div className="font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[0.9rem] lg:text-[1rem]">Search users</div></div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetSearchUserfunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="flex-1 flex flex-col lg:flex-row gap-2 p-2 lg:p-[1rem] overflow-hidden min-h-0">
                    <div className={`w-full lg:w-2/4 border border-slate-600 rounded-md bg-black-800 px-3 lg:pl-[2rem] lg:pr-[2rem] overflow-y-auto flex-1 lg:flex-none lg:h-full ${showDetail ? 'hidden lg:block' : 'block'}`}>
                        <div className="flex justify-center items-center px-0 lg:pl-[2rem] lg:pr-[2rem] mt-3 lg:mt-[1rem]"><input className="h-[2.5rem] lg:h-[3rem] w-full pl-[1rem] pr-[1rem] bg-slate-800 rounded-xl border border-slate-500 text-[0.8rem]" type="text" placeholder="Find Members ...." ref={SearchRef} onChange={() => SetSearchInput(SearchRef.current.value)}/></div>
                        {
                            isSearching
                                ? <div className="flex flex-col gap-2 mt-[1rem]"><SkeletonProfile /><SkeletonProfile /><SkeletonProfile /></div>
                                : Data.length != 0
                                ?<div className="flex flex-col gap-2 overflow-y-auto overflow-hidden mt-[1rem] pb-2">
                                    {Data.map((user:any)=>(<FriendsSideBar ProfileImage={user.ProfilePhoto} Name={user.name}  UniqueId={user.UniqueId} SetSelectedId={()=>handleSelectUser(user.UniqueId)} selectedId={SelectedId}/>))}
                                </div>
                                :<div className="flex justify-center items-center text-[1rem] text-slate-700 mt-[1.2rem]">
                                    No Users Found
                                </div>
                        }
                    </div>
                    <div className={`w-full lg:w-2/4 border border-slate-600 rounded-md bg-black-800 overflow-y-auto flex-1 lg:flex-none lg:h-full ${showDetail ? 'block' : 'hidden lg:block'}`}>
                        {
                            SelectedId == null
                            ?<div className="flex flex-col justify-center items-center w-full h-full text-slate-700 text-[2.5rem] lg:text-[5rem] font-bold">
                                <div className="flex justify-center items-center">LiveLink</div>
                                <div className="flex justify-center items-center text-[0.8rem] lg:text-[1rem] font-mono mt-[-0.5rem] lg:mt-[-1rem]">No User Selected</div>
                            </div> 
                            :<div className="w-full h-full">
                                <button type="button" className="lg:hidden text-slate-400 text-[0.8rem] px-3 pt-2 hover:text-white" onClick={() => setShowDetail(false)}>← Back to results</button>
                                {
                                    Data.map((user:any) => (
                                        user.UniqueId == SelectedId
                                        ?<div className="w-full h-full p-2 lg:p-[1rem] flex flex-col items-center">
                                            <div className="w-full flex justify-center items-center flex-col bg-blue-900 py-4 lg:pt-[2rem] lg:pb-[2rem] px-3 lg:pl-[1rem] lg:pr-[1rem] rounded-md">
                                                <img src={user.ProfilePhoto} alt="SelectedUserImage" className="w-[5rem] h-[5rem] lg:w-[8rem] lg:h-[8rem] rounded-full object-cover"/>
                                                <div className="mt-2 lg:mt-[1rem] font-bold text-[1.1rem] lg:text-[1.7rem] font-mono text-center break-words max-w-full">
                                                    {user.name}
                                                </div>
                                                <div className="text-[0.75rem] lg:text-[0.9rem] text-slate-400 font-bold text-center break-words max-w-full">
                                                    {user.about}
                                                </div>
                                                <div className="flex justify-center items-center mt-3 lg:mt-[2rem] gap-2 flex-wrap">
                                                    <div className="bg-green-700 font-bold py-1 px-3 lg:pt-[0.5rem] lg:pb-[0.5rem] lg:pl-[2rem] lg:pr-[2rem] rounded-md text-[0.75rem] lg:text-[0.8rem]">
                                                        {`Friends : ${user.PersonalMessagingList.length}`}
                                                    </div>
                                                    <div className="bg-green-700 font-bold py-1 px-3 lg:pt-[0.5rem] lg:pb-[0.5rem] lg:pl-[2rem] lg:pr-[2rem] rounded-md text-[0.75rem] lg:text-[0.8rem]">
                                                        {`Groups : ${user.GroupList?.length || 0}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center mt-3 w-full px-2">
                                                <button type="button" aria-label="name" className="flex justify-center items-center bg-blue-700 hover:bg-blue-600 text-white w-full py-2 rounded-md font-bold text-[0.85rem]" onClick={() => SendInvite()}>
                                                    Send Invite
                                                </button>
                                            </div>
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