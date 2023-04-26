import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import { Cryptos } from './pages/Cryptos';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './pages/Leaderboard';
import {Navbar} from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useAuth0();

  // useEffect(()=>{
  //   if(!["/Dashboard", "/Leaderboard", "/Cryptos"].includes(location.pathname)){
  //     navigate("/Dashboard");
  //   }
  // }, [location])

  return (
    <div className='flex flex-row'>
      <Navbar />
      <div className='w-[calc(100vw-200px)] ml-[200px] h-full'>
      {
        user ? 
        <Routes>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/cryptos" element={<Cryptos/>}/>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/*" element={<Dashboard/>}/>
        </Routes>
        :
        <Login/>
      }
      </div>
    </div>
  );
}

export default App;
