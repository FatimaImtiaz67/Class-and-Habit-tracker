import { useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './SignIn.module.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/MainPage'))
      .catch(() => setError('Invalid credentials.'));
  };

  const resetPassword = () => {
    if (!email) return setError('Please enter your email first.');
    auth.sendPasswordResetEmail(email)
      .then(() => alert('Password reset email sent.'))
      .catch(err => setError(err.message));
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSignIn} className={styles.formBox}>
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? '🔓' : '🔐'}
          </span>
        </div>
        <button type="submit">Sign In</button>
        <p><a href="#" onClick={resetPassword}>Forgot password?</a></p>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
