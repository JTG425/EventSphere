// src/App.js
import React, { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { signOut } from "./services/cognito";
import { motion, AnimatePresence } from "framer-motion";
import defaultPFP from "./assets/defaultProfile.png";
import MenuOptions from "./components/menuOptions";
import Home from "./pages/home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInOrUp, setSignInOrUp] = useState("signUp");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState("home");

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };


  const menuVariants = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },

    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <>
        <motion.div
          key="menu-options-div"
          className="menu-options-container"
          initial="hide"
          animate={showMenu ? "show" : "hide"}
          variants={menuVariants}
          >
            <MenuOptions signOut={handleSignOut} />
          </motion.div>
        <motion.div
          key="home-page"
          className="page-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="page-header">
            <motion.img
              src={defaultPFP}
              alt="profile"
              className="profile-picture"
              onClick={() => setShowMenu(!showMenu)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          </span>
          {page === "home" ? (
            <Home />
          ) : (
            <h1>Page not found</h1>
          )}
        </motion.div>
        </>
        
      ) : (
        <motion.div 
        className="auth-page-container"
        key="auth-container-key"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <div
          className="auth-container"
        >
          <div className="auth-toggle">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={signInOrUp === "signUp" ? { background: "rgb(170, 243, 251)" } : { background: "transparent" }}
              onClick={() => setSignInOrUp("signUp")}
              className="sign-toggle"
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={signInOrUp === "signIn" ? { background: "rgb(170, 243, 251)" } : { background: "transparent" }}
              onClick={() => setSignInOrUp("signIn")}
              className="sign-toggle"
            >
              Sign In
            </motion.button>
          </div>
          {signInOrUp === "signUp" ? (
            <SignUp />
          ) : (
            <SignIn setIsAuthenticated={handleSignIn} />
          )}
        </div>
        <div className="circle"></div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

export default App;
