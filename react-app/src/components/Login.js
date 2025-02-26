import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import popupStyles from "../Loginstyle.js";

function Login({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
  
      console.log("🔹 로그인 성공, 응답 데이터:", response.data); // 응답 데이터 확인
  
      const token = response.data.accessToken; // ✅ accessToken 사용
      if (!token) {
        throw new Error("서버에서 토큰을 받지 못했습니다.");
      }
  
      localStorage.setItem("token", token); // ✅ 저장 시 accessToken 사용
      localStorage.setItem("user", JSON.stringify(response.data.user || {})); // 사용자 정보 저장 (없을 수도 있음)
  
      console.log("✅ 저장된 토큰:", localStorage.getItem("token")); // 토큰 저장 확인
  
      onLoginSuccess(response.data.user || {}); // 로그인 성공 콜백
      onClose(); // 로그인 창 닫기
    } catch (error) {
      console.error("🚨 로그인 오류:", error.message);
      setError(error.response?.data?.message || "로그인 실패. 다시 시도해주세요.");
    }
  };
  
  

  return (
    <div style={popupStyles.overlay} onClick={handleOverlayClick}>
      <div style={popupStyles.popup}>
        <div style={popupStyles.header} className="loginHeader">
          <h2>WearForecast</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={popupStyles.formGroup}>
            <label style={popupStyles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={popupStyles.input}
              required
            />
          </div>
          <div style={popupStyles.formGroup}>
            <label style={popupStyles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={popupStyles.input}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={popupStyles.formGroup}>
            <button type="submit" style={popupStyles.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

