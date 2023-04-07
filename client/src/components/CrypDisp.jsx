import React, {useEffect, useState} from 'react'

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

const CrypDisp = ({selectCoin, ...props}) => {

    const [data, setData] = useState([]);

    const func = () => {
        let call = fetch("https://api.coingecko.com/api/v3/simple/price?ids="+tokenList+"&vs_currencies=usd");
        //let call = fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
        return call;
    }

    useEffect(()=> {
        let d = func(); 
        d.then(response => response.json().then(result => {setData(result);}));
        
    }, []);

    useEffect(()=>{
    }, [data])

    return (
        <div className='grid grid-cols-1 max-h-[30vh] overflow-scroll overflow-x-hidden'>
            {
            tokenList.split(",").map(tokenName => {
            return (
            <div className='bg-coal-700 select-none hover:bg-coal-500 w-100% h-[5vh] border border-coal-400 flex flex-row justify-center items-center text-xl px-5 text-coal-300 hover:text-coal-900 cursor-pointer'
            onClick={() => selectCoin(tokenName)}>
                <div className='w-4/12'>{idDict[tokenName]?.toUpperCase()}</div>
                <div className='capitalize w-4/12'>{tokenName}</div>
                <div className='w-4/12'>${data?.[tokenName]?.usd}</div>
            </div>
            )
                })
            
            }
        </div>
    )
}

export default CrypDisp

/*
<div className='p-2'>
    <div className='bg-coal-500 w-[20vh] h-[18.5vh] p-2 rounded-xl text-center'>
        <p className='capitalize text-blue-300 font-bold text-2xl pt-4'>{data.symbol}</p>
        <p className='text-blue-300 font-bold text-2xl pt-1'>{data.name}</p>
        <p className='pt-6 text-2xl'>${data?.market_data?.current_price?.usd}</p>
    </div>
</div>
*/