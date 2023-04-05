import React, {useEffect, useState} from 'react'

const CrypDisp = () => {

    const [data, setData] = useState([]);

    const func = () => {
        //let call = fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        let call = fetch("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");
        return call;
    }

    useEffect(()=> {
        let d = func(); 
        d.then(response => response.json().then(result => {setData(result); console.log(result)}));
    }, []);

    return (
        <div className='grid grid-cols-1'>
            <div className='bg-coal-700 hover:bg-coal-500 w-100% h-[5vh] rounded-lg flex flex-row justify-center items-center text-xl px-5 text-coal-300 hover:text-coal-900'>
                <div className='capitalize w-4/12'>{data.symbol}</div>
                <div className='w-4/12'>{data.name}</div>
                <div className='w-4/12'>${data?.market_data?.current_price?.usd}</div>
            </div>
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