import { motion } from "framer-motion";
import "../componentstyles/inbox.css";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdMail } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";

function Inbox(props) {
  const userData = props.userData;
  const handlePosting = props.handlePosting;
  const showInbox = props.showInbox;
  console.log(userData);

  const handleDecide = (response, index) => {
    const data = {
      to: userData.inbox[index].from,
      from: userData.username,
      response: response,
    };
    handlePosting(data, "decide-friend-request");
    
  };

  return (
    <>
      {showInbox ? (
        <div className="inbox-container">
          <p>Inbox</p>
          {userData.inbox.map((message, index) => {
            var type = message.type;
            var from = message.from;
            var message = "";
            console.log(message);
            switch (type) {
              case "friendRequest":
                message = `You have a friend request from ${from}`;
                break;
              case "eventInvite":
                message = `You have been invited to an event by ${from}`;
                break;
              default:
                message = "You have a new message";
                break;
            }

            return (
              <motion.div
                className="message-container"
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>{message}</p>
                <span className="message-buttons">
                  <button
                    className="accept-button"
                    onClick={() => handleDecide("accepted", index)}
                  >
                    Accept
                  </button>
                  <button
                    className="decline-button"
                    onClick={() => handleDecide("declined", index)}
                  >
                    Decline
                  </button>
                </span>
              </motion.div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default Inbox;
