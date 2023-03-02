import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {

    const { loginWithRedirect, user, isAuthenticated } = useAuth0();

    useEffect(()=>{console.log(isAuthenticated)},[isAuthenticated]);


  return (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  )
}

export default LoginButton