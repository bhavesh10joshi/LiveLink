import { useRef } from 'react'
import './App.css'
import { MainLogo } from '../component/Images/MainLogoImage'
import { InputBox } from '../component/ui/Inputbox'
import { Button } from '../component/ui/Button'

export function Login() {
  const Usernameref = useRef<HTMLInputElement>(null) 
  return (
    <>
      <div className='flex w-full h-full'>
        <div>
          <MainLogo/>
        </div>
        <div className='w-full h-full'>
          <div className='p-[2rem] border-black border m-[1rem] rounded-xl border-[5px] mt-[12rem]'>
            <div className='text-[1.2rem]'>
              Username
            </div>
            <div className='w-full flex justify-center items-center mt-[1rem]'>
              <InputBox size='md' Reference={Usernameref} color='bg-purple-400' />
            </div>
            <div className='text-[1.2rem] mt-[1rem]'>
              Password
            </div>
            <div className='w-full flex justify-center items-center mt-[1rem]'>
              <InputBox size='md' Reference={Usernameref} color='bg-purple-400'/>
            </div>
            <div className='ml-[30rem] mt-[3rem]'>
              <Button sizes='md' text='LogIn'bgcolor='bg-blue-800'textcolor='text-white'/>
            </div>
          </div>
          <div className='flex'>
            <div className='ml-[36rem]'>Don't Have An Account ?</div>
            <div><a href="" className='ml-[0.5rem] font-bold'>Login</a></div>
          </div>
        </div>
      </div>
    </>
  )
}
