import { useState } from "react";
import { motion } from "framer-motion";
import "../componentstyles/createevent.css";
import randomGradient from 'random-gradient';

function CreateEvent(props) {
  const { userData, setShowCreateEvent, setData } = props;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventname = formData.get('eventname');
    const eventdate = formData.get('eventdate');
    const eventtime = formData.get('eventtime');
    const eventlocation = formData.get('eventlocation');
    const eventdescription = formData.get('eventdescription');
    const eventimageFile = formData.get('eventimage');

    if (eventimageFile && eventimageFile.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(eventimageFile);
      reader.onloadend = () => {
        const eventimage = reader.result;
        submitData(eventname, eventdate, eventtime, eventlocation, eventdescription, eventimage);
      };
    } else {
      const gradient = randomGradient(userData.username); // Pass the uid parameter
      console.log("Generated gradient:", gradient); // Log the generated gradient
      const colors = parseGradient(gradient);
      if (colors.color1 && colors.color2) {
        const eventimage = generateGradientImage(colors.color1, colors.color2);
        submitData(eventname, eventdate, eventtime, eventlocation, eventdescription, eventimage);
      } else {
        console.error("Invalid gradient colors:", gradient);
      }
    }
  };

  const submitData = async (eventname, eventdate, eventtime, eventlocation, eventdescription, eventimage) => {
    const data = {
      username: userData.username,
      newEvent: {
        eventid: `${userData.username}-${eventname}-${eventdate}`,
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

  const generateGradientImage = (color1, color2) => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    const gradientCanvas = ctx.createLinearGradient(0, 0, 500, 500);
    gradientCanvas.addColorStop(0, color1);
    gradientCanvas.addColorStop(1, color2);
    ctx.fillStyle = gradientCanvas;
    ctx.fillRect(0, 0, 500, 500);
    return canvas.toDataURL();
  };

  const parseGradient = (gradient) => {
    const regex = /linear-gradient\([^)]+,\s*([^,]+),\s*([^)]+)\)/;
    const matches = gradient.match(regex);
    if (matches && matches.length === 3) {
      return { color1: matches[1].trim(), color2: matches[2].trim() };
    }
    return {};
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
