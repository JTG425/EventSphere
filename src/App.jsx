import React, { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { signOut, getCurrentUser } from "./services/cognito";
import { motion, AnimatePresence } from "framer-motion";

import { fetchData } from "./services/dataService";
import { fetchUserList } from "./services/dataService";
import { postEditUser } from "./services/dataService";
import { postNewEvent } from "./services/dataService";

import defaultPFP from "./assets/defaultProfile.png";
import MenuOptions from "./components/menuOptions";
import Home from "./pages/home";
import SearchBar from "./components/search";
import Profile from "./pages/profile";
import CreateAccount from "./components/createAccount";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInOrUp, setSignInOrUp] = useState("signUp");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [page, setPage] = useState("home");
  const [userList, setUserList] = useState(null);



  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
    setUserData(null);
    setCognitoUser(null);
  };

  const handleSignIn = (user) => {
    setCognitoUser(user);
    setPage("home");
    if (user) {
      setCognitoUser(user);
      setUserDataLoading(true);
      setIsAuthenticated(true);
      fetchData(user.username, user.sessionToken).then((data) => {
        if (data) {
          console.log("Fetched Data:", data);
          setUserData(data.userData);
          if(data.userData.newUser === "true") {
            setCreateAccount(true);
          }
          if(data.userData.newUser === "false") {
            setCreateAccount(false);
          }
          console.log(data.userData);
        }
        setUserDataLoading(false);
      });
      fetchUserList(user.username, user.sessionToken).then((data) => {
        setUserList(data);
        console.log(userList);
      });
    }
  };

  const handleSignUp = (user) => {
    setCognitoUser(user);
    setPage("home");
    if (user) {
      setCognitoUser(user);
      setUserDataLoading(true);
      fetchData(user.username).then((data) => {
        if (data) {
          console.log("Fetched Data:", data);
          setUserData(data.userData);
          if(data.userData.newUser === "true") {
            setCreateAccount(true);
          }
          if(data.userData.newUser === "false") {
            setCreateAccount(false);
          }
          console.log(data.userData);
        }
        setUserDataLoading(false);
        setIsAuthenticated(true);
      });
      fetchUserList(user.username, user.sessionToken).then((data) => {
        setUserList(data);
      });
    }
  };


  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleAccountCreated = (data) => {
    setUserData(data);
    postEditUser(data).then((response) => {
      setCreateAccount(false);
    });
  };

  const menuVariants = {
    show: {
      opacity: 1,
      y: 0,
      display: "flex",
      transition: {
        duration: 0.5,
      },
    },
    hide: {
      y: -100,
      opacity: 0,
      display: "none",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const handlePosting = (data, command) => {
    switch (command) {
      case "create-event":
        postNewEvent(data).then((response) => {
          console.log(response);
          refreshUserData();
        });
        break;
      case "edit-user":
        postEditUser(data);
        break;
      default:
        console.log("No command given");
      break
    }
  };

  const refreshUserData = () => {
    setRefreshing(true);
    fetchData(cognitoUser.username, cognitoUser.sessionToken).then((data) => {
      if (data) {
        setUserData(data.userData);
        // setRefreshing(false);
      }
    });
  }

  useEffect(() => {
    console.log(userList);
  }, [userList]);

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
                      showMenu={handleToggleMenu}
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
                      <SearchBar userList={userList} />
                      <motion.img
                        src={userData.profilepic === "" || userData === null ? defaultPFP : userData.profilepic}
                        alt="profile"
                        className="profile-picture"
                        onClick={() => handleToggleMenu()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      />
                    </span>
                    <Routes>
                      <Route path="/" element={<Home userData={userData} setData={handlePosting} />} />
                      <Route path="/profile" element={<Profile userData={userData} setData={handlePosting} />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </motion.div>
                </>
              ) : (
                <DotLoader color={"#00b4d8"} loading={true} size={50} />
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
                    <SignUp setIsAuthenticated={handleSignUp} />
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
