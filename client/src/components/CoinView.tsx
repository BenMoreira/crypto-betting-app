import React, { useEffect, useState } from 'react'
import StockCandleChart from './StockCandleChart';

const CoinView = ({coinToView, viewType} : {coinToView : Object,  viewType : Number}) => {



    useEffect(()=> {
    }, [coinToView, viewType]);

    function renderChart(){
      if(coinToView !== null && coinToView !== undefined){
        return <StockCandleChart coinToView={coinToView} viewType={viewType}/>
      }
    }

  return (
    <>
    { renderChart() }
    </>
  )
}

export default CoinView