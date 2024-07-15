import React, { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { signOut, getCurrentUser } from "./services/cognito";
import { motion, AnimatePresence } from "framer-motion";
import { fetchData } from "./services/dataService";
import { postEditUser } from "./services/dataService";
import defaultPFP from "./assets/defaultProfile.png";
import MenuOptions from "./components/menuOptions";
import Home from "./pages/home";
import Profile from "./pages/profile";
import CreateAccount from "./components/createAccount";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInOrUp, setSignInOrUp] = useState("signUp");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [page, setPage] = useState("home");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCognitoUser(user);
      setIsAuthenticated(true);
      fetchData(user.username, user.sessionToken).then((data) => {
        if (data) {
          console.log("Fetched Data:", data);
          setUserData(data);
          if(data.newUser === "true") {
            setCreateAccount(true);
          }
          if(data.newUser === "false") {
            setCreateAccount(false);
          }
          console.log(data);
        }
        setUserDataLoading(false);
      });
    }
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    setUserData(null);
    setCognitoUser(null);
  };

  const handleSignIn = (user) => {
    setIsAuthenticated(true);
    setCognitoUser(user);
    setPage("home");
    setUserDataLoading(true);
    fetchData(user.username, user.sessionToken).then((data) => {
      if (data) {
        setUserData(data);
        if(data.newUser === "true") {
          setCreateAccount(data.newUser);
        }
      }
      setUserDataLoading(false);
    });
  };


  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleAccountCreated = (data) => {
    setUserData(data);
    console.log(data);
    setCreateAccount(false);
    postEditUser(data).then((response) => {
      console.log(response);
    });
  };

  const menuVariants = {
    show: {
      opacity: 1,
      display: "flex",
      transition: {
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      display: "none",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <BrowserRouter>
      <div className="App">
        <AnimatePresence mode="wait">
          {isAuthenticated ? (
            <>
              {!userDataLoading ? (
                <>
                  <motion.div
                    key="menu-options-div"
                    className="menu-options-container"
                    initial="hide"
                    animate={showMenu ? "show" : "hide"}
                    variants={menuVariants}
                  >
                    <MenuOptions
                      signOut={handleSignOut}
                      setPage={handlePageChange}
                    />
                  </motion.div>
                  {createAccount ? <CreateAccount userData={userData} setDone={handleAccountCreated} /> : null}
                  <motion.div
                    key="home-page"
                    className="page-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="page-header">
                      <motion.img
                        src={userData.profilepic || defaultPFP}
                        alt="profile"
                        className="profile-picture"
                        onClick={() => setShowMenu(!showMenu)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      />
                    </span>
                    <Routes>
                      <Route path="/" element={<Home userData={userData} />} />
                      <Route path="/profile" element={<Profile userData={userData} />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </motion.div>
                </>
              ) : (
                <h1>Loading...</h1>
              )}
            </>
          ) : (
            <>
              <h1>Event Sphere</h1>
              <motion.div
                className="auth-page-container"
                key="auth-container-key"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="auth-container">
                  <div className="auth-toggle">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={
                        signInOrUp === "signUp"
                          ? { background: "rgb(170, 243, 251)" }
                          : { background: "transparent" }
                      }
                      onClick={() => setSignInOrUp("signUp")}
                      className="sign-toggle"
                    >
                      Sign Up
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={
                        signInOrUp === "signIn"
                          ? { background: "rgb(170, 243, 251)" }
                          : { background: "transparent" }
                      }
                      onClick={() => setSignInOrUp("signIn")}
                      className="sign-toggle"
                    >
                      Sign In
                    </motion.button>
                  </div>
                  {signInOrUp === "signUp" ? (
                    <SignUp setIsAuthenticated={handleSignIn} />
                  ) : (
                    <SignIn setIsAuthenticated={handleSignIn} />
                  )}
                </div>
                <div className="circle"></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
