import { PlusIcon } from "../Icons/PlusBtn"
import { SendMessage } from "../Icons/SendMessage"

export function TypeTheMessage()
{
    return<>
            <div className="w-full h-full pl-[2rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] flex"> 
                <div className="flex justify-center items-center h-full mr-[0.5rem]">
                    <button aria-label="Name" type="button">
                        <div className="flex justify-center items-center h-full ">
                            <div className="bg-blue-200 rounded-xl">
                                <PlusIcon/>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="flex justify-center items-center w-full h-full">
                    <input type="text" aria-label="Name" className=" bg-[#162456] h-full w-full rounded-xl placeholder:text-white pl-[1rem]" placeholder="Type a Message ...."/>
                </div>
                <div className="flex justify-center items-center h-full ml-[0.5rem]">
                    <button aria-label="Name" type="button">
                        <div className="flex justify-center items-center h-full ">
                            <div className="bg-blue-200 rounded-xl p-[0.2rem] border">
                                <SendMessage/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
    </>
}