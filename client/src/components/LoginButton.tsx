import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {

    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    //useEffect(()=>{console.log("Is Authenticated : " + isAuthenticated)},[isAuthenticated]);


  return (
    <button onClick={() => loginWithRedirect()} className='w-[50%] text-coal-50 bg-blue-500 py-1 px-4'>Log In</button>
  )
}

export default LoginButton