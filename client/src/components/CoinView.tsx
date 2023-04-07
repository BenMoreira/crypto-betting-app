import React, { useEffect, useState } from 'react'
import StockCandleChart from './StockCandleChart';

const CoinView = ({coinToView, viewType} : {coinToView : String,  viewType : Number}) => {

    const [data, setData] = useState([]);

    const func = () =>{
        //historical price (from date in history)
        //let call = fetch("https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2022");

        //ohlc data from X days away
        //time in UNIX
        //open, high, low, close
        if(viewType === 0){
        let call = fetch("https://api.coingecko.com/api/v3/coins/"+coinToView+"/ohlc?vs_currency=usd&days=1");
        return call;
        }
        else{
          let call = fetch("https://api.coingecko.com/api/v3/coins/"+coinToView+"/ohlc?vs_currency=usd&days=14");
          return call;
        }

    }

    useEffect(()=> {
        let d = func(); 
        d.then(response => response.json().then(result => {setData(result);}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinToView, viewType]);

  return (
    <>
    <StockCandleChart data={data} coinToView={coinToView} viewType={viewType}/>
    </>
  )
}

export default CoinView