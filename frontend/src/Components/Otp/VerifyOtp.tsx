import { useState , useRef ,useEffect} from "react"
import { Input } from "../Inputs/InputBox";

interface Style{
    length : any ,
    Otp : any , 
    SetOtp : (val:any) => void
}
export function VerifyOtp(props:Style)
{
    const OtpRef:any = useRef([]);

    useEffect(function()
    {
        OtpRef.current[0].focus();
        return;
    } , []);

function HandleKeyDown(e:any, index:any) {
    const CopyOtpFields:any = [...props.Otp];

    if (e.key === "Backspace") {
        CopyOtpFields[index] = "";
        props.SetOtp(CopyOtpFields);
        
        if (index > 0) {
            OtpRef.current[index - 1].focus();
        }
        return;
    }

    if (isNaN(e.key) || e.key === " ") {
        return;
    }

    CopyOtpFields[index] = e.key;
    props.SetOtp(CopyOtpFields);

    if (index + 1 < props.length) {
        OtpRef.current[index + 1].focus();
    }
}
    return<>
        <div className="flex justify-center items-center gap-7">
            {props.Otp.map((value:any,index:any) => 
                <input type="text" 
                className="w-[3rem] h-[4rem] rounded-md bg-white text-blue-800 text-[3rem] font-bold text-center" 
                aria-label="name"
                ref={(CurrentInput) => {OtpRef.current[index] = CurrentInput}}
                key={index}
                value={value}
                onKeyDown={(e) => HandleKeyDown(e , index)}
                />
            )}
        </div>
    </>
}