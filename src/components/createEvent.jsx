// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../componentstyles/createevent.css";

function CreateEvent(props) {
  const userData = props.userData;
  const setShowCreateEvent = props.setShowCreateEvent;

  return (
    <div
      className="create-event-container"
    >
      <div className="create-form-container">
        <h1>Create Event</h1>
        <form>
            <input
              type="text"
              id="eventname"
              name="eventname"
              placeholder="Name"
            ></input>
            <input
              type="date"
              id="eventdate"
              name="eventdate"
              placeholder={new Date()}
            ></input>
            <input type="time" id="eventtime" name="eventtime"></input>
            <input
              type="text"
              id="eventlocation"
              name="eventlocation"
              placeholder="Location"
            ></input>
          <textarea
            type="textarea"
            id="eventdescription"
            name="eventdescription"
            placeholder="description"
          ></textarea>
          <motion.button
            className="create-event-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateEvent()}
          >
            Create Event
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
