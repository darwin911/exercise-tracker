import React, { useContext } from 'react';
import { AuthContext } from '../Store';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants';
import { motion } from 'framer-motion';

const Span = () => (
  <span
    style={{
      marginBottom: '5vh',
    }}></span>
);

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

  return (
    <motion.div
      className='nav-menu'
      transition={spring}
      style={{ width: '100%' }}
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 0, opacity: 0 }}>
      <Link to='/login' onClick={() => handleLogout()} className='btn logout'>
        Logout
      </Link>
      <Span />
      <Link to={`/profile/${user.id}`}>Profile</Link>
      <Span />
      <Link to='/home'>Home</Link>
      <Span />
    </motion.div>
  );
};
