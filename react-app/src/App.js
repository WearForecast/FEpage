import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Mypage from './Mypage';
import { GoSignIn } from "react-icons/go";
import './App.css';

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  return (
    <Router>
      <div className='container'>
        <Header />
        <button className="popup-button" onClick={openPopup}>
          <GoSignIn className="iconsignin" />
        </button>
        <div className="weather-info">
          <h1 className="weather-title">날씨 정보</h1>
          {/* 여기에 날씨 정보가 동적으로 들어갑니다 */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <Login isOpen={isPopupOpen} onClose={closePopup} />
      </div>
    </Router>
  );
}

export default App;
