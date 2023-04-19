import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { PinnedCryptoState } from '../features/pinnedCryptoSlice';
import Account from '../components/Account';
import PinnedCrypto from '../components/PinnedCrypto';
import { useAuth0 } from "@auth0/auth0-react";

export const Dashboard = () => {

  const pinnedCryptos = useSelector((state : PinnedCryptoState) => state.pinnedCryptos);
  const { user, isAuthenticated} = useAuth0();

  useEffect(()=>{console.log(user)},[user]);

  return (
    <div className='bg-coal-800 w-full min-h-screen max-h-full pb-3'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Dashboard 
        </div>
        <Account />
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl'>
        <div className='text-coal-200 text-2xl p-5'>
          Pinned Cryptos


            <div className='grid grid-cols-5 pt-5'>
              {(pinnedCryptos as any).pinnedCryptos.map((crypto: String) =>{
                return <PinnedCrypto name={crypto} />
              })
              }
            </div>
        </div>
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl mt-10'>
        <div className='text-coal-200 text-2xl p-5'>
          Active Wagers

          <div className='bg-coal-800 w-100% h-[40vh] rounded-xl'>
          </div>

        </div>
      </div>

    </div>
  )
}