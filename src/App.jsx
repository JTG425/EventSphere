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
import { postFriendRequest } from "./services/dataService";
import {decideFriendRequest} from "./services/dataService";

import defaultPFP from "./assets/defaultProfile.png";
import MenuOptions from "./components/menuOptions";
import Home from "./pages/home";
import SearchBar from "./components/search";
import Profile from "./pages/profile";
import CreateAccount from "./components/createAccount";
import Inbox from "./components/inbox";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { FaRegBell } from "react-icons/fa";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInOrUp, setSignInOrUp] = useState("signIn");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [page, setPage] = useState("home");
  const [userList, setUserList] = useState(null);
  const [showInbox, setShowInbox] = useState(false);



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
        if (data !== false) {
          console.log("Fetched Data:", data);
          setUserData(data.userData);
          if(data.userData.newUser === "true") {
            setCreateAccount(true);
          }
          if(data.userData.newUser === "false") {
            setCreateAccount(false);
          }
          setUserDataLoading(false);
        } else {
          // Try Again If Missed
          handleSignIn(user);
        }
      });
      fetchUserList("none", "none").then((data) => {
        setUserList(data);
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
        if (data !== false) {
          console.log("Fetched Data:", data);
          setUserData(data.userData);
          if(data.userData.newUser === "true") {
            setCreateAccount(true);
          }
          if(data.userData.newUser === "false") {
            setCreateAccount(false);
          }
          console.log(data.userData);
          setUserDataLoading(false);
          setIsAuthenticated(true);
        } else {
          // Try Again If Missed
          handleSignUp(user);
        }
      });
      fetchUserList("none", "none").then((data) => {
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
        postEditUser(data).then((response) => {
          refreshUserData();
        });
        break;
      case "send-friend-request":
        postFriendRequest(data).then((response) => {
          refreshUserData();
        });
        break;
      case "decide-friend-request":
        decideFriendRequest(data).then((response) => {
          refreshUserData();
        });
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
        console.log("Refreshed Data:", data);
      }
    });
  }


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
                      <SearchBar userList={userList} userData={userData} handlePosting={handlePosting} />
                      <div className="notification-container">
                        <span className="notification-count">{userData.inbox === null ? 0 : userData.inbox.length}</span>
                      <button className="notification-button" onClick={() => setShowInbox(!showInbox)}>
                      <FaRegBell className="notification-icon" 
                        style={{
                          cursor: "pointer",
                          fontSize: "1.25rem",
                          marginRight: "1rem",
                        }}
                       />
                       </button>
                      <Inbox userData={userData} showInbox={showInbox} handlePosting={handlePosting} />

                      </div>
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
                        signInOrUp === "signIn"
                          ? { background: "#aaf3fb" }
                          : { background: "#fbfcfc" }
                      }
                      onClick={() => setSignInOrUp("signIn")}
                      className="sign-toggle"
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={
                        signInOrUp === "signUp"
                          ? { background: "#aaf3fb" }
                          : { background: "#fbfcfc" }
                      }
                      onClick={() => setSignInOrUp("signUp")}
                      className="sign-toggle"
                    >
                      Sign Up
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
