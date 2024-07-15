// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../componentstyles/events.css";


function UserEvents(props) {
  const userData = props.userData;
  const createdEvents = userData.createdEvents || [];
  const acceptedEvents = userData.acceptedEvents || [];
  const pendingEvents = userData.pendingEvents || [];
  const declinedEvents = userData.declinedEvents || [];


  return (
    <div className="events-container">
      <div className="events-box">
        <h2>My Events</h2>
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
