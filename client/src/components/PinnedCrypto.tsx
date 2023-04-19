import React, {useState, useEffect} from 'react'
import {AiFillPushpin} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { getCoinData } from '../API/CoinAPI';
import { unpin } from '../features/pinnedCryptoSlice';
import QuickQuoteChart from './QuickQuoteChart';

const PinnedCrypto = ({name} : {name : String}) => {

  const [currentPrice, setCurrentPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let d = getCoinData("http://localhost:3001", name);
    d.then(res => {setCurrentPrice(res.data.price)});
  },[name]);

  return (
    <div className='flex flex-col w-[90%] mx-[5%] h-[20vh]'>
      <div className='flex flex-row justify-between items-baseline gap-1 text-xl'>
        <div className='text-blue-300'>
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </div> 

        <div className='flex items-baseline gap-1'>
        <div className='text-coal-200 font-light'>
          ${Math.trunc(currentPrice * 1000) / 1000}
        </div>

        <div className='text-coal-200' onClick={() => dispatch(unpin(name))}>
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