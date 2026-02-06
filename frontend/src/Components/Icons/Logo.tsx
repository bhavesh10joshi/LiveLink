import LightMode from "../ui/Image/Logo/LightMode/LightMode.png";
import DarkMode from "../ui/Image/Logo/DarkMode/DarkMode.png";

interface LogoStyles{
    size : "Primary" | "Secondry" ,
    mode : "dark" | "light" 
}; 

const varient  = {
    "Primary" : "h-20 w-20" ,
    "Secondry": "h-20 w-20" ,     
};

const DefaultStyles:String = "";
export function Logo(props : LogoStyles)
{
    return <>
        <div className={`${DefaultStyles}`}>
            {
                props.mode == "light" ?<img src={LightMode} alt="LightModeIcon" className={`${varient[props.size]}`}/> :<img src={DarkMode} alt="DarkModeIcon" className={`${varient[props.size]}`}/>
            }    
        </div>   
    </>
}