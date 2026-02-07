import { RealTimeIcon } from "../Icons/Real-Time";
import { Collaboration } from "../Icons/Collaboration";
import { Encryption } from "../Icons/Encryption";
import { Server } from "../Icons/Server";
import { FingerPrint } from "../Icons/FingerPrint";
import { Theme } from "../Icons/Theme";
import { Media } from "../Icons/Media";

interface FeatureStyling{
    type : "Realtime" | "Encrypted" | "Collab" | "Twoafactorauth" | "DataPrivacy" | "RichMediaSupport" | "CustomThemes" 
}

const DefaultStyling:String = "bg-black-500 border border-slate-500 rounded-xl mt-[1rem] lg:w-[40rem] lg:mt-[0rem]";
const DefaultIconStyling:String = "mt-6 ml-6 mb-6 w-16 h-20 rounded-xl flex justify-center items-center  bg-blue-800/10";
const Defaultheadstyle:String = "ml-6 mr-6 text-white font-bold text-[1.3rem]";
const DefaultSecondheadStyle:String = "ml-6 mr-6 mt-6 text-slate-500  text-[0.9rem] mb-6";

const typeIcon = {
    "Realtime" : <RealTimeIcon/> ,
    "Encrypted" : <Encryption/> ,
    "Collab" : <Collaboration/>,
    "Twoafactorauth" : <Server/> ,
    "DataPrivacy" : <FingerPrint/>,
    "RichMediaSupport":<Media/>,
    "CustomThemes":<Theme/>
}
const typeHead = {
    "Realtime" : "Real-time Messaging" ,
    "Encrypted" : "End-to-End Encryption",
    "Collab" : "Group Collaboration" ,
    "Twoafactorauth" : "Two-Factor Auth" ,
    "DataPrivacy" : "Data Privacy", 
    "RichMediaSupport":"Rich Media Support",
    "CustomThemes":"Custom Themes"
}
const typesecondhead = {
    "Realtime" : "Instant delivery with zero latency. See typing indicators, read receipts, and online status in real-time." ,
    "Encrypted" : "Your privacy is our priority. Every message is encrypted before it leaves your device, ensuring only you and your recipient can read it.",
    "Collab" : " Create channels, share files, and manage roles seamlessly. Perfect for teams of any size, from startups to enterprises.",
    "Twoafactorauth" : "Your Messages are for your eyes only . We use industry-standard AES-256 encryption so even we can't read them ." ,
    "DataPrivacy" : "We Don't sell your data . Your Personal information belongs to you , and you have full control over your digital FootPrint .",
    "RichMediaSupport":"Share high-res images, videos, and large files seamlessly. Integrated previews for all your content !",
    "CustomThemes":"Personalize your workspace with deep dark modes aand custom accents that match your brand."
}
export function Features(props:FeatureStyling)
{
    return<>
    <div className={`${DefaultStyling}`}>
        <div>
            <div className={`${DefaultIconStyling}`}>
                {typeIcon[props.type]}            
            </div>
        </div>
        <div className={`${Defaultheadstyle}`}>
            {typeHead[props.type]}
        </div>
        <div className={`${DefaultSecondheadStyle}`}>
            {typesecondhead[props.type]}
        </div>
    </div>
    </>    
}