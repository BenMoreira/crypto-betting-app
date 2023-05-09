import React, { useState, useEffect, Key } from 'react'
import Account from '../components/Account'
import { getAllUsers } from '../API/CoinAPI';
import { useAuth0 } from '@auth0/auth0-react';

type UserType = {
  email : String,
  password: String,
  tokens : number,
  userID : String,
}

export const Leaderboard = () => {

  const [userList, setUserList] = useState<UserType[]>();
  const {user} = useAuth0();

  useEffect(() => {
    if(user){
    getAllUsers("http://localhost:3001").then(result =>{
      if(result.data){
      let users = result.data as UserType[];
      users.sort((a : any, b : any) => a.tokens < b.tokens ? 1 : -1);
      setUserList(users);
      }
      
    })
  }
  },[user]);

  useEffect(()=>{
    //console.log(userList);
  },[userList])
  
  return (
    <div className='bg-coal-950 w-full min-h-screen max-h-full'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Leaderboard
        </div>
        <Account />
      </div>

      <div className='mx-10 rounded-xl pb-5'>
        <div className='flex flex-row justify-between w-10/12 mx-auto text-2xl items-center 
        text-coal-200 bg-coal-925 py-2 px-5 text-center rounded-t-2xl'>
              <div className='w-1/4 text-left'>User</div>
              <div className='w-1/3 text-left'>Tokens</div>
        </div>

        {
          userList?.map(user =>{
            return (
              <div key={user.email as unknown as React.Key} className='flex flex-row justify-between w-10/12 text-2xl font-light items-center bg-coal-900 
              text-coal-200 py-2 px-5 text-center mx-auto overflow-y-scroll max-h-[60vh]'>
                <div  className='w-1/4 text-left'>
                  {user.email}
                </div>
                <div className='w-1/3 text-left'>
                  {user?.tokens}
                </div>
              </div>
          )})
        }
      </div>
    </div>
  )
}