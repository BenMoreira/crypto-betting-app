import React, { useEffect, useState } from 'react'
import { Wager, getTimeString } from './PlaceWager'
import { getBetByBetID } from '../API/CoinAPI';
import { BetObject } from './CreateBet';
import { addCommasToDollarValue } from './PinnedCrypto';

const WagerRow = ({wager, betID} : {wager : Wager, betID : String}) => {

    const [betInfo, setBetInfo] = useState<BetObject>();

    useEffect(()=>{
        getBetByBetID("http://localhost:3001", betID).then(result=>{
            if(result)
                setBetInfo(result.data);
        })
    }, [betID])

  return (
    <div className='flex flex-row justify-between text-xl items-center text-coal-200 py-2 px-5 hover:bg-coal-700 text-center'>
        {
        betInfo ?
        <>
            <div className='w-1/4 text-left capitalize'>{betInfo?.crypto}</div>
            <div className='w-1/3 text-left'>{getTimeString(betInfo?.expirationDate as string)}</div>
            <div className='w-1/3 text-left'>${addCommasToDollarValue(betInfo?.strikePrice as any)}</div>
        </>
        : <></>
        }
    </div>
  )
}

export default WagerRow