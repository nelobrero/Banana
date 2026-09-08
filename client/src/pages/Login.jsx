import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ username, password });
      loginUser(data);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
      <h1 className="login-title">Banana</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red', fontFamily: 'var(--font-family)', textAlign: 'center' }}>{error}</p>}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
         <p className="signup-text">
        Don't have an account? 
      </p>
      <button className="login-btn" onClick={() => navigate('/signup')}>
        Sign Up
      </button>
      </form>
      
     </div>
    </div>
  );
}
