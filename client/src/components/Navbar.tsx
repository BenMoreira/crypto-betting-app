import React from 'react'
import NavOption from './NavOption'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'

export const Navbar = () => {

  return (
    <nav className='w-[200px] fixed left-0 h-screen bg-coal-900 flex flex-col pt-20 items-center'>
        <div className='flex flex-col gap-8 font-light'>
        {
        ["Dashboard", "Leaderboard", "Cryptos"].map((option) => {
         return <NavOption path={option} key={option}/>
        }) 
        }
        <LoginButton />
        <LogoutButton />
        </div>
    </nav>
  )
}
