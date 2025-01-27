import React from 'react';
import '../App.css';
import popupStyles from '../Loginstyle.js'

function Login({ isOpen, onClose }) {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={popupStyles.overlay} onClick={handleOverlayClick}>
      <div style={popupStyles.popup}>
        <div style={popupStyles.header} className='loginHeader'>
          <h2>WearForecast</h2>
        </div>
        <form>
          <div style={popupStyles.formGroup}>
            <label style={popupStyles.label}>
              Email:
            </label>
            <input type="email" name="email" style={popupStyles.input} />
          </div>
          <div style={popupStyles.formGroup}>
            <label style={popupStyles.label}>
              Password:
            </label>
            <input type="password" name="password" style={popupStyles.input} />
          </div>
          <div style={popupStyles.formGroup}>
            <button type="submit" style={popupStyles.submit}>
              Submit
            </button>
          </div>
          {/* <div style={popupStyles.forgotPassword}>
            Forgot password?
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Login;