// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import "../pagestyles/createaccount.css";

function CreateAccount(props) {
  const userData = props.userData;
  const setDone = props.setDone;
  const [name, setName] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [setupStep, setSetupStep] = useState(1);

  const handleName = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    setName(name);
    setSetupStep(2);
    console.log(setupStep);
    console.log(`Name entered: ${name}`);
  };

  const handlePfp = (event) => {
    event.preventDefault();
    const data = userData;
    data.newUser = "false";
    data.name = name;
    data.profilepic = profilepic;
    setDone(data);
  };

  return (
    <motion.div
      className="create-account-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="create-account-background"
        key="create-account-background"
        >
      <AnimatePresence mode="wait">
      {setupStep === 1 ? (
        <motion.div
          className="create-account"
          key="create-account-1"
          initial={{ x: 0 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <h1>Welcome</h1>
          <p>What is your name?</p>
          <form onSubmit={handleName}>
            <input id="name" name="name" type="text" placeholder="Name"></input>
            <button type="submit">
              <FaArrowRight />
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="create-account"
          key="create-account-2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <h1>Hello {name}</h1>
          <p>Set a Profile Picture?</p>
          <form onSubmit={handlePfp}>
            <input
              id="profilepic"
              name="name"
              type="text"
              placeholder="to be implemented"
            ></input>
            <button type="submit">
              <FaArrowRight />
            </button>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default CreateAccount;
