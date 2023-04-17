import React, {useState, useEffect} from 'react'
import Account from '../components/Account'
import CryptoViewChart from '../components/CryptoViewChart'
import CryptoList from '../components/CryptoList'
import { getAllCoinData } from '../API/CoinAPI'

export const Cryptos = () => {
  const URL = "http://localhost:3001";
  const [selectedCoin, selectCoin] = useState("bitcoin");
  //0 == Shawty, 1 == Long
  const [viewType, setViewtype] = useState(0);

  //ALL 10 Token data
  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
  }, [selectedCoin])

  const func = () => {
      let call = getAllCoinData(URL);
      return call;
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
            <input className='bg-coal-700 text-coal-200 text-xl p-3 rounded-xl' placeholder='Search'/>
          </div>
        </div>

        <div className='bg-coal-800 w-100% h-fit mx-5 rounded-xl'>
          <CryptoList selectCoin={selectCoin} data={data}/>
        </div>
      </div>

      

        <div className='p-5 mx-5 rounded-x'>
          <div className='rounded-xl w-100% bg-coal-900'>
            <button className='rounded-xl w-60 bg-coal-800 text-blue-300 mx-4 mt-4 py-1 px-2' 
            onClick={() => {
              if(viewType === 0) {setViewtype(1);}
              else {setViewtype(0)}
            }}>{viewType === 0 ? "Short-Term (1 Day)" : "Long-Term (14 Days)"}</button>
            <CryptoViewChart cryptoName={selectedCoin} viewType={viewType}/>
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
