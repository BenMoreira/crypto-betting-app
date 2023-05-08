import React from 'react'
import { addCommasToDollarValue } from './PinnedCrypto'

//const tokenList = "bitcoin,ethereum,dogecoin,litecoin,solana,monero,optimism,dash,decentraland,maker"

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

const CryptoList = ({selectCoin, selectedCoin, data, ...props}) => {



    return (
        <div className='flex flex-col justify-start bg-transparent h-full overflow-auto overflow-x-hidden scroll-smooth rounded-2xl' id="cryptolist">
            {
            data.map(token => {
                return (
                    <div key={token.crypto} className={`min-h-[10%] ${selectedCoin === token.crypto ? 'bg-coal-900 text-blue-300':'bg-coal-900 text-coal-400'}
                     select-none hover:bg-coal-500 w-100% h-[5vh]  flex flex-row
                     justify-center items-center text-xl px-5  hover:text-coal-100 cursor-pointer`}
                        onClick={() => selectCoin(token.crypto)}>
                        <div className='w-4/12'>{idDict[token.crypto]?.toUpperCase()}</div>
                        <div className='capitalize w-4/12 truncate'>{token.crypto}</div>
                        <div className='w-4/12'>${addCommasToDollarValue(token.price)}</div>
                    </div>
                )
            })
            
        }
        </div>
    )
}

export default CryptoList

