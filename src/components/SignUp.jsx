// src/components/SignUp.js
import React, { useState } from 'react';
import { signUp, confirmSignUp } from '../services/cognito';
import '../componentstyles/forms.css';
import {motion} from 'framer-motion';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { postSignUp } from '../services/dataService';

function handleShowPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}



const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {setIsAuthenticated} = props;

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const attributeList = [
        {
          Name: 'email',
          Value: email,
        },
      ];
      await signUp(username, password, attributeList);
      setMessage('Sign up successful! Please check your email for the verification code.');
      setIsVerificationStep(true);
    } catch (error) {
      setMessage(`Sign up failed: ${error.message}`);
    }
  };

  const handleConfirmSignUp = async (event) => {
    event.preventDefault();
    try {
      await confirmSignUp(username, verificationCode);
      setMessage('Verification successful! You can now sign in.');
      postSignUp(username, email);
      setIsVerificationStep(false);
      setIsAuthenticated({username});
    } catch (error) {
      setMessage(`Verification failed: ${error.message}`);
    }
  };

  return (
    <div className='sign-form'>
      {!isVerificationStep ? (
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
          className='show-password-signup'
          type="button"
          onClick={() => {
            setShowPassword(!showPassword)
            handleShowPassword()
          }}
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <motion.button 
            className='submit-button'
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >Sign Up</motion.button>
        </form>
      ) : (
        <form onSubmit={handleConfirmSignUp}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
          />
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >Verify</motion.button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
};

export default SignUp;
