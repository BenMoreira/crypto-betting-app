import React, {ReactElement, useEffect} from 'react'
import { IconType } from 'react-icons';
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavOption = ({path, Icon} : {path : string, Icon : IconType}) => {

    const location = useLocation();

    //useEffect(()=>{console.log(location.pathname.slice(1))},[])

  return (
    <Link className={`text-2xl ${location.pathname.slice(1) === path ? "text-blue-300": "text-coal-500"}`} to={"/" + path}>
      <div className='flex gap-2 items-center'><Icon className={`text-2xl ${location.pathname.slice(1) === path ? "text-blue-400": "text-coal-500"}`}/>{path}</div></Link>
  )
}

export default NavOption