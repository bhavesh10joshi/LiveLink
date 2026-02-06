import { Button } from "../Buttons/Button"

interface Styling
{
    DropDown : Boolean
}

export function DropDown(props:Styling)
{
    return<>
        {
            props.DropDown ?<div className="w-full h-[11rem] border-white border rounded text-white text-[0.9rem] font-bold hover:text-white p-1">
                <div className="flex justify-center items-center bg-slate-700 rounded pt-2 pb-2"><a href="">Features</a></div>
                <div className="flex justify-center items-center bg-slate-700 rounded pt-2 pb-2 mt-1"><a href="">Security</a></div>
                <div className="flex justify-center items-center bg-slate-700 rounded pt-2 pb-2 mt-1"><a href="">Pricing</a></div>
                <div className="flex justify-center items-center rounded pt-2 pb-2 ">
                    <Button size="secondry" color="Blue" text="Sign In"/>
                </div>
            </div> :null
        }
    </>
}