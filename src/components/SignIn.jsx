// src/components/SignIn.js
import React, { useState } from 'react';
import { signIn } from '../services/cognito';
import '../componentstyles/forms.css';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setIsAuthenticated } = props;

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signIn(username, password);
      setMessage('Sign in successful!');
        setIsAuthenticated(true);
    } catch (error) {
      setMessage(`Sign in failed: ${error.message}`);
    }
  };

  return (
    <div className='sign-form'>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignIn;
