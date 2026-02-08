import { SearchIcon } from "../Icons/Search"

interface style{
    placeholder : string
}
const DefaultStyles:string = "rounded-s-lg bg-slate-900 h-[3rem] text-[0.9rem] pl-[0.6rem] w-full text-white pr-[1rem] placeholder:text-slate-500 outline-none";

export function SearchBar(props:style)
{
    return<>
        <div className="flex w-full">
            <div className="rounded-s-lg flex justify-center items-center bg-slate-900 pl-[1rem]"><SearchIcon/></div>
            <div className="flex justify-center items-center w-full " dir="rtl"><input type="text" placeholder={props.placeholder} className={DefaultStyles}/></div>
        </div>        
    </>
}