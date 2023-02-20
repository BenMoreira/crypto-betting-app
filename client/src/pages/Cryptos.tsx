import React from 'react'
import Account from '../components/Account'

export const Cryptos = () => {
  return (
    <div className='bg-coal-800 w-full min-h-screen max-h-full'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Cryptos
        </div>
        <Account />
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl pb-5'>
        <div className='flex flex-row justify-between'>
          <div className='text-coal-200 text-2xl p-5 pt-7'>
            Cryptocurrencies
          </div>

          <div className='m-5'>
            <input className='bg-coal-700 text-coal-200 text-xl p-3 rounded-xl' placeholder='Search'/>
          </div>
        </div>

        <div className='bg-coal-800 w-100% h-[20vh] mx-5 rounded-xl'>
          
        </div>
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl pb-5 mt-10'>
        <div className='flex flex-row justify-between'>
          <div className='text-coal-200 text-2xl p-5'>
            Crypto Chart
          </div>
        </div>

        <div className='bg-coal-800 w-100% h-[20vh] mx-5 rounded-xl'>
          
        </div>
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl py-5 mt-10'>
        <div className='bg-coal-800 w-100% h-[10vh] mx-5 rounded-xl'>
          <div className='text-coal-200 text-2xl p-5'>
            Create a New Bet
          </div>
        </div>
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl pb-5 mt-10'>
        <div className='flex flex-row justify-between'>
          <div className='text-coal-200 text-2xl p-5'>
            Active Bets
          </div>
        </div>

        <div className='bg-coal-800 w-100% h-[20vh] mx-5 rounded-xl'>
          <div className='text-coal-200 text-xl p-5'>
            Place a Wager:
          </div>
        </div>
      </div>
    </div>
  )
}
