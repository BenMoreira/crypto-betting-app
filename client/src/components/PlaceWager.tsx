import React, {Key, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlacedBetsState, Bet } from '../features/placedBetsSlice';
import { createWager, getCoinData } from '../API/CoinAPI';
import { CryptoObject } from './CreateBet';
import { useAuth0 } from '@auth0/auth0-react';


// betID : {
//   type: String,
//   required: true,
// },
// userID : {
//   type: String,
//   required: true,
// },
// placedDate : {
//   type: String,
//   required: true,
// },
// wagerValue : {
//   type: Number,
//   required: true,
// },
// });

export type Wager = {
  betID : String,
  userID : String,
  placedDate : String,
  wagerValue : Number,
}

const PlaceWager = ({name} : {name: String}) => {

    const placedBets = useSelector((state : PlacedBetsState) => state.placedBets);

    const [data, setData] = useState<CryptoObject>();
    const { user, isAuthenticated} = useAuth0();
    const userEmail = "benjamin@g.com";

    useEffect(() =>{
        //console.log((placedBets as any).placedBets);
    },[placedBets]);

    useEffect(() =>{
      getCryptoData(name);
  },[name]);


  function placeWager(bet : Bet){
    console.log("User : " + userEmail + " placed Wager on : betID = " +  bet.betID + "");
    let wagerObject = {
      betID: bet.betID,
      userID : userEmail,
      placedDate : bet.creationDate,
      wagerValue : 10,
    }
    createWager("http://localhost:3001", wagerObject);
  }

  function getStrikePercent(bet : Bet){
    let betPercent = Math.trunc((bet.strikePrice as number) / (bet.creationPrice as number) * 100) / 100;
    return Math.trunc((betPercent - 1) * 100);
  }

  function getCryptoData(cryptoName : String){
    let cryptoData = getCoinData("http://localhost:3001", cryptoName);
    cryptoData.then(res => {setData(res.data)});
  }

  function getCurrentPriceDifference(bet : Bet){
    let currentPrice = 0;
    if(data !== undefined && data !== null)
      currentPrice = data?.price;
    //d.then(res => setData((res.data as CryptoObject)));
    return(currentPrice >= 10 ? (Math.trunc(((bet.strikePrice as number - currentPrice)) * 100) / 100) : (Math.trunc((bet.strikePrice as number - currentPrice) * 100000) / 100000))
  }

  function getTimeString(time : string){
    let date = new Date(parseInt(time));
    return date.toLocaleString();
  }

  return (
    <div className='mx-80% p-4 rounded-xl'>
      <div className='flex flex-row justify-center'>
        <div>
        {(((placedBets as any).placedBets) as Bet[]).map(bet=>{
            return (
            <div key={bet.betID as Key} className='flex flex-row justify-center bg-coal-700 text-coal-200 text-xl p-1 rounded-lg gap-2'>
              <div className='text-center p-1'>
                  ${bet.creationPrice.toString()}
              </div>

              <div className='text-center p-1'>
                {getTimeString(bet.expirationDate as string).toString()}
              </div>

              <div className='text-center p-1'>
                {getStrikePercent(bet)}%
              </div>

              <div className='text-center p-1'>
                ${bet.strikePrice.toString()}
              </div>

              <div className='text-center p-1'>
                ${getCurrentPriceDifference(bet)}
              </div>

              <div className='text-center p-1'>
                  <button onClick={() => placeWager(bet)}> Place Wager</button>
              </div>
            </div>
            )
        })}
        </div>
      </div>
    </div>
  )
}

export default PlaceWager

/*
<div className='flex justify-center'>
      <table className='mx-auto table-auto w-4/4 border-spacing-1 border-separate text-xl'>
        <thead className='bg-coal-800 text-blue-300 text-xl'>
            {/* <th className='font-normal'>Token Name</th> }
            <th className='font-normal p-1'>Creation Price ($)</th>
            <th className='font-normal p-1'>Expiry Date</th>
            <th className='font-normal p-1'>Strike (%)</th>
            <th className='font-normal p-1'>Strike ($)</th>
            <th className='font-normal p-1'>Difference ($)</th>
            <th className='font-normal p-1'></th>
        </thead>
        <tbody>
        {(((placedBets as any).placedBets) as Bet[]).map(bet=>{
            return (
            <tr  key={bet.betID as Key} className='bg-coal-700 text-coal-200'>
            {/* <td>Bitcoin</td> }
            <td  className='text-center p-1'>
                ${bet.creationPrice.toString()}
            </td>

            <td className='text-center p-1'>
              {getTimeString(bet.expirationDate as string).toString()}
            </td>

            <td className='text-center p-1'>
              {getStrikePercent(bet)}%
            </td>

            <td className='text-center p-1'>
              ${bet.strikePrice.toString()}
            </td>

            <td className='text-center p-1'>
              ${getCurrentPriceDifference(bet)}
            </td>

            <td  className='text-center p-1'>
                <button onClick={() => placeWager(bet)}> Place Wager</button>
            </td>
            {/* <td>{new Date().toLocaleTimeString()}</td> }
            </tr>
            )
        })}
        </tbody>
    </table>
        
    </div>
*/