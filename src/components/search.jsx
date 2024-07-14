// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../pagestyles/home.css';

function SearchBar(props) {
    const userData = props.userData;


  return (
    <div className="home-container">
        <div className="events-container">
                <h1>Hello {userData.username}</h1>
        </div>
    </div>
  );
}

export default SearchBar;
