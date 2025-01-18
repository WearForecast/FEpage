import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Mypage from './Mypage';
import LoginPopup from './Login'; 
import './App.css';

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false); // 로그인 팝업 상태 관리

  const openPopup = () => setPopupOpen(true);  // 팝업 열기
  const closePopup = () => setPopupOpen(false); // 팝업 닫기

  return (
    <Router>
      <Header />
      <button onClick={openPopup}>Login</button> {/* 로그인 버튼 클릭 시 팝업 열림 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <LoginPopup isOpen={isPopupOpen} onClose={closePopup} />
    </Router>
  );
}

export default App;
