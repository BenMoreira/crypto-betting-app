import React from 'react'
import {AiOutlinePushpin} from 'react-icons/ai';

const PinnedCrypto = () => {
  return (
    <div className='flex flex-col w-[90%] h-[20vh]'>
      <div className='flex flex-row justify-center items-baseline gap-1 text-xl'>
        <div className='text-blue-300'>
          BTC
        </div> 

        <div className='text-coal-200 font-light'>
          $60,500
        </div>

        <div className='text-coal-200'>
          <AiOutlinePushpin />
        </div>
      </div>

      <div className='bg-coal-800 h-[80%] rounded-lg'>
        Chart
      </div>
    </div>
  )
}

export default PinnedCrypto