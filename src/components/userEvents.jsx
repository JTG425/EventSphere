// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import "../componentstyles/events.css";

function UserEvents(props) {
  const [showEvent, setShowEvent] = useState(false);
  const [eventIndex, setEventIndex] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const userData = props.userData;
  const setData = props.setData;
  const createdEvents = userData.createdEvents || [];
  const acceptedEvents = userData.acceptedEvents || [];
  const pendingEvents = userData.pendingEvents || [];
  const declinedEvents = userData.declinedEvents || [];

  const handleExpandEvent = (index) => {
    setShowEvent(!showEvent);
    setEventIndex(index);
  };

  const handleDateFormatter = (date) => {
    const dateArray = date.split("-");
    const month = dateArray[1];
    const day = dateArray[2];
    const year = dateArray[0];
    return `${month} / ${day} / ${year}`;
  };

  const handleTimeFormatter = (time) => {
    const timeArray = time.split(":");
    const hour = parseInt(timeArray[0]);
    const minute = timeArray[1];
    if (hour > 12) {
      return `${hour - 12}:${minute} PM`;
    } else {
      return `${hour}:${minute} AM`;
    }
  };

  const handleDeleteEvent = (event) => {
    setConfirmDelete(true)
    setDeletePopup(false)
    setShowEvent(false)
    const data = {
      username: userData.username,
      eventToDelete: event.eventid,
    }
    setData(data, "delete-event");
  }

  const confirmationVariants = {
    showConfirm: {
      opacity: 1,
      y: 0,
    },
    hideConfirm: {
      opacity: 0,
      y: 100,
    },
  };

  return (
    <div className="events-container">
      <div className="events-box">
        <h2>My Events</h2>
        {createdEvents.length > 0 ? (
          <div className="events-row">
            <motion.div
              className="epanded-event-background"
              initial={{ opacity: 0, display: "none" }}
              animate={
                showEvent
                  ? { opacity: 1, display: "flex" }
                  : { opacity: 0, display: "none" }
              }
            >
              <motion.div
                className="epanded-event"
                initial={{ opacity: 0, y: 100 }}
                animate={
                  showEvent ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
                }
                exit={{ opacity: 0, y: 100 }}
              >
                {showEvent && (
                  <motion.div
                    className="expanded-event"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.button
                      className="close-event-button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowEvent(false)}
                    >
                      <IoClose />
                    </motion.button>
                    <img
                      src={createdEvents[eventIndex].eventimage}
                      alt="Event"
                    />
                    <h3>{createdEvents[eventIndex].eventname}</h3>
                    <p>
                      <b>Date:</b>{" "}
                      {handleDateFormatter(createdEvents[eventIndex].eventdate)}
                    </p>
                    <p>
                      <b>Time:</b>{" "}
                      {handleTimeFormatter(createdEvents[eventIndex].eventtime)}
                    </p>
                    <p>
                      <b>Where:</b> {createdEvents[eventIndex].eventlocation}
                    </p>
                    <p>{createdEvents[eventIndex].eventdescription}</p>
                    <span className="edit-delete-buttons">
                      <motion.button
                        className="edit-event-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MdEdit />
                      </motion.button>
                      <motion.button
                        className="delete-event-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setDeletePopup(true);
                        }}
                      >
                        <TiDelete />
                      </motion.button>
                    </span>
                    <motion.div
                      className="delete-popup"
                      initial={{ opacity: 0 }}
                      animate={
                        deletePopup
                          ? { opacity: 1, x: 0, y: 0, display: "flex" }
                          : { opacity: 0, x: 0, y: -100, display: "none" }
                      }
                      exit={{ opacity: 0 }}
                    >
                      <p>Are you sure you want to delete this event?</p>
                      <motion.span 
                        className="confirm-delete-buttons"
                        initial="show-confirm"
                        animate={deletePopup ? "show-confirm" : "hide-confirm"}
                        variants={confirmationVariants}
                        >
                      <motion.button
                        className="confirm-delete-button-yes"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDeleteEvent(createdEvents[eventIndex])}
                      >
                        Yes
                      </motion.button>
                      <motion.button
                        className="confirm-delete-button-no"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setConfirmDelete(false)
                          setDeletePopup(false)
                        }}
                      >
                        No
                      </motion.button>
                    </motion.span>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            {createdEvents.map((event, index) => {
              return (
                <motion.div
                  className="event-container"
                  key={`my-event-${index}-container`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleExpandEvent(index)}
                >
                  {handleDateFormatter(event.eventdate)}
                  <motion.div
                    key={`my-event-${index}`}
                    className="event"
                  >
                    <img src={event.eventimage} alt="Event" />
                  </motion.div>
                  {event.eventname}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p>No accepted events</p>
        )}
      </div>
      <div className="events-box">
        <h2>My Friends Events</h2>
        {acceptedEvents.length > 0 ? (
          <ul>
            {acceptedEvents.map((event, index) => {
              return <li key={index}>{event}</li>;
            })}
          </ul>
        ) : (
          <p>No accepted events</p>
        )}
      </div>
      <div className="events-box">
        <h2>Invitations</h2>
        {pendingEvents.length > 0 ? (
          <ul>
            {pendingEvents.map((event, index) => {
              return <li key={index}>{event}</li>;
            })}
          </ul>
        ) : (
          <p>No pending events</p>
        )}
      </div>
      <div className="events-box">
        <h2>History</h2>
        {declinedEvents.length > 0 ? (
          <ul>
            {declinedEvents.map((event, index) => {
              return <li key={index}>{event}</li>;
            })}
          </ul>
        ) : (
          <p>No declined events</p>
        )}
      </div>
    </div>
  );
}

export default UserEvents;
