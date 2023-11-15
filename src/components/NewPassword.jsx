import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/NewPassword.css'; 

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error occurred while resetting password');
      }

      setMessage('Password has been successfully reset.');
      setTimeout(() => navigate('/join'), 3000); 
    } catch (error) {
      setMessage(error.toString());
    }
  };

  return (
    <div className="new-password-container">
      <form onSubmit={handleSubmit} className="new-password-form">
        <h2>Enter New Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <div className="new-password-message">{message}</div>}
    </div>
  );
};

export default NewPassword;
