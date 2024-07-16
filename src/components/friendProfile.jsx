import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultPFP from "../assets/defaultProfile.png";
import "../componentstyles/friendprofile.css";

function FriendProfile(props) {
    const profileInfo = props.profileInfo;
    const setShowProfile = props.setShowProfile;
  return (
    <motion.div
      className="friend-profile-container"
      initial={{ opacity: 0, display: "none" }}
      animate={{ opacity: 1, display: "flex" }}
      onClick={() => setShowProfile(profileInfo, 0)}
    >
      <motion.div
        className="friend-profile"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
          <img
            src={profileInfo.profilepic === "" ? defaultPFP : profileInfo.profilepic}
            alt="profile"
            className="profile-pic"
          />
          <h3>{profileInfo.name}</h3>
          <motion.button
            className="add-friend-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            Add Friend
            </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default FriendProfile;
