import React, {useEffect, useState} from 'react'
import { getCoinData, getAllCoinData } from '../API/CoinAPI';

const tokenList = "bitcoin,ethereum,dogecoin,litecoin,solana,monero,optimism,dash,decentraland,maker"

const idDict = {
    bitcoin : "btc",
    ethereum : "eth",
    dogecoin : "doge",
    litecoin : "ltc",
    solana : "sol",
    monero : "xmr",
    optimism : "op",
    dash : "dash",
    decentraland : "mana",
    maker : "mkr",

}


const CrypDisp = ({selectCoin, data, ...props}) => {



    return (
        <div className='grid grid-cols-1 max-h-[30vh] overflow-scroll overflow-x-hidden'>
            {
            data.map(token => {
                return (
                    <div className='bg-coal-700 select-none hover:bg-coal-500 w-100% h-[5vh] border border-coal-400 flex flex-row justify-center items-center text-xl px-5 text-coal-300 hover:text-coal-900 cursor-pointer'
                        onClick={() => selectCoin(token.crypto)}>
                        <div className='w-4/12'>{idDict[token.crypto]?.toUpperCase()}</div>
                        <div className='capitalize w-4/12'>{token.crypto}</div>
                        <div className='w-4/12'>${token.price}</div>
                    </div>
                )
            })
            
        }
        </div>
    )
}

export default CrypDisp

