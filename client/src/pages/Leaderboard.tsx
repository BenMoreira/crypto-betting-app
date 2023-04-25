import React, { useState, useEffect, Key } from 'react'
import Account from '../components/Account'
import { getAllUsers, getUserWagersByEmail } from '../API/CoinAPI';
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
      let users = result.data as UserType[];
      users.sort((a : any, b : any) => a.tokens < b.tokens ? 1 : -1);
      setUserList(users);
      
    })
  }
  },[user]);

  useEffect(()=>{
    console.log(userList);
  },[userList])
  
  return (
    <div className='bg-coal-800 w-full min-h-screen max-h-full'>
      <div className='flex flex-row justify-between px-10 py-10 text-3xl'>
        <div className='text-blue-300 font-light'>
        Leaderboard
        </div>
        <Account />
      </div>

      <div className='bg-coal-900 mx-10 rounded-xl pb-5'>
        <div className='flex flex-row justify-between m-auto'>
          <div className='text-coal-200 text-2xl p-5 pt-7'>
            Top Earners
          </div>

          <div className='m-5'>
            {/* <input className='bg-coal-700 text-coal-200 text-xl p-3 rounded-xl' placeholder='Search'/> */}
          </div>
        </div>

        {
          //userList ? 
          userList?.map(user =>{
            return <div key={user as unknown as Key} className='bg-coal-700 select-none hover:bg-coal-500 w-100% h-[5vh] border border-coal-400 flex flex-row justify-center items-center text-xl px-5 text-coal-300 hover:text-coal-900 cursor-pointer'
            >{user.email} | {user.tokens?.toString()}</div>
          })
          //:
          //<div>aa</div>
        }
        {/* <div className='bg-coal-800 w-100% h-[20vh] mx-5 rounded-xl'></div> */}



      </div>

      <div className='bg-coal-900 mx-10 rounded-xl pb-5 mt-10'>
        <div className='flex flex-row justify-between'>
          <div className='text-coal-200 text-2xl p-5 pt-7'>
            Worst Earners
          </div>

          <div className='m-5'>
            {/* <input className='bg-coal-700 text-coal-200 text-xl p-3 rounded-xl' placeholder='Search'/> */}
          </div>
        </div>

        <div className='bg-coal-800 w-100% h-[20vh] mx-5 rounded-xl'>
          
        </div>
      </div>
    </div>
  )
}
