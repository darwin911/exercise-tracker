import React, { useContext } from 'react';
import { AppContext } from '../Store';
import { Link } from 'react-router-dom';
import { CONSTANTS } from '../constants';
import { motion } from 'framer-motion';
const { LOGOUT } = CONSTANTS;

const spring = {
  type: 'spring',
  damping: 50,
  stiffness: 600,
};

export const NavMenu = ({ isOpen, setMenuOpen }) => {
  const [{ user }, dispatch] = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMenuOpen((isOpen) => !isOpen);
    dispatch({ type: LOGOUT });
  };

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      display: 'flex',
    },
    closed: {
      opacity: 0,
      scale: 1.15,
      transitionEnd: {
        display: 'none',
      },
    },
  };

  if (!user) return null;

  return (
    <motion.div
      className='nav-menu'
      transition={spring}
      variants={variants}
      initial={'closed'}
      animate={isOpen ? 'open' : 'closed'}>
      <div className='nav-link-wrapper'>
        <Link to='/home' onClick={() => setMenuOpen((isOpen) => !isOpen)} className='nav-link home'>
          Home
        </Link>
      </div>
      <div className='nav-link-wrapper'>
        <Link
          to={`/profile/${user.id}`}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className='nav-link profile'>
          Profile
        </Link>
      </div>
      <div className='nav-link-wrapper'>
        <Link to='/auth/login' onClick={() => handleLogout()} className='nav-link logout'>
          Logout
        </Link>
      </div>
    </motion.div>
  );
};
