import { CloseIcon } from "../Components/Icons/CloseIcon"
import { Camera } from "../Components/Icons/Camera"
import Profile from "../Components/ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { EditPencil } from "../Components/Icons/EditPencil"
import { useState } from "react"
import { DeleteUserAccount } from "./DeleteUserAccount"
import { EditUserProfile } from "./EditUserProfile"
import { useRef } from "react"
import { Button } from "../Components/Buttons/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { APIurl } from "../Config/ApiConfig"

interface FriendsUsers {
    ProfileImage: string,
    Name: string,
    UniqueId : string,
}
interface CreateNewGroupStyle
{
    SetCreateNewGroupFunction : ()=>void ,  
}


export function CreateNewGroup(props:CreateNewGroupStyle)
{
    const Navigate = useNavigate();
    const NameRef:any = useRef(null);
    const AboutRef:any = useRef(null);
    const ImageRef:any = useRef(null);
    const [ProfileImage , SetProfileImage] : any= useState();

    function HandleImageFunction(event: React.ChangeEvent<HTMLInputElement>)
    {
        const file = event.target.files?.[0];
        
        if(!file)
        {
            return;
        }
        
        const formData:any = new FormData();
        formData.append("photo" , file);
        SetProfileImage(formData);
    }
    function HandleImageButtonfunction()
    {
        ImageRef.current.click();
    }
    async function HitBackend()
    {
        if(!ProfileImage.has("photo"))
        {
            alert("Please Upload a Group Profile Photo !");
            return;
        }
        else
        {
            const CurrentName = NameRef.current.value;
            const CurrentAbout = AboutRef.current.value;
            ProfileImage.append("name" , CurrentName);
            ProfileImage.append("bio" , CurrentAbout);
            try{
                const token = localStorage.getItem("token");
                const config = {
                    headers : 
                    {
                        "authorization" : token
                    }
                };
                await axios.post(`${APIurl}/Users/Groups/Create` , ProfileImage , config);
                Navigate("/LiveLink/User/Edit/Success");
            }
            catch(e)
            {
                console.log("Error aaya" + e)
                alert("Error Occured while Creating group !");
            }
        }
    }
    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" bg-black-500 w-[30rem] h-[37rem] rounded-xl border-slate-300 border flex flex-col">
                <div className="flex place-content-between pt-[1rem] pl-[2rem] pr-[2rem]">
                    <div className="flex justify-start items-center text-[1.1rem] text-blue-800 font-bold">Create New Group</div>
                    <div className="flex justify-center items-center w-[2rem] h-[2rem] bg-black-800 rounded-xl"><button type="button" aria-label="Name" onClick={()=>props.SetCreateNewGroupFunction()}><div><CloseIcon/></div></button></div>
                </div>
                <div className="bg-slate-500 h-[0.1px] mt-[1rem]"></div>
                <div className="flex justify-center items-center mt-[1rem] flex-col">
                    <input type="file" accept="image/png , image/jpeg , image/webp" className="bg-white invisible" aria-label="name" ref={ImageRef} onChange={(event) => HandleImageFunction(event)}/>
                    {<button type="button" aria-label="Name" className=" rounded-full flex justify-center items-center mt-[1rem] mb-[2rem]" onClick={() => HandleImageButtonfunction()}>
                        <div className="p-[1rem] bg-black-500 border-dotted border-slate-500 border rounded-full h-[8rem] w-[8rem] flex justify-center items-center border-[0.1rem]"><Camera/></div>
                        <div className="mt-[4rem] ml-[-1.5rem] bg-blue-800 w-[2rem] h-[2rem] flex justify-center items-center rounded-full"><EditPencil/></div>
                    </button>}
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                    Group Name
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="Enter the Group Name.." aria-label="Name" ref={NameRef}/>
                </div>
                <div className="flex justify-start items-center pl-[2rem] pr-[2rem] text-[0.8rem] text-slate-300 mt-[1rem]">
                    About Section
                </div>
                <div className="w-full h-[3rem] pl-[2rem] pr-[2rem] mt-[0.5rem]">
                    <input type="text" className="w-full h-full rounded-md bg-slate-500 text-black-900 placeholder:text-white text-[0.9rem] pl-[1rem] pr-[1rem]" placeholder="Enter the Description of the group..." aria-label="Name" ref={AboutRef}/>
                </div>
                <div className="flex justify-center items-center w-full pl-[2rem] pr-[2rem]">
                    <button aria-label="name" type="button" className="bg-blue-800 w-full h-[3rem] rounded-md mt-[2rem]" onClick={() => HitBackend()}> Create</button>
                </div>
            </div>
        </div>
    </>
}