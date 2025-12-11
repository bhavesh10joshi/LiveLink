import { useRef } from 'react' ;
import './App.css' ;
import { MainLogo } from '../component/Images/MainLogoImage'
import { InputBox } from '../component/ui/Inputbox'
import { Button } from '../component/ui/Button'
import { HeaderLogo } from '../component/Images/HeaderLogo'
import { MessageBubble } from '../component/ui/Messagebubble'
import { MemberBubble } from '../component/ui/MemberBubble'

export function Chat() {
  const Messageref = useRef<HTMLInputElement>(null);
  return<>
    <div className='h-screen w-screen bg-[#000000] flex'>
      <div>
        <div className='flex'>
          <div className='ml-[1rem]'>
            <HeaderLogo/>
          </div>
          <div className='text-[#FFFFFF] pt-[1rem] font-bold text-[1.4rem] pl-[0.5rem]'>
            LiveLink
          </div>
        </div>
        <div className='flex'>
          <div className='text-green-200 font-bold mt-[2rem] ml-[6rem] text-[1.4rem]'>Pod Name</div>
          <div className='font-bold mt-[2rem] ml-[39rem] text-[1.4rem] text-[#FFFFFF]'>My Server</div>
        </div>
        <div className='bg-[#FFFFFF] ml-[6rem] w-[53rem] h-[30rem] rounded-xl mt-[0.8rem] p-[1rem] flex flex-col overflow-y-auto space-y-2 hide-scrollbar'>
          <MessageBubble type='Recieved' Message='Hello' UserName='Uncle'/>
          <MessageBubble type='Sent' Message='Hello' UserName='Bhavesh'/>
        </div>
        <div className='ml-[6rem] mt-[1rem] flex'>
          <div className='flex'>
            <InputBox size='lg' placeholder='Type Your Message' color='bg-blue-400'/> 
          </div>
          <div className='mt-[-1rem] ml-[1rem]'>
            <Button sizes='lg' text="Send" bgcolor='bg-blue-800' textcolor='text-[#FFFFFF]'/>
          </div>
        </div>
      </div>
      <div>
        <div className='mt-[5rem] ml-[19rem]'>
          <Button sizes='sm' text='Log Out' bgcolor='bg-red-800' textcolor='text-[#FFFFFF]'/>
        </div>
        <div>
          <div>
            <div className='bg-[#FFFFFF] ml-[2rem] w-[29rem] h-[30rem] rounded-xl mt-[0.8rem] p-[1rem] flex flex-col overflow-y-auto space-y-2 hide-scrollbar'>
             <div className='flex mb-[1rem]'>
                <div className='rounded-xl pt-[0.5rem] pb-[0.5rem] pb-[0.2rem] flex items-center justify-center w-[17rem] bg-blue-400 text-[#FFFFFF]'>
                  Total Participants
                </div>
                <div className='rounded-xl pt-[0.5rem] pb-[0.5rem] pb-[0.2rem] flex items-center justify-center w-[9rem] ml-[1rem] bg-purple-400 text-[#FFFFFF] font-bold'> 
                  15
                </div>
             </div>
             <div className='flex flex-col overflow-y-auto space-y-2 hide-scrollbar'>
                <MemberBubble Username='Uncle'/>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
