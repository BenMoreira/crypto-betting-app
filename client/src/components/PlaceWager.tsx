import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlacedBetsState, Bet } from '../features/placedBetsSlice';

const PlaceWager = ({name} : {name: String}) => {

    const placedBets = useSelector((state : PlacedBetsState) => state.placedBets);

    useEffect(() =>{
        console.log(placedBets);
    },[placedBets]);

  return (
    <div>
        {/* {placedBets?.map(bet =>{
            return (<div>AA{bet.betID}</div>)
        })} */}
    </div>
  )
}

export default PlaceWager