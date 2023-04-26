import React, { Key, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { PinnedCryptoState, setPins } from '../features/pinnedCryptoSlice';
import Account from '../components/Account';
import PinnedCrypto from '../components/PinnedCrypto';
import { useAuth0 } from "@auth0/auth0-react";
import { getBetByBetID, getUserByEmail, getUserWagersByEmail } from '../API/CoinAPI';
import { Wager } from '../components/PlaceWager';
import WagerRow from '../components/WagerRow';

export const Dashboard = () => {

  const pinnedCryptos = useSelector((state : PinnedCryptoState) => state.pinnedCryptos);
  const { user} = useAuth0();
  const [activeWagers, setActiveWagers] = useState<Wager[]>();

  const dispatch = useDispatch();

  useEffect(()=>{
    if(user){
    //console.log(user);
    getUserByEmail("http://localhost:3001", user?.email).then((result) => {
      dispatch(setPins(result.data.pins));
    });

    getUserWagersByEmail("http://localhost:3001", user?.email).then((result) =>{
      if(result){
        setActiveWagers(result.data);
      }
    })
    }
  },[user]);

  useEffect(() =>{

  }, []);

  return (
    <div className='bg-coal-950 w-full min-h-screen max-h-full pb-3'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Dashboard 
        </div>
        <Account />
      </div>

      <div className='text-coal-200 text-2xl mx-10 p-5'>
        Pinned Cryptos


          <div className='grid grid-cols-5 pt-5'>
            {(pinnedCryptos as any).pinnedCryptos.map((crypto: String) =>{
              return <PinnedCrypto name={crypto} />
            })
            }
          </div>
      </div>

        <div className='text-coal-200 text-2xl p-5 mx-10'>
          <div className='mb-5 w-2/12 mx-auto'>
            Active Wagers
          </div>
          
          <div className='flex flex-row justify-between w-6/12 mx-auto text-xl items-center text-coal-200 bg-coal-925 py-2 px-5 text-center rounded-t-2xl'>
              <div className='w-1/4 text-left'>Crypto</div>
              <div className='w-1/3 text-left'>Expiration Date</div>
              <div className='w-1/3 text-left'>Strike Price</div>
          </div>
          <div className='bg-coal-900 mx-auto w-6/12 h-[40vh] overflow-y-scroll'>
            
            {
              activeWagers?.map((wager : Wager) =>{
                return (
                  // <div>{wager.betID}</div>
                  <WagerRow  wager={wager} betID={wager.betID}/>
                  )
              })
            }
          </div>

        </div>

    </div>
  )
}

