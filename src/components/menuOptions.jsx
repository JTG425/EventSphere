import { motion } from "framer-motion";
import '../componentstyles/menu.css';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdMail } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";





function MenuOptions(props) {
  const setPage = props.setPage;
  const setShowMenu = props.showMenu;

  const handlePageChange = (page) => () => {
    setPage(page);
    setShowMenu();
  };

  return (
    <div className="menu-options">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.button 
            className="menu-option"
            onClick={handlePageChange("home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
          <IoMdHome />
          <p>Home</p>
        </motion.button>
      </Link>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <motion.button 
            className="menu-option"
            onClick={handlePageChange("profile")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
          <CgProfile />
          <p>Profile</p>
        </motion.button>
      </Link>
      <motion.button 
          className="menu-option"
          onClick={props.signOut}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
      >
        <PiSignOut />
       <p>Sign Out</p>
      </motion.button>
    </div>
  );
}

export default MenuOptions;
