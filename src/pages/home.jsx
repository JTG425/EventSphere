// src/App.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../pagestyles/home.css';

function Home(props) {

    const tempEvents = [
        {
            name: "Maria's Party!",
            date: "2024-07-20",
            time: "8:00 PM",
            location: "1234 Party St.",
            description: "Happy Birthday Maria!",
        },
        {
            name: "Event 2",
            date: "2021-10-02",
            time: "12:00",
            location: "Location 2",
            description: "Description 2",
        },
        {
            name: "Event 3",
            date: "2021-10-03",
            time: "12:00",
            location: "Location 3",
            description: "Description 3",
        },
    ];


  return (
    <div className="home-container">
      <h1>Home</h1>
        <div className="events-container">
            <AnimatePresence mode="popLayout">
            {tempEvents.map((event, index) => (
            <motion.div 
                key={`event-${index}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="event"
                >
                <h2>{event.name}</h2>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
                <p>{event.description}</p>
            </motion.div>
            ))}
            </AnimatePresence>
        </div>
    </div>
  );
}

export default Home;
