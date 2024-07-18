import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import defaultPFP from "../assets/defaultProfile.png";
import "../componentstyles/friendprofile.css";

function FriendProfile(props) {
    const [sendRequest, setSendRequest] = useState(false);
    const setData = props.setData;
    const profileInfo = props.profileInfo;
    const setShowProfile = props.setShowProfile;
    const userData = props.userData;

    const handleSendFriendRequest = () => {
        setSendRequest(true);
        const data = {
            from: userData.username,
            to: profileInfo.username,
        }
        setData(data, "send-friend-request");
    }

  return (
    <motion.div
      className="friend-profile-container"
      initial={{ opacity: 0, display: "none" }}
      animate={{ opacity: 1, display: "flex" }}
    >
      <motion.div
        className="friend-profile"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          className="close-profile"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowProfile(profileInfo, 0)}
        >
          <IoClose />
        </motion.button> 
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
            onClick={() => handleSendFriendRequest()}
            animate={{ background: sendRequest ? "#079e07" : "#00b4d8", color: sendRequest ? "#dff5df" : "#b7e6eb" }}
            >
              {sendRequest ? "Request Sent" : "Add Friend"}
            </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default FriendProfile;
