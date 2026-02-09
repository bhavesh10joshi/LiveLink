import { SearchBar } from "../SearchBar/SearchBar"
import Profile from "../ui/Image/SampleImages/ProfileImage/Profile.jpg"
import { useState } from "react"


 
export function FriendsSideBar()
{
    const [IsSelected , setSelected] = useState("kskjfhdks45646_shdjagjhj");
    return<>
        <div className=" bg-black-500 w-[23rem] h-screen rounded-xl pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem] ml-[1rem]">
            <div className="w-full">
                {<SearchBar placeholder="Search by Name or Unique Id"/>}
            </div>
            <div></div>
        </div>
    </>
}