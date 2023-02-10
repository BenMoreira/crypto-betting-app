import React from 'react'
import {AiFillPushpin} from 'react-icons/ai';

const PinnedCrypto = () => {
  return (
    <div className='flex flex-col w-[90%] mx-[5%] h-[20vh]'>
      <div className='flex flex-row justify-center items-baseline gap-1 text-xl'>
        <div className='text-blue-300'>
          BTC
        </div> 

        <div className='text-coal-200 font-light'>
          $60,500
        </div>

        <div className='text-coal-200'>
          <AiFillPushpin className='w-4 h-4'/>
        </div>
      </div>

      <div className='bg-coal-800 h-[80%] rounded-lg'>
      </div>
    </div>
  )
}

export default PinnedCrypto