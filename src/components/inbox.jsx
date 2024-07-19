import { motion } from "framer-motion";
import "../componentstyles/inbox.css";

function Inbox(props) {
  const userData = props.userData;
  const userInbox = props.userInbox;
  const setData = props.setData;
  const showInbox = props.showInbox;
  const setShowInbox = props.setShowInbox;
  console.log(userInbox);

  const handleDecide = (response, index, message) => {
    const data = {
      to: message.from,
      from: message.to,
      status: response,
    };
    setData(data, "decide-friend-request");
    
  };

  const inboxVariants = {
    hide: {
      y: -300,
    },
    show: {
      y: 0,
    },
    }

  return (
    <motion.div 
      className="inbox-container"
      initial="hide"
      animate="show"
      variants={inboxVariants}
      >
      <div className="inbox-header">
        <h2>Your Messages</h2>
      </div>
      <div className="inbox-messages">
        {userInbox.inbox.map((message, index) => {
          return (
            <div key={`inbox-message-${index}-${message.to}`} className="inbox-message">
              {message.type === "friendRequest" ? (
                <>
                  <p>{message.from} Has sent you a Friend Request</p>
                  <div className="inbox-buttons">
                    <motion.button
                      onClick={() => handleDecide("accepted", index, message)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        backgroundColor: "rgb(170, 243, 251)",
                        color: "rgb(7, 144, 158)"
                      }}

                      >Accept
                      </motion.button>
                    <motion.button 
                      onClick={() => handleDecide("declined", index, message)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        backgroundColor: "rgb(251, 170, 170)",
                        color: "rgb(158, 7, 7)"
                      }}
                      >Decline
                      </motion.button>
                  </div>
                </>

              ) : (
                <>
                  <p>{message.from} Has A New Event!</p>
                  <div className="inbox-buttons">
                    <motion.button
                      onClick={() => handleDecide("accepted", index)}
                      >Accept
                      </motion.button>
                    <motion.button 
                      onClick={() => handleDecide("rejected", index)}
                      >Reject
                      </motion.button>
                  </div>
                </>

              )
              }
            </div>
          );
        })}
      </div>

    </motion.div>
  );
}

export default Inbox;
