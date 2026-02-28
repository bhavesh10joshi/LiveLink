import { PlusIcon } from "../Icons/PlusBtn"
import { SendMessage } from "../Icons/SendMessage"
import { useRef, useState } from "react"
import axios from "axios"
import { APIurl } from "../../Config/ApiConfig"

interface Style {
    type: "personal" | "group",
    GroupId?: String,
    RecieverUniqueId?: String
}

export function TypeTheMessage(props: Style) {    
    const [MessageType, SetMessageType] = useState("text");
    const [ImageData, SetImageData]: any = useState();
    const InputRef: any = useRef(null);
    const ImageRef: any = useRef(null); 

    function HandleButton() {
        ImageRef.current.click();
    }

    async function SelectImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        
        if (!file) {
            return; 
        }

        SetMessageType("image");

        const formdata: any = new FormData();
        formdata.append("photo", file);
        formdata.append("ContentType", "image");

        if (props.type == "personal") {
            formdata.append("RecieverUniqueId", props.RecieverUniqueId);
        } else {
            formdata.append("GroupId", props.GroupId);
        }  
        
        SetImageData(formdata);
        console.log("hello");
    }

    async function SendthetextMessage() {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "authorization": token 
            }
        };

        const CurrentTextMessage = InputRef.current.value;
        if (!CurrentTextMessage.trim()) return; 

        if (props.type == "personal") {
            const payload = {
                RecieverUniqueId: props.RecieverUniqueId, 
                ContentType: "text", 
                Message: CurrentTextMessage
            };
            try {
                await axios.post(`${APIurl}/Users/Message/UserToUser/Text/Send`, payload, config);
                alert("Message Sent");
                InputRef.current.value = ""; 
                return;
            } catch (e) {
                alert("Error Occurred while sending text message!");
                return;
            }
        } else {
            const payload = {
                GroupId: props.GroupId, 
                ContentType: "text", 
                Message: CurrentTextMessage
            };
            try {
                await axios.post(`${APIurl}/Users/Message/UserToGroup/Text/Send/toAll`, payload, config);
                alert("Message Sent");
                InputRef.current.value = ""; 
                return;
            } catch (e) {
                alert("Error Occurred while sending text message!");
                return;
            } 
        }
    }

    async function SendtheImageMessage() {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "authorization": token 
            }
        };

        if (props.type == "personal") {
            try {
                console.log("acha bete ");
                const result = await axios.post(`${APIurl}/Users/Message/UserToUser/Image/send`, ImageData, config);
                console.log(result);
                alert("Message Sent !");
                
                SetMessageType("text");
                SetImageData(null);
                ImageRef.current.value = ""; 
                return;
            } catch (e) {
                alert("Error Occurred while sending message to the user!");
                return;
            }
        } else {
             try {

                await axios.post(`${APIurl}/Users/Message/UserToGroup/Image/Send/ToAll`, ImageData, config);
                alert("Message Sent !");
                

                SetMessageType("text");
                SetImageData(null);
                ImageRef.current.value = ""; 
                return;
            } catch (e) {
                alert("Error Occurred while sending message to the group!");
                return;
            }
        }
    }

    return <>
        <div className="w-full h-full pl-[1rem] pr-[2rem] pt-[0.5rem] pb-[0.5rem] flex"> 
            <div className="flex justify-center items-center h-full bg-[#162456] pl-[1rem] rounded-l-lg">
                <button aria-label="Name" type="button" onClick={HandleButton}>
                    <div className="flex justify-center items-center h-full ">
                        <div className="bg-blue-200 rounded-xl">
                            <PlusIcon/>
                        </div>
                    </div>
                </button>
            </div>
            
            <input type="file" accept="image/png, image/jpeg, image/webp" aria-label="name" className="invisible w-[0rem]" onChange={SelectImage} ref={ImageRef}/>
            
            <div className="flex justify-center items-center w-full h-full">
                <input type="text" aria-label="Name" className=" bg-[#162456] h-full w-full placeholder:text-white pl-[1rem]" placeholder="Type a Message ...." ref={InputRef}/>
            </div>
            
            <div className="flex justify-center items-center h-full ml-[0.5rem]">
                <button 
                    aria-label="Send" 
                    type="button" 
                    onClick={MessageType === "text" ? SendthetextMessage : SendtheImageMessage}
                >
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