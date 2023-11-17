import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import '../styles/form.css';

const Form = ({ formType, onLogin }) => { 
  const [alert, setAlert] = useState({ message: '', type: '', show: false });
  const submitButtonText = formType === 'join' ? 'Join Us' : 'Log In';
  const customText = formType === 'join' ? 'Please Join' : 'Please Log In';
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); 

  const handleCloseAlert = () => setAlert({ ...alert, show: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setAlert({ message: 'Fields must be filled out properly', type: 'error', show: true });
      return;
    }

    const payload = {
      email,
      password,
    };

    // const url = formType === 'join' ? 'http://localhost:3000/auth/signup' : 'http://localhost:3000/auth/login';
    const backendUrl = 'https://gastrographbackend.onrender.com';
    const url = formType === 'join' ? `${backendUrl}/auth/signup` : `${backendUrl}/auth/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      onLogin(data.token);

      navigate('/recipes');  
      emailRef.current.value = '';
      passwordRef.current.value = '';

    } catch (error) {
      setAlert({ message: error.message, type: 'error', show: true });
    }
  };

  return (
    <div className="form-container">
      {alert.show && (
        <div className="alert-modal">
          <div className={`alert ${alert.type}`}>
            <span>{alert.message}</span>
            <button onClick={handleCloseAlert}>Close</button>
          </div>
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <p className="custom-text">{customText}</p>
        <label>
          Email:
          <input ref={emailRef} type="email" name="email" placeholder="Enter your email" />
        </label>
        <label>
          Password:
          <input ref={passwordRef} type="password" name="password" placeholder="Enter your password" />
        </label>
        <button type="submit">{submitButtonText}</button>
        {formType === 'login' && (
          <p className="reset-password-link">
            <Link to="/reset-password">Reset Password</Link>
          </p>
        )}
        {formType === 'join' && (
          <p className="visit-as-guest-link">
            <Link to="/recipes">Continue as Guest</Link>
          </p>
        )}
      </form>
    </div>
  );
};

Form.propTypes = {
  formType: PropTypes.oneOf(['join', 'login']).isRequired,
  onLogin: PropTypes.func.isRequired, 
};

export default Form;
