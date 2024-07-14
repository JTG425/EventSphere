import React, { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { signOut, getCurrentUser } from "./services/cognito";
import { motion, AnimatePresence } from "framer-motion";
import defaultPFP from "./assets/defaultProfile.png";
import MenuOptions from "./components/menuOptions";
import Home from "./pages/home";
import Profile from "./pages/profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

async function fetchData(username, sessionToken) {
  const url = "http://127.0.0.1:8000/eventsphere/retrieve-data/";
  const data = {
    username: username,
    sessionToken: sessionToken,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log(JSON.parse(jsonResponse));
    return JSON.parse(jsonResponse);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInOrUp, setSignInOrUp] = useState("signUp");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState("home");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCognitoUser(user);
      setIsAuthenticated(true);
      fetchData(user.username, user.sessionToken).then((data) => {
        if (data) {
          setUserData(data);
        }
        setUserDataLoading(false);
      });
    } else {
      setUserDataLoading(false);
    }
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    setCognitoUser(null);
  };

  const handleSignIn = (user) => {
    setIsAuthenticated(true);
    setCognitoUser(user);
    setPage("home");
    setUserDataLoading(true); // Set loading state to true when signing in
    fetchData(user.username, user.sessionToken).then((data) => {
      if (data) {
        setUserData(data);
      }
      setUserDataLoading(false);
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
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
                    <SignUp />
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
