import React, { useContext } from 'react';
import { AuthContext } from '../Store';
import { Link } from 'react-router-dom';
import { CONSTANTS } from '../constants';
import { motion } from 'framer-motion';
const { LOGOUT } = CONSTANTS;

const spring = {
  type: 'spring',
  damping: 50,
  stiffness: 600,
};

export const NavMenu = () => {
  const [{ user }, dispatch] = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  const handleProfileLink = () => {};

  return (
    <motion.div
      className='nav-menu'
      transition={spring}
      initial={{ y: '-20%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -5, opacity: 0.5 }}>
      <Link to='/home' className='btn home'>
        Home
      </Link>
      <Link
        to={`/home/profile/${user.id}`}
        onClick={() => handleProfileLink()}
        className='btn profile'>
        Profile
      </Link>
      <Link to='/auth/login' onClick={() => handleLogout()} className='btn logout'>
        Logout
      </Link>
    </motion.div>
  );
};
