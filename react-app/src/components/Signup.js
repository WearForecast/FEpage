import React, { useState } from 'react';
import '../Signup.css'; // 모달 스타일을 별도 파일에서 관리
import { GrClose } from "react-icons/gr";
import axios from 'axios'; // Axios 임포트

function SignUpModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthyear: '',
    region: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, email, password, birthyear, region, gender } = formData;
    if (!name || !email || !password || !birthyear || !region || !gender) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('유효한 이메일을 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    const birthYearNumber = Number(birthyear);
    if (isNaN(birthYearNumber) || birthYearNumber < 1900 || birthYearNumber > new Date().getFullYear()) {
      alert('유효한 출생 연도를 입력하세요.');
      return;
    }

    try {
      const response = await axios.post('/auth/sign-up', {
        name,
        email,
        password,
        birthyear: birthYearNumber,
        region,
        gender,
      });

      if (response.status >= 200 && response.status < 300) {
        alert('회원가입이 완료되었습니다.');
        onClose();
      } else {
        throw new Error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);

      if (error.response) {
        alert(`회원가입 실패: ${error.response.data.message || '알 수 없는 오류'}`);
      } else if (error.request) {
        alert('서버 응답이 없습니다. 네트워크 상태를 확인해주세요.');
      } else {
        alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="userheader">
          <h2>회원가입</h2>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            <GrClose />
          </button>
        </div>

        <form onSubmit={handleSignUp}>
          <label>
            이름:
            <input
              type="text"
              name="name"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br /><br />

          <label>
            이메일:
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br /><br />

          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br /><br />

          <label>
            출생 연도:
            <input
              type="number"
              name="birthyear"
              placeholder="출생 연도를 입력하세요 (예: 2000)"
              value={formData.birthyear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </label>
          <br /><br />

          <label>
            성별:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              <option value="남">남</option>
              <option value="여">여</option>
              <option value="무관">무관</option>
            </select>
          </label>
          <br /><br />

          <label>
            지역:
            <input
              type="text"
              name="region"
              placeholder="지역을 입력하세요"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </label>
          <br /><br />

          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
