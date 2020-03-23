import React, { useContext } from 'react';
import { AuthContext } from '../Store';
import { Link, useHistory } from 'react-router-dom';
import { CONSTANTS } from '../constants';
import { motion } from 'framer-motion';
const { LOGOUT } = CONSTANTS;

const spring = {
  type: 'spring',
  damping: 50,
  stiffness: 600,
};

export const NavMenu = ({ setMenuOpen }) => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  return (
    <motion.div
      className='nav-menu'
      transition={spring}
      initial={{ y: '-20%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -5, opacity: 0.5 }}>
      <Link to='/home' onClick={() => setMenuOpen(isOpen => !isOpen)} className='btn home'>
        Home
      </Link>
      <Link
        to={`/profile/${user.id}`}
        onClick={() => setMenuOpen(isOpen => !isOpen)}
        className='btn profile'>
        Profile
      </Link>
      <Link to='/auth/login' onClick={() => handleLogout()} className='btn logout'>
        Logout
      </Link>
    </motion.div>
  );
};
