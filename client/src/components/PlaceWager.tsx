import React, {Key, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlacedBetsState, Bet } from '../features/placedBetsSlice';
import { createWager, getCoinData, getUserByEmail, getUserWagersByEmail, updateUserTokens } from '../API/CoinAPI';
import { CryptoObject } from './CreateBet';
import { useAuth0 } from '@auth0/auth0-react';
import { TokenState, subtractTokens } from '../features/tokenSlice';
import { addCommasToDollarValue } from './PinnedCrypto';


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

export function getTimeString(time : string){
  let d = new Date();
  let date = new Date(parseInt(time) + (d.getTimezoneOffset() * 60 * 1000));
  return date.toLocaleString();
}

const PlaceWager = ({name} : {name: String}) => {

    const placedBets = useSelector((state : PlacedBetsState) => state.placedBets);
    const userTokens = useSelector((state : TokenState) => state.tokens);

    const [data, setData] = useState<CryptoObject>();
    const [userWagers, setUserWagers] = useState<String>();
    const {user, isAuthenticated} = useAuth0();
    const dispatch = useDispatch();

    useEffect(() =>{
        //console.log((placedBets as any).placedBets);
    },[placedBets]);

    useEffect(() =>{
      getCryptoData(name);
  },[name]);

  useEffect(() =>{
    if(user){
      getUserWagersByEmail("http://localhost:3001", user.email).then(result=>{
        //console.log(result.data);

        let wagers = result.data.map(function(wager : Wager){
          return wager.betID;
        });
        setUserWagers(wagers);
      })
    }
},[user]);


  function placeWager(e : MouseEvent ,bet : Bet){
    let wagerVal = 20;

    if(user){
      if(userTokens.tokens < wagerVal){
        return;
      }
      if(userWagers?.includes(bet.betID.toString())) return;
    //console.log("User : " + user.email + " placed Wager on : betID = " +  bet.betID + "");
    let wagerObject = {
      betID: bet.betID,
      userID : user.email,
      placedDate : bet.creationDate,
      wagerValue : wagerVal,
    }
    createWager("http://localhost:3001", wagerObject);

    dispatch(subtractTokens(wagerVal));

    updateUserTokens("http://localhost:3001", {email : user.email, tokens: userTokens.tokens - wagerVal})


      if(e.currentTarget){
        (e.currentTarget as HTMLButtonElement).disabled = true;
        (e.currentTarget as HTMLButtonElement).textContent = "Placed";
      }
    }
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

  

  return (
      <>
      {
        !((((placedBets as any).placedBets.filter((b : any) => b.expirationDate > new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000))) as Bet[]).length) ? 
        <div className="font-light text-blue-300 text-base capitalize py-2">no active bets</div>
        :
        (((placedBets as any).placedBets.filter((b : any) => b.expirationDate > new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000))) as Bet[]).sort((
        bet1 : any, bet2 : any) => bet1.expirationDate < bet2.expirationDate ? -1 : 1).map(bet=>{
            let beenPlaced = userWagers?.includes(bet.betID.toString());
        return (
          <div key={bet.betID as Key} className=''>
            <div className='flex flex-row justify-between text-xl items-center text-coal-200 py-2 hover:bg-coal-700 text-center'>
              <div className=' py-1 font-normal w-[7vw]'>
                ${addCommasToDollarValue(bet.creationPrice).toString()}
              </div>

              <div className=' py-1 font-normal w-[15vw]'>
                {getTimeString(bet.expirationDate as string).toString()}
              </div>

              <div className=' py-1 font-normal w-[5vw]'>
                {getStrikePercent(bet)}%
              </div>

              <div className=' py-1 font-normal w-[10vw]'>
                ${addCommasToDollarValue(bet.strikePrice).toString()}
              </div>

              <div className=' py-1 font-normal w-[10vw]'>
                ${addCommasToDollarValue(getCurrentPriceDifference(bet))}
              </div>

              <button onClick={(e) => placeWager(e as unknown as MouseEvent, bet)} disabled={beenPlaced} className={`rounded-lg text-center my-1 mx-2 py-1 bg-blue-600 hover:bg-blue-800 text-coal-50font-normal w-[8vw] ` + (beenPlaced ? "text-coal-200 bg-blue-900" : "text-coal-50 ")}>
                    {beenPlaced ? "Placed" : "Place Wager"}
              </button>
            </div>
          </div>
            )
      })}
      </>
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
            <tr  key={bet.betID as Key} className=' text-coal-200'>
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



              <div className='flex flex-row  rounded-lg'>
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
              </div>

              <div className='text-center p-1 bg-blue-400 text-coal-900 rounded-lg'>
                  <button onClick={() => placeWager(bet)}> Place Wager</button>
              </div>
*/