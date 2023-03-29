import React, { useEffect, useState } from 'react'
import StockCandleChart from './StockChandleChart';

const Gecko = () => {

    const [data, setData] = useState([]);

    const func = () =>{
        //historical price (from date in history)
        //let call = fetch("https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2022");

        //ohlc data from X days away
        //time in UNIX
        //open, high, low, close
        let call = fetch("https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1");
        return call;

    }

    useEffect(()=> {
        let d = func(); 
        d.then(response => response.json().then(result => {setData(result); console.log(result)}));
    }, []);

  return (
    <>
    <StockCandleChart data={data} />
    </>
  )
}

export default Gecko