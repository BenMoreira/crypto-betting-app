import React from 'react'
import Account from '../components/Account'

export const Leaderboard = () => {
  return (
    <div className='bg-coal-800 w-full h-full'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Leaderboard
        </div>
        <Account />
      </div>
    </div>
  )
}
