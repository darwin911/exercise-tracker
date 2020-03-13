import React, { useContext } from 'react';
import { NavMenu } from './NavMenu';
import { AuthContext } from '../Store';
import { TOGGLE_MENU } from '../constants';

export const Header = () => {
  const [{ menuOpen }, dispatch] = useContext(AuthContext);

  const toggleMenu = () => {
    dispatch({ type: TOGGLE_MENU });
  };

  return (
    <header className='header'>
      <nav>
        <h1 className='main-heading'>
          E<span className='hide-sm'>xercise </span>
          <b>
            T<span className='hide-sm'>racker</span>
          </b>
        </h1>
        <button className='hamburger-btn' onClick={() => toggleMenu()}>
          <span />
        </button>
      </nav>
      {menuOpen && <NavMenu />}
    </header>
  );
};
