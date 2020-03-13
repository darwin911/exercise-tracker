import React, { useContext } from 'react';
import { AuthContext } from '../Store';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants';

const style = {
  width: '100%',
};

export const NavMenu = () => {
  const [{ user }, dispatch] = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  return (
    <div className='nav-menu' style={style}>
      <Link to='/login' onClick={() => handleLogout()} className='btn logout'>
        Logout
      </Link>
      <span style={{ marginBottom: 20 }}></span>
      <Link to={`/profile/${user.id}`}>Profile</Link>
      <span style={{ marginBottom: 20 }}></span>
      <Link to='/home'>Home</Link>
      <span style={{ marginBottom: 20 }}></span>
    </div>
  );
};
