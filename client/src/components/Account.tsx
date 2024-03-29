import React, {useEffect, useState} from 'react'
import {MdOutlineSettings} from 'react-icons/md';
import {GiToken} from 'react-icons/gi';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton';
import { useSelector, useDispatch } from 'react-redux';
import { TokenState, updateTokens } from '../features/tokenSlice';
import { getUserByEmail } from '../API/CoinAPI';
import PopupModal from './PopupModal';

const Account = () => {

    const userTokens = useSelector((state : TokenState) => state.tokens);

    const [showModal, setShowModal] = useState(false);
    const {user, isAuthenticated} = useAuth0();
    const dispatch = useDispatch();


    useEffect(()=>{
        if(user){
            getUserByEmail("https://crypto-betting-app-7iph.onrender.com", user.email).then((user) =>
            {
                //console.log(user.data.tokens);
                dispatch(updateTokens(user.data.tokens));
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user, isAuthenticated])


  return (
    <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-3'>
            <div className='text-blue-300 font-light'>
                {user ? user?.nickname : <LoginButton />}
            </div>
            <div className='text-coal-200 text-2xl'>
                <MdOutlineSettings onClick={()=>{setShowModal(!showModal)}} />
                {showModal ? <PopupModal shown={showModal} toggleShown={setShowModal}/> : <></>}
            </div>
        </div>

        <div className='flex flex-row items-center gap-1 text-coal-200 text-2xl'>
            {
            user ?
            <>
            
            <GiToken /> 
            {userTokens.tokens}
            </>
            : <></>
            }
        </div>
    </div>
  )
}

export default Account