import React from 'react';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants';

export const Header = ({ dispatch }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };
  return (
    <header className='header'>
      <h1 className='main-heading'>
        E<span className='hide-sm'>xercise </span>
        <b>
          T<span className='hide-sm'>racker</span>
        </b>
      </h1>
      <Link to='/login' onClick={handleLogout} className='btn logout'>
        Logout
      </Link>
    </header>
  );
};
