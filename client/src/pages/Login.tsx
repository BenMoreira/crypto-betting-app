import React from 'react'
import LoginButton from '../components/LoginButton'

const Login = () => {


  return (
    <div className='bg-coal-950 w-full min-h-screen max-h-full flex flex-row justify-center items-center'>
       <div className='flex flex-col justify-evenly items-center gap-5 w-[400px] h-[200px] bg-coal-900 text-coal-100 text-center py-5'>
            Please login to continue to the application!
            <span className='font-bold text-red-600'>NOTE: This application's server is hosted for FREE using Render.com, so please allow some time for the server to spin up when
            first logging in / registering</span>
            <div className='w-[50%]'>
                <LoginButton />
            </div>
       </div>
    </div>
  )
}

export default Login