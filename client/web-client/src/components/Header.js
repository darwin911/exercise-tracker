import React from 'react';
import { NavMenu } from './NavMenu';

export const Header = ({ isOpen, setMenuOpen }) => {
  return (
    <header className={`header`}>
      <nav>
        <h1 className='main-heading'>
          E<span className='hide-sm'>xercise </span>
          <b>
            T<span className='hide-sm'>racker</span>
          </b>
        </h1>
        <button className='hamburger-btn' onClick={() => setMenuOpen(val => !val)}>
          <span />
        </button>
      </nav>
      {isOpen && <NavMenu />}
    </header>
  );
};
