import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {

    const { logout, user, isAuthenticated } = useAuth0();

    //useEffect(()=>{console.log("Is Authenticated : " + isAuthenticated)},[isAuthenticated]);


  return (
    <button onClick={() => logout()} className='text-coal-300'>Log Out</button>
  )
}

export default LogoutButton