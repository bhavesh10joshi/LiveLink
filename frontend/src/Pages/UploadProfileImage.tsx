import { UploadIcon } from "../Components/Icons/Upload"
import { Button } from "../Components/Buttons/Button"
import { CloseIcon } from "../Components/Icons/CloseIcon"
import { useRef } from "react";
import axios from "axios";
import { APIurl } from "../Config/ApiConfig";

interface style{
    SetProfileImageFunction : ()=>void , 
    SetEditUserProfileFunction : ()=>void
}
export function UploadProfileImage(props : style)
{
    const FileRef:any = useRef(null);

    function HandleButtonClick()
    {
        FileRef.current.click();
    }

    async function HandleFileChange(event: React.ChangeEvent<HTMLInputElement>)
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
            props.SetEditUserProfileFunction();
        }
        catch(e)
        {
            alert("Failed to Upload new profile Image !");
        }
    }
    return<>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-full">
            <div className=" bg-black-500 w-[30rem] h-[20rem] rounded-xl border-slate-300 border flex flex-col justify-center items-center"> 
                <div className="flex justify-end items-center w-full mr-[1rem] mb-[1rem]">
                    <button aria-label="name" type="button" onClick={() => props.SetProfileImageFunction()}><CloseIcon/></button>
                </div>
                <UploadIcon/>
                <div className="flex justify-center items-center font-bold text-[1.5rem]">                    
                    Upload Image
                </div>
                <div className="flex justify-center items-start text-center text-[0.8rem] font-bold text-slate-400">
                    Changes made to Profile Image will be Instantly reflected to your Profile
                </div>
                <input type="file" accept="image/png , image/jpeg , image/webp" className="bg-white invisible" aria-label="name" ref={FileRef} onChange={(event) => HandleFileChange(event)}/>
                <div className="mt-[3rem] mb-[1rem]">
                    <Button size="extrasized" text="Upload" color="Blue" onClick={() => HandleButtonClick()}/>
                </div>
            </div>
        </div>
    </>
}