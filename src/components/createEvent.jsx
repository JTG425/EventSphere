// src/App.js
import { useState } from "react";
import { motion } from "framer-motion";
import "../componentstyles/createevent.css";
import randomGradient from 'random-gradient';

function CreateEvent(props) {
  const userData = props.userData;
  const setShowCreateEvent = props.setShowCreateEvent;
  const setData = props.setData;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const eventname = event.target.eventname.value;
    const eventdate = event.target.eventdate.value;
    const eventtime = event.target.eventtime.value;
    const eventlocation = event.target.eventlocation.value;
    const eventdescription = event.target.eventdescription.value;
    let eventimage = null;
    if (event.target.eventimage.files.length > 0) {
      const file = event.target.eventimage.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        eventimage = reader.result;
        submitData(eventimage);
      };
    } else {
      const gradient = randomGradient();
      eventimage = generateGradientImage(gradient);
      submitData(eventimage);
    }
  };

  const submitData = async (eventimage) => {
    const eventname = document.getElementById('eventname').value;
    const eventdate = document.getElementById('eventdate').value;
    const eventtime = document.getElementById('eventtime').value;
    const eventlocation = document.getElementById('eventlocation').value;
    const eventdescription = document.getElementById('eventdescription').value;

    const data = {
      username: userData.username,
      newEvent: {
        eventname: eventname,
        eventdate: eventdate,
        eventtime: eventtime,
        eventlocation: eventlocation,
        eventdescription: eventdescription,
        eventimage: eventimage,
        eventParticipants: [userData.username],
      },
    };
    console.log(data);
    await setData(data, "create-event");
    setShowCreateEvent();
  };

  const generateGradientImage = (gradient) => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    const gradientCanvas = ctx.createLinearGradient(0, 0, 500, 500);
    gradientCanvas.addColorStop(0, gradient.color1);
    gradientCanvas.addColorStop(1, gradient.color2);
    ctx.fillStyle = gradientCanvas;
    ctx.fillRect(0, 0, 500, 500);
    return canvas.toDataURL();
  };

  return (
    <motion.div
      className="create-event-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="create-form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1>Create Event</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="file"
            id="eventimage"
            name="eventimage"
            accept="image/*"
          />
          <input
            type="text"
            id="eventname"
            name="eventname"
            placeholder="Name"
            maxLength={25}
            required
          />
          <input
            type="date"
            id="eventdate"
            name="eventdate"
            required
          />
          <input type="time" id="eventtime" name="eventtime" required />
          <input
            type="text"
            id="eventlocation"
            name="eventlocation"
            placeholder="Location"
            required
          />
          <textarea
            id="eventdescription"
            name="eventdescription"
            placeholder="Description"
            required
          />
          <span className="in-line">
            <motion.button
              type="button"
              className="cancel-event-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateEvent()}
            >
              Discard
            </motion.button>
            <motion.button
              type="submit"
              className="create-event-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Event
            </motion.button>
          </span>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreateEvent;
