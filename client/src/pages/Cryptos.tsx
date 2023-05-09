import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Account from '../components/Account'
import CryptoViewChart from '../components/CryptoViewChart'
import CryptoList from '../components/CryptoList'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllCoinData, updateUserPins } from '../API/CoinAPI'
import { AiFillPushpin, AiOutlineStock } from 'react-icons/ai'
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
    if((pinnedCryptos as any).pinnedCryptos?.includes(coin)){
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
    <div className='bg-coal-950 w-full min-h-screen max-h-full pb-20'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Cryptos
        {/* <AiOutlineStock className='w-32 h-32  -mt-10 mt-0'/> */}
        </div>
        <Account />
      </div>

      <div className='bg-transparent mx-10 rounded-xl pb-5 flex flex-row-reverse gap-5'>
        <div className='flex flex-col justify-start w-4/12 min-h-[550px] max-h-[550px]'>
          {/* <div className='text-coal-200 text-2xl pb-4 pt-0 font-light'>
            Cryptocurrencies
          </div> */}


        <div className='bg-coal-800 w-100% h-full rounded-xl'>
          <CryptoList selectCoin={selectCoin} selectedCoin={selectedCoin} data={data}/>
        </div>
        </div>

        <div className='flex flex-col w-8/12 mb-10'>
          <div className='rounded-xl w-100% bg-coal-900 max-h-[550px]'>
              <div className='flex'>
                <button className='rounded-xl w-60 bg-coal-800 hover:bg-coal-500 text-blue-300 mx-4 mt-4 py-1 px-2' 
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
      </div>

      <div className='flex flex-row justify-between gap-5 mx-10'>
          <div className='bg-transparent w-4/12 h-fit rounded-xl'>
            <div className='text-coal-200 text-2xl mb-4 text-center'>
              <span className='text-3xl'>{selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1).toLowerCase()}</span> <span className='text-xl font-extralight px-2'>Betting Spread</span>
            </div>
            <div className='w-100%'>
            <CreateBet name={selectedCoin}/>
            </div>
          </div>
            
          <div className='text-coal-200 text-4xl text-center mb-4 w-8/12'>
            <div className='mb-4 text-center text-3xl mx-auto w-full'>
            Active Bets
            </div>
            <div className='rounded-2xl bg-coal-900 min-h-[25px]'>
            <PlaceWager name={selectedCoin}/>
            </div>
          </div>
      </div>
    </div>
  )
}
