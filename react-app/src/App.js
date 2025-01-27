import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Mypage from './components/Mypage';
import { GoSignIn } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import DataDisplay from "./components/DataDisplay";
import './App.css';

function App() {
  const [popupType, setPopupType] = useState(null);

  const openPopup = (type) => setPopupType(type);
  const closePopup = () => setPopupType(null);

  return (
    <Router>
      <div className='container'>
        <div className='Top'>
        <Header />
        <div className='button'>
          <button className="popup-button" onClick={() => openPopup('login')}>
            <GoSignIn className="iconsignin" />
          </button>
          <button className="popup-button" onClick={() => openPopup('mypage')}>
            <CiUser className="iconuser" />
          </button>
        </div>
        </div>
        <div className="weather-info">
          <h1 className="weather-title">날씨 정보</h1>
          {/* 여기에 날씨 정보가 동적으로 들어갑니다 */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Login isOpen={popupType==='login'} onClose={closePopup} />
        <Mypage isOpen={popupType==='mypage'} onClose={closePopup} />
      </div>
    </Router>
  );
}

export default App;
