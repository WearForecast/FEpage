import React, { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mypage({ user, onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", birthyear: "", region: "", gender: "" });
  const navigate = useNavigate();

  useEffect(() => { if (user) fetchUserInfo(); }, [user]);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("인증 토큰이 없습니다. 로그인 상태를 확인하세요.");
      const response = await ("/users/profile", {
        method: "PATCH", headers: { Authorization: `Bearer ${token}` } });
      setUserInfo(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
      if (error.response && error.response.status === 401) {
        console.error("401 Unauthorized: 인증 토큰이 없거나 유효하지 않습니다. 다시 로그인해 주세요.");
      }
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("인증 토큰이 없습니다. 로그인 상태를 확인하세요.");
      await axios.patch("/api/user/profile", formData, { headers: { Authorization: `Bearer ${token}` } });
      alert("정보가 성공적으로 수정되었습니다.");
      setIsEditing(false);
      fetchUserInfo();
    } catch (error) {
      console.error("정보 수정 중 오류 발생:", error);
      if (error.response && error.response.status === 401) {
        console.error("401 Unauthorized: 인증 토큰이 없거나 유효하지 않습니다. 다시 로그인해 주세요.");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="userheader">
          <h2>마이페이지</h2>
          <button onClick={() => navigate(-1)}><GrClose /></button>
        </div>
        {userInfo ? (
          isEditing ? (
            <div>
              <label>이름: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
              <label>출생 연도: <input type="number" name="birthyear" value={formData.birthyear} onChange={handleChange} /></label>
              <label>지역: <input type="text" name="region" value={formData.region} onChange={handleChange} /></label>
              <label>성별: <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="남">남</option>
                <option value="여">여</option>
                <option value="무관">무관</option>
              </select></label>
              <button onClick={handleSave}>저장</button>
              <button onClick={() => setIsEditing(false)}>취소</button>
            </div>
          ) : (
            <div>
              <p><strong>이름:</strong> {userInfo.name}</p>
              <p><strong>이메일:</strong> {userInfo.email}</p>
              <p><strong>출생 연도:</strong> {userInfo.birthyear}</p>
              <p><strong>지역:</strong> {userInfo.region}</p>
              <p><strong>성별:</strong> {userInfo.gender}</p>
              <button onClick={() => setIsEditing(true)}>정보 수정</button>
            </div>
          )
        ) : (<p>로딩 중...</p>)}
      </div>
    </div>
  );
}

export default Mypage;
