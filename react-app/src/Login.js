import React from 'react';
import './App.css';

function Login({ isOpen, onClose }) {
  if (!isOpen) return null; // 팝업이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <h2>Login</h2>
        <form>
          <div>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={onClose} style={popupStyles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}

const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default Login;
