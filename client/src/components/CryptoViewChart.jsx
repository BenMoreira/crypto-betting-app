import React from 'react'
import StockCandleChart from './StockCandleChart';



const CryptoViewChart = ({cryptoName, viewType, ...props}) => {




  return (
    <>
    {
      cryptoName !== null && cryptoName !== undefined ? 
      <StockCandleChart cryptoName={cryptoName} viewType={viewType}/> : <></>
    }
    </>
  )
}

export default CryptoViewChart