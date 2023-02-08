import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import { Cryptos } from './pages/Cryptos';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './pages/Leaderboard';
import {Navbar} from './components/Navbar';

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!["/Dashboard", "/Leaderboard", "/Cryptos"].includes(location.pathname)){
      navigate("/Dashboard");
    }
  }, [location])

  return (
    <div className='flex flex-row'>
      <Navbar />
      <div className='w-[calc(100vw-200px)] h-screen'>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/cryptos" element={<Cryptos/>}/>
        <Route path="/*" element={<Dashboard/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
