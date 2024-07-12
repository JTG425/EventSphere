// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../componentstyles/menu.css';

function MenuOptions(props) {


  return (
    <div className="menu-options">
        <motion.button 
            className="menu-option"
            onClick={props.signOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
                Sign Out
        </motion.button>
    </div>
  );
}

export default MenuOptions;
