import { useState } from 'react';
import '../styles/resetPassword.css'; 

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const backendUrl = 'https://gastrographbackend.onrender.com'; 

try {
    const response = await fetch(`${backendUrl}/auth/request-reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error occurred while sending reset link');
      }

      setMessage('Reset link sent! Please check your email.');
      setEmail(''); 
    } catch (error) {
      setMessage(error.toString());
    }
  };

  return (
    <div className="reset-password-container" style={{ position: 'relative' }}>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="reset-password-message">{message}</p>}
    </div>
  );  
};

export default ResetPassword;
