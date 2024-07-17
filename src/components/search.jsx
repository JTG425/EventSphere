import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultPFP from "../assets/defaultProfile.png";
import FriendProfile from "./friendProfile";
import "../componentstyles/search.css";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const userData = props.userData;
  const userList = props.userList;
  const handlePosting = props.handlePosting;

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowProfile = (user, index) => {
    setSelectedUser(user);
    setShowProfile(!showProfile);
  }



  const filteredUsers = userList.userList
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const resultsContainerVariants = {
    showResults: {
      opacity: 1,
    },
    hideResults: {
      opacity: 0,
    },
  };

  

  useEffect(() => {
    if (searchTerm.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Search"
          className="searchbar-input"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <motion.div 
        className="search-results"
        variants={resultsContainerVariants}
        initial="hideResults"
        animate={showResults ? "showResults" : "hideResults"}
      >
        <AnimatePresence>
          {filteredUsers.map((user, index) => (
            <motion.div
              key={index}
              className="search-result"
              initial={{ opacity: 0 }}
              animate={showResults ? { opacity: 1 } : { opacity: 0 }}
              whileHover={{
                scale: 1.02,
              }}
              onClick={() => handleShowProfile(user, index)}

              exit={{ opacity: 0 }}
            >
              {user.username}
              <img 
                src={user.profilepic === "" ? defaultPFP : user.profilepic} 
                alt="avatar" 
              />


            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
        {showProfile ? (
          <FriendProfile
            userData={userData}
            profileInfo={selectedUser}
            handlePosting={handlePosting}
            setShowProfile={handleShowProfile}
          />
        ) : null}

    </>
  );
}

export default SearchBar;
