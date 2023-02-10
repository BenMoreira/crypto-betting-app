import React from 'react'
import {MdOutlineSettings} from 'react-icons/md';
import {GiToken} from 'react-icons/gi';

const Account = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-3'>
            <div className='text-blue-300 font-light'>
                Benjamin
            </div>
            <div className='text-coal-500 text-2xl'>
                <MdOutlineSettings />
            </div>
        </div>

        <div className='flex flex-row items-center gap-1 text-coal-200 text-2xl'>
            <GiToken /> 1000
        </div>
    </div>
  )
}

export default Account