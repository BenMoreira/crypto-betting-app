import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const NavOption = ({path} : {path : string}) => {

    const location = useLocation();

    //useEffect(()=>{console.log(location.pathname.slice(1))},[])

  return (
    <Link className={`text-2xl ${location.pathname.slice(1) === path ? "text-blue-300": "text-coal-500"}`} to={"/" + path}>{path}</Link>
  )
}

export default NavOption