import React, {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import {AiFillPushpin} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinData, updateUserPins } from '../API/CoinAPI';
import { PinnedCryptoState, unpin } from '../features/pinnedCryptoSlice';
import QuickQuoteChart from './QuickQuoteChart';

export function addCommasToDollarValue(value : any) {
  // Convert value to string
  value = value.toString();

  // Split the value into dollars and cents
  let [dollars, cents] = value.split(".");

  // Add commas to dollars
  dollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Reassemble the value
  if (cents) {
    value = dollars + "." + cents;
  } else {
    value = dollars;
  }

  return value;
}

const PinnedCrypto = ({name} : {name : String}) => {


  const pinnedCryptos = useSelector((state : PinnedCryptoState) => state.pinnedCryptos);
  const [currentPrice, setCurrentPrice] = useState(0);
  const dispatch = useDispatch();
  const { user, isAuthenticated} = useAuth0();



  useEffect(() => {
    let d = getCoinData("https://crypto-betting-app-7iph.onrender.com", name);
    d.then(res => {setCurrentPrice(res.data.price)});
  },[name]);

  

  function unpinCrypto(name : String){
    dispatch(unpin(name));
    updateUserPins("https://crypto-betting-app-7iph.onrender.com", {email: user?.email, pins: (pinnedCryptos as any).pinnedCryptos.filter((x: String) => x !== name)});
  }

  return (
    <div className='flex flex-col w-[95%] mx-[5%] h-[20vh] bg-coal-900 px-0 p-3 pb-0 mb-5 rounded-xl'>
      <div className='flex flex-row justify-between items-baseline gap-1 text-xl px-3'>
        <div className='text-blue-300 font-light'>
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </div> 

        <div className='flex items-baseline gap-1'>
        <div className='text-coal-200 font-extralight'>
          ${addCommasToDollarValue(Math.trunc(currentPrice * 1000) / 1000)}
        </div>

        <div className='text-coal-200' onClick={() => unpinCrypto(name)}>
          <AiFillPushpin className='w-4 h-4 text-coal-500'/>
        </div>
        </div>
      </div>

      <div className='bg-coal-900 h-[80%] rounded-lg'>
        <QuickQuoteChart cryptoName={name} viewType={0}/>
      </div>
    </div>
  )
}

export default PinnedCrypto