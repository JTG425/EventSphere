// src/components/SignIn.js
import React, { useState } from 'react';
import { signIn } from '../services/dataService';
import '../componentstyles/forms.css';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { motion } from 'framer-motion';




function handleShowPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = props;

  const handleSignIn = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    signIn(user);
  };

  return (
    <div className='sign-form'>
      <motion.div
        className='sign-form-1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -100 }}
        >
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
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className='show-password'
          type="button"
          onClick={() => {
            setShowPassword(!showPassword)
            handleShowPassword()
          }}
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>

        <button className='submit-button' type="submit">Sign In</button>
      </form>
      <p>{message}</p>
      </motion.div>
    </div>
  );
};

export default SignIn;
