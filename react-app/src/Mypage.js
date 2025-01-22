import React, { useState } from 'react';
import './Mypage.css'; // 모달 스타일을 별도 파일에서 관리

function MyPageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    region: '',
    age: '',
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('사용자 정보:', formData);
    alert('정보가 저장되었습니다.');
    handleClose();
  };

  return (
    <div>
      <button onClick={handleOpen}>마이페이지 열기</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>마이페이지</h2>
            <form onSubmit={handleSubmit}>
              {/* 성별 */}
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

              {/* 지역 */}
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

              {/* 나이 */}
              <label>
                나이:
                <input
                  type="number"
                  name="age"
                  placeholder="나이를 입력하세요"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </label>
              <br /><br />

              <button type="submit">저장</button>
              <button type="button" onClick={handleClose} style={{ marginLeft: '10px' }}>
                닫기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPageModal;

