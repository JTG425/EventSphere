import React, { useEffect, useState } from "react";
import { signUp, verify, signIn } from "../services/dataService";
import "../componentstyles/forms.css";
import { motion, AnimatePresence } from "framer-motion";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const handleShowPassword = () => {
  const x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault(); 
    signUp(username, password, email).then((response) => {
      console.log(response);
      if (response.success === true) {
        setIsVerificationStep(true);
        setMessage("Verification code sent to your email!");
      } else {
        setMessage("Sign up failed, please try again");
      }
    });
  }

  const handleVerification = (event) => {
    event.preventDefault();
    verify(username, code, email).then((response) => {
      console.log(response);
      if (response.success === true) {
        console.log(response);
        setMessage("Verification Successful, You Can Now Sign In");
      } else {
        setMessage("Verification failed, please try again");
      }
    });
  }

  useEffect(() => {
    console.log(username, password, email, code);
  }, [username, password, email, code]);

  return (
    <div className="sign-form">
      <AnimatePresence>
        {!isVerificationStep ? (
          <motion.div
            className="sign-form-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
          >
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                className="show-password-signup"
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  handleShowPassword();
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
                className="submit-button"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="sign-form-2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            <form onSubmit={handleVerification}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Verification Code"
              />
              <motion.button
                className="submit-button"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Verify
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="message-container"
        initial={{ opacity: 0 }}
        animate={message ? { opacity: 1 } : { opacity: 0 }}
        >
        {message && <p>{message}</p>}
        </motion.div>
    </div>
  );
};

export default SignUp;
