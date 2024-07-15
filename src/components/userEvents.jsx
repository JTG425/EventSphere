// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../pagestyles/home.css";

function UserEvents(props) {
  const userData = props.userData;

  return (
    <div className="events-container">
      <h1>Hello {userData.username}</h1>
    </div>
  );
}

export default UserEvents;
