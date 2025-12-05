import { useRef } from 'react'
import './App.css'
import { MainLogo } from './component/Images/MainLogoImage'
import { InputBox } from './component/ui/Inputbox'
import { Button } from './component/ui/Button'
import { HeaderLogo } from './component/Images/HeaderLogo'

function App() {
  const Messageref = useRef<HTMLInputElement>(null) 
  return<>
    <div className='h-screen w-screen bg-black'>
      <div>
        <div className='flex'>
          <div className='ml-[1rem]'>
            <HeaderLogo/>
          </div>
          <div className='text-white pt-[1rem] font-bold text-[1.4rem] pl-[0.5rem]'>
            LiveLink
          </div>
        </div>
        <div className='flex'>
          <div className='text-green-200 font-bold mt-[2rem] ml-[6rem] text-[1.4rem]'>Pod Name</div>
          <div className='font-bold mt-[2rem] ml-[39rem] text-[1.4rem] text-white'>My Server</div>
        </div>
        <div className='bg-white ml-[6rem] w-[53rem] h-[30rem] rounded-xl mt-[0.8]rem]'>hello</div>
        <div className='ml-[6rem] mt-[1rem]'>
          <div className='flex'>
            <InputBox size='lg' placeholder='Type Your Message' color='bg-blue-400'/> 
          </div>
          <div>
            <Button sizes='lg' text="send"/>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  </>
}

export default App
