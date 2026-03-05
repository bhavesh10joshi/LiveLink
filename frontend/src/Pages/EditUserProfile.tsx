import { CloseIcon } from "../Components/Icons/CloseIcon"
import { SaveChanges } from "../Components/Icons/SaveChanges"
import { useState } from "react"
import { EmailAuthChangePassword } from "./AuthenticationChangePassword"
import { useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { APIurl } from "../Config/ApiConfig"

interface EditStyle
{
    SetEditUserProfileSelector : ()=>void , 
    ProfileImage : string , 
    About:string ,
    Name : string 
}

export function EditUserProfile(props:EditStyle)
{
    const Navigate = useNavigate();
    const FileRef:any = useRef(null);

    function HandleButtonClick()
    {
        FileRef.current.click();
    }

    async function HandleImageChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        const file = event.target.files?.[0];

        if(!file)
        {
            return;
        }

        const formData = new FormData();
        formData.append("photo" , file);

        try{
            const token = localStorage.getItem("token");
            const config = {
                headers : 
                {
                    "authorization": token
                }
            };
            await axios.post(`${APIurl}/Users/Profile/Edit/Image` , formData , config);
            Navigate("/LiveLink/User/Dashboard/Chat");
            return;
        }
        catch(e)
        {
            alert("Failed to Upload new profile Image !");
            return;
        }
    }
    async function HitEditTextBackend()
    {
        // it is a safety net suppose if the user leaves the input box empty!
        const CurrentName = NameRef.current?.value||props.Name;
        const CurrentAbout = AboutRef.current.value||props.About;

        const token = localStorage.getItem("token");
        const config:any = {
            headers: {
                "authorization": token
            } 
        };
        const payload:any = {
            name : CurrentName , 
            about : CurrentAbout
        } 
        try{
            await axios.post(`${APIurl}/Users/Profile/Edit` , payload , config);
            Navigate("/LiveLink/User/Edit/Success");
        }
        catch(e)
        {
            console.log(e);
            alert("Error while Saving the Changes !");
        }
    }
    const NameRef:any = useRef(null);
    const AboutRef:any = useRef(null);

    const [ChangePassword , SetChangePassword] = useState(false);

    function SetChangePasswordFunction()
    {
        SetChangePassword(!ChangePassword);
    }
    return<>{
    !ChangePassword  
            ?<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className=" bg-black-500 w-[30rem] h-[45rem] rounded-xl border-slate-300 border flex flex-col">
                    <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                        <div className=" font-bold text-[1.3rem] text-white-800 flex justify-center items-center"><div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold"><div>!</div></div><div className="ml-[0.6rem] text-[1rem]">Edit Profile Info</div></div>
                        <button type="button" className="bg-black-800 pl-[1rem] pr-[1rem] text-white text-[0.8rem] border border-red-600 rounded-md flex justify-center items-center ml-[5rem] hover:bg-red-950" onClick={()=>SetChangePasswordFunction()}>Change Password</button>
                        <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetEditUserProfileSelector()}><div><CloseIcon/></div></button></div>
                    </div>
                    <div className="bg-slate-500 h-[0.1px] mt-[1rem] "></div>
                    <div className="flex justify-center items-center mt-[2rem] pl-[2rem] pr-[2rem]">
                        <input type="file" accept="image/png , image/jpeg , image/webp" className="bg-white invisible w-[0rem] h-[0rem]" aria-label="name" ref={FileRef} onChange={(event) => HandleImageChange(event)}/>
                        <button type="button" aria-label="Name" onClick={()=>HandleButtonClick()}><img src={props.ProfileImage} alt="" className="rounded-full w-[10rem]"/></button>
                    </div>
                    <div className="flex justify-center items-center pl-[2rem] pr-[2rem]">
                        <div className="text-slate-500 text-[0.8rem] mt-[0.5rem]">Click to Change the Profile Image!</div>
                    </div>
                    <div className="w-full pl-[2rem] pr-[2rem] pt-[0.5rem] mt-[0.5rem]">
                        <button type="button" className=" bg-blue-800 hover:shadow-blue-800/80 flex justify-center items-center h-[2.5rem] w-full rounded-md text-[0.9rem]" onClick={()=>SetChangePasswordFunction()}>
                            Change Avatar
                        </button>
                    </div>
                    <div className="h-[2px] w-full bg-slate-700 mt-[2rem]"></div>
                    <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[2rem]">
                        Name
                    </div>
                    <div className="w-full h-[2.5rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                        <input type="text" className="w-full h-full rounded-md bg-slate-700 text-black-900 placeholder:text-white text-[0.8rem] pl-[1rem] pr-[1rem]" placeholder="Enter the New Name...." aria-label="Name" ref={NameRef}/>
                    </div>
                    <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                        About / Description 
                    </div>
                    <div className="w-full h-[2.5rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                        <input type="text" className="w-full h-full rounded-md bg-slate-700 text-black-900 placeholder:text-white text-[0.8rem] pl-[1rem] pr-[1rem]" placeholder="Enter a new About/Description...." aria-label="Name" ref={AboutRef}/>
                    </div>
                    <div className="w-full h-[3rem] pl-[2rem] pr-[2rem]">
                        <div className="flex justify-center items-center bg-blue-950 h-[3rem] rounded-md mt-[1rem] pl-[1rem] pr-[1rem]">
                            <div className="w-[1.3rem] h-[1.3rem] bg-blue-800 text-black-800 rounded-xl flex justify-center items-center text-[1rem] font-extrabold mr-[0.5rem]"><div>!</div></div>
                            <div className="text-[0.7rem] text-slate-300 ">Changing your Name or Profile Photo will be visible to your Friends Instantly.</div>
                        </div>
                    </div>
                    <div className="w-full pl-[2rem] pr-[2rem] pt-[0.5rem] mt-[2rem]">
                        <button type="button" className=" bg-blue-800 hover:shadow-blue-800/80 flex justify-center items-center h-[2.5rem] w-full rounded-md text-[0.9rem]" onClick={()=>HitEditTextBackend()}>
                            Save Edits
                        </button>
                    </div>
                </div>
            </div>
        :<div>
            <EmailAuthChangePassword SetChangePasswordFunction={()=>SetChangePasswordFunction()}/>
        </div>
        }
    </>
}
