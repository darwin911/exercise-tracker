import React from 'react';
import { NavMenu } from './NavMenu';

export const Header = ({ menuOpen, setMenuOpen }) => {
  return (
    <header className={`header`}>
      <nav>
        <h1 className='main-heading'>
          E<span className='hide-sm'>xercise </span>
          <b>
            T<span className='hide-sm'>racker</span>
          </b>
        </h1>
        <button className='hamburger-btn' onClick={() => setMenuOpen(open => !open)}>
          <span />
        </button>
      </nav>
      {menuOpen && <NavMenu />}
    </header>
  );
};
