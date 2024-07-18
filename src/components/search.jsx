import { useState } from "react";
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
  const setSearchData = props.setSearch;
  const setData = props.setData;

  var searchResults = props.searchResults;
  
  console.log(searchResults);
  if (searchResults === null || searchResults === undefined) {
    searchResults = {
        "success": false,
        "userData": []
      };
  }

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const data = { searchTerm: term };
    setSearchData(data); // Call the new function to handle search

    if (term.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleShowProfile = (user, index) => {
    setSelectedUser(user);
    setShowProfile(!showProfile);
  };

  const resultsContainerVariants = {
    showResults: { opacity: 1 },
    hideResults: { opacity: 0 },
  };

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
          {searchResults.userData.length > 0  ? (
            searchResults.userData.map((user, index) => (
              <motion.div
                key={`${user}-search-result-index`}
                className="search-result"
                initial={{ opacity: 0 }}
                animate={showResults ? { opacity: 1 } : { opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleShowProfile(user, index)}
                exit={{ opacity: 0 }}
              >
                {user.username}
                <img
                  src={user.profilepic === "" ? defaultPFP : user.profilepic}
                  alt="avatar"
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="no-users-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No Users Found
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {showProfile ? (
        <FriendProfile
          userData={userData}
          profileInfo={selectedUser}
          setData={setData}
          setShowProfile={handleShowProfile}
        />
      ) : null}
    </>
  );
}

export default SearchBar;
