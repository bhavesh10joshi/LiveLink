import { useRef } from 'react'
import './App.css'
import { MainLogo } from '../component/Images/MainLogoImage'
import { InputBox } from '../component/ui/Inputbox'
import { Button } from '../component/ui/Button'
import { HeaderLogo } from '../component/Images/HeaderLogo'
import { MessageBubble } from '../component/ui/Messagebubble'
import { MemberBubble } from '../component/ui/MemberBubble'
import { Rooms } from '../component/ui/Rooms'

export function Lobby() {
  const RoomNameref = useRef<HTMLInputElement>(null);
  const RoomIdref = useRef<HTMLInputElement>(null);

  function JoinRoom()
  {

  }
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
        <div className='bg-[#FFFFFF] ml-[6rem] w-[53rem] h-[40rem] rounded-xl mt-[0.8rem] p-[1rem] flex flex-col'>
          <div className='flex w-full'>
            <div className='font-bold text-[1.5rem] flex items-center justify-center'>
              <div>
                Existing Rooms
              </div>
            </div>
            <div className='bg-blue-500 text-[#FFFFFF] rounded-xl w-[19rem] h-[3rem] pr-[1rem] flex items-center justify-center ml-[21rem]'>
                <div className='text-[1.1rem] font-bold'>
                  122 Rooms
                </div>
            </div>
          </div>
          <div className='bg-blue-800 w-[51rem] h-[40rem] rounded-xl mt-[0.8rem] p-[1rem] flex flex-col overflow-y-auto space-y-2 hide-scrollbar'>
            <Rooms RoomName='My new Rooms' Members='322 Rooms' Onclick={JoinRoom}/>
          </div>
        </div>
      </div>
      <div>
        <div className='ml-[23rem] mt-[4rem]'>
          <Button sizes='sm' text='LogOut' bgcolor='bg-red-800' textcolor='text-[#FFFFFF]'/>
        </div>
        <div className=' bg-grey-200 rounded-xl mt-[5rem] w-[33rem] h-[25rem] ml-[2rem]'>
          <div className='font-bold text-[1.7rem] pt-[0.5rem] pl-[1rem]'>
            Create A New Room 
          </div>
          <div className='mt-[3rem] text-[1rem] font-bold text-blue-800 p-[1rem]'>
            Enter a Room Name
          </div>
          <div className='pl-[1rem] pr-[1rem]'>
              <InputBox placeholder='Ex :- 123BHj' size='sm' color='bg-[#000000]' Reference={RoomNameref}/>
          </div>
          <div className='text-[1rem] font-bold text-blue-800 p-[1rem]'>
            Enter a Room Id 
          </div>
          <div className='pl-[1rem] pr-[1rem]'>
              <InputBox placeholder='Ex :- BHj37261872' size='sm' color='bg-[#000000]' Reference={RoomIdref}/>
          </div>
          <div  className='mt-[2rem] ml-[20rem]'>
            <Button sizes='sm' text='Create' textcolor='text-[#FFFFFF]' bgcolor='bg-red-800'/>
          </div>
        </div>
      </div>
    </div>
  </>
}

