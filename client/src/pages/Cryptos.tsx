import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Account from '../components/Account'
import CryptoViewChart from '../components/CryptoViewChart'
import CryptoList from '../components/CryptoList'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllCoinData, updateUserPins } from '../API/CoinAPI'
import { AiFillPushpin } from 'react-icons/ai'
import { PinnedCryptoState } from '../features/pinnedCryptoSlice'
import {pin, unpin} from '../features/pinnedCryptoSlice'
import CreateBet from '../components/CreateBet'
import PlaceWager from '../components/PlaceWager'


export const Cryptos = () => {

  const pinnedCryptos = useSelector((state : PinnedCryptoState) => state.pinnedCryptos);
  const dispatch = useDispatch();

  const {user}= useAuth0();
  const URL = "http://localhost:3001";
  const [selectedCoin, selectCoin] = useState("bitcoin");
  
  //0 == Shawty, 1 == Long
  const [viewType, setViewtype] = useState(0);

  //ALL 10 Token data
  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
    //console.log(pinnedCryptos);
  }, [selectedCoin])

  const func = () => {
      let call = getAllCoinData(URL);
      return call;
  }

  function isPinned(coin : String){
    //console.log(pinnedCryptos);
    //return true;
    if((pinnedCryptos as any).pinnedCryptos.includes(coin)){
      return true;
    }
    else{
      return false;
    }
  }

  const togglePin = (coin : String) =>{
    if(isPinned(coin)){
      dispatch(unpin(coin));
      updateUserPins("http://localhost:3001", {email: user?.email, pins: (pinnedCryptos as any).pinnedCryptos.filter((x: String) => x !== coin)});
    }
    else{
      dispatch(pin(coin));
      updateUserPins("http://localhost:3001", {email: user?.email, pins: [...(pinnedCryptos as any).pinnedCryptos, coin]});
    }
  }

  useEffect(()=> {
      let d = func(); 
      d.then((response)=>{setData(response.data)});
  }, []);

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
            {/* <input className='bg-coal-700 text-coal-200 text-xl p-3 rounded-xl' placeholder='Search'/> */}
          </div>
        </div>

        <div className='bg-coal-800 w-100% h-fit mx-5 rounded-xl'>
          <CryptoList selectCoin={selectCoin} data={data}/>
        </div>
      </div>

      

        <div className='p-5 mx-5 rounded-x'>
          <div className='rounded-xl w-100% bg-coal-900'>
            <div className='flex'>
              <button className='rounded-xl w-60 bg-coal-800 text-blue-300 mx-4 mt-4 py-1 px-2' 
              onClick={() => {
                if(viewType === 0) {setViewtype(1);}
                else {setViewtype(0)}
              }}>{viewType === 0 ? "Short-Term (1 Day)" : "Long-Term (14 Days)"}</button>
              <div className='mx-0 mt-4 py-1 px-1' onClick={() =>{ togglePin(selectedCoin)}}>
                {
                  isPinned(selectedCoin) ? 
                  <AiFillPushpin className='w-6 h-6 text-blue-300' />
                  :
                  <AiFillPushpin className='w-6 h-6 text-white' />
                }
              </div>
            </div>
            <CryptoViewChart cryptoName={selectedCoin} viewType={viewType}/>
          </div>
        </div>

      <div className='bg-coal-900 mx-10 rounded-xl py-5 mt-10'>
        <div className='bg-transparent w-100% h-fit mx-5 rounded-xl'>
          <div className='text-coal-200 text-2xl p-5 mb-4 text-center'>
            <span className='text-4xl'>{selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1).toLowerCase()}</span> <span className='text-xl font-extralight px-2'>Betting Spread</span>
          </div>
          <div className='mx-5 w-100%'>
          <CreateBet name={selectedCoin}/>
          </div>
        </div>
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl pb-5 mt-10'>
        <div className='flex flex-row justify-center'>
          <div className='text-coal-200 p-5'>
            <div className='text-coal-200 text-4xl text-center mb-4'>
            Active Bets
            </div>
            <PlaceWager name={selectedCoin}/>
          </div>
        </div>
      </div>
    </div>
  )
}
