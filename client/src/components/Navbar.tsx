import React from 'react'
import NavOption from './NavOption'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import {RiDashboardFill} from 'react-icons/ri'
import { IconType } from 'react-icons'
import { AiOutlineStock } from 'react-icons/ai'
import { IoMdList} from 'react-icons/io'

export const Navbar = () => {

  const {user}= useAuth0();

  return (
    <nav className='w-[200px] fixed left-0 h-screen bg-coal-900 flex flex-col pt-20 items-center'>
        <div className='flex flex-col gap-8 font-light'>
        {
        ["Dashboard", "Leaderboard", "Cryptos"].map((option) => {
         return <NavOption path={option} key={option} Icon={option === "Dashboard" ? RiDashboardFill : option === "Leaderboard" ? IoMdList : AiOutlineStock}/>
        }) 
        }
        {
        user ? <LogoutButton /> : <></>
        }
        </div>
    </nav>
  )
}
