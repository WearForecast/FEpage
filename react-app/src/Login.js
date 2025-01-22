import React from 'react';
import './App.css';

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
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '350px',
    height: '400px',
    textAlign: 'center',
  },
  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.4rem',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'block',
    marginRight: '25px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    height: '45px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginLeft: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '1.4rem',
    textAlign: 'left',
    marginLeft: '15px',
  },
  submit: {
    width: '100%',
    backgroundColor: '#10F',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.4rem',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '15px',
  },
  // forgotPassword: {
  //   textAlign: 'right',
  //   width: '100%',
  //   marginTop: '20px',
  //   right: '30px',
  //   cursor: 'pointer',
  //   color: '#ccc',
  //   textDecoration: 'underline',
  // },
};

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
        <div style={popupStyles.header}>
          <h2>Sign in / Sign up</h2>
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