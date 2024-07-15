import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../pagestyles/profile.css";
import { MdEdit } from "react-icons/md";


function Profile(props) {
  const userData = props.userData;
  console.log(userData);

  return (
    <>
      <h1>Hello {userData.username}</h1>
      <div className="profile-container">
        <motion.div className="profile-info">
        <motion.img
          src={userData.profilepic}
          alt="Profile Picture"
          className="edit-pfp"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
        <motion.div
          className='pfp-overlay'
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MdEdit />
        </motion.div>
        </motion.div>
        <motion.div
          className="profile-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2>Friends</h2>
        </motion.div>
        <motion.div
          className="profile-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <form>
          <span className="in-line">
              <label htmlFor="username">Name </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
              />
            </span>
            <span className="in-line">
              <label htmlFor="username">Username </label>
              <input
                id="username"
                type="text"
                placeholder={userData.username}
              />
            </span>
            <span className="in-line">
              <label htmlFor="email">Email </label>
              <input id="email" type="email" placeholder={userData.email} />
            </span>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Profile;
