// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserEvents from "../components/userEvents";
import CreateEvent from "../components/createEvent";
import "../pagestyles/home.css";

function Home(props) {
  const userData = props.userData;
  const setData = props.setData;
  const setSearch = props.handleSearch;
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleShowCreateEvent = () => {
    setShowCreateEvent(!showCreateEvent);
  }

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Hello {userData.username}</h1>
        <motion.button
          className="create-event-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleShowCreateEvent()}
        >
          Create Event
        </motion.button>
      </div>
        <UserEvents userData={userData} setData={setData} />
        {showCreateEvent && <CreateEvent userData={userData} setShowCreateEvent={handleShowCreateEvent} setData={setData}  />}
    </div>
  );
}

export default Home;
