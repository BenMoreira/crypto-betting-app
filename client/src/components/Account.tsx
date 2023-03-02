import React, {useEffect, useState} from 'react'
import {MdOutlineSettings} from 'react-icons/md';
import {GiToken} from 'react-icons/gi';
import { useAuth0 } from "@auth0/auth0-react";
import { MongoClient } from 'mongodb';

const Account = () => {

    const [tokens, setTokens] = useState<Number>(0);

    const {user, isAuthenticated} = useAuth0();


    useEffect(()=>{
        if(isAuthenticated){
            setTokens(100);
        }
    },[isAuthenticated, user])


  return (
    <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-3'>
            <div className='text-blue-300 font-light'>
                {user?.nickname}
            </div>
            <div className='text-coal-500 text-2xl'>
                <MdOutlineSettings />
            </div>
        </div>

        <div className='flex flex-row items-center gap-1 text-coal-200 text-2xl'>
            <>
            <GiToken /> 
            {tokens}
            </>
        </div>
    </div>
  )
}

export default Account