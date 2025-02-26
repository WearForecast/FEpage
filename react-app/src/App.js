import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Weather from "./components/Weather";
import Mypage from "./components/Mypage";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import "./App.css";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [popupType, setPopupType] = useState(null);
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState({ images: [], description: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("JSON parsing error:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      fetchWeather();
      fetchRecommendations();
    } else {
      localStorage.removeItem("user");
      setRecommendations({ images: [], description: "" });
    }
  }, [user]);

  const fetchWeather = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("로그인이 필요합니다.");
      const response = await fetch("/weather", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("날씨 데이터를 가져오는 데 실패했습니다.");
      setWeather(await response.json());
    } catch (err) {
      console.error("fetchWeather 오류:", err.message);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await fetch("/recommendation", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("추천 데이터를 가져오는 데 실패했습니다.");
      const data = await response.json();
      if (data.images && data.recommendation_summary) {
        setRecommendations({ images: data.images, description: data.recommendation_summary });
      } else {
        console.error("API 응답 데이터 형식이 예상과 다릅니다:", data);
      }
    } catch (error) {
      console.error("추천 데이터 오류:", error.message);
    }
  };

  const openPopup = (type) => setPopupType(type);
  const closePopup = () => setPopupType(null);
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    closePopup();
    fetchWeather();
    fetchRecommendations();
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setWeather(null);
    setRecommendations({ images: [], description: "" });
  };

  return (
    <Router>
      <div className="container">
        <div className="Top">
          <Header />
          <div className="button">
            {user ? (
              <>
                <button className="popup-button" onClick={() => window.location.href = '/mypage'}>
                  <CiUser className="iconuser" />
                </button>
                <button className="popup-button" onClick={handleLogout}>
                  <GoSignOut className="iconsignout" />
                </button>
              </>
            ) : (
              <>
                <button className="popup-button" onClick={() => openPopup("login")}>
                  <GoSignIn className="iconsignin" />
                </button>
                {!user && <button className="popup-button" onClick={() => openPopup("signuppage")}>
                  <CiUser className="iconuser" />
                </button>}
              </>
            )}
          </div>
        </div>
        <Weather weather={weather} fetchWeather={fetchWeather} />
        <Routes>
          <Route path="/" element={<Home recommendations={recommendations} />} />
          <Route path="/mypage" element={<ProtectedRoute user={user}><Mypage user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        </Routes>
        <Login isOpen={popupType === "login"} onClose={closePopup} onLoginSuccess={handleLoginSuccess} />
        {!user && <Signup isOpen={popupType === "signuppage"} onClose={closePopup} />}
      </div>
    </Router>
  );
}

export default App;