import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email.endsWith('@gmail.com')) {
      setError('Please use a @gmail.com email address.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/signin'))
      .catch((err) => setError(err.message));
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSignUp} className={styles.formBox}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? '🔓' : '🔐'}
          </span>
        </div>

        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/signin">Sign In</a></p>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
