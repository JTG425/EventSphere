import { motion } from "framer-motion";
import '../componentstyles/menu.css';
import { Link } from 'react-router-dom';

function MenuOptions(props) {
  const setPage = props.setPage;

  const handlePageChange = (page) => () => {
    setPage(page);
  };

  return (
    <div className="menu-options">
      <Link to="/">
        <motion.button 
            className="menu-option"
            onClick={handlePageChange("home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
          Home
        </motion.button>
      </Link>
      <Link to="/profile">
        <motion.button 
            className="menu-option"
            onClick={handlePageChange("profile")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
          Profile
        </motion.button>
      </Link>
      <motion.button 
          className="menu-option"
          onClick={handlePageChange("inbox")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
      >
        Inbox
      </motion.button>
      <motion.button 
          className="menu-option"
          onClick={props.signOut}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
      >
        Sign Out
      </motion.button>
    </div>
  );
}

export default MenuOptions;
