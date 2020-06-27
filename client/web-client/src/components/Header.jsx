import React from 'react';
import { NavMenu } from './NavMenu';
import { MainHeading } from './MainHeading';

export const Header = ({ isOpen, setMenuOpen }) => {
  const isAuth = window.location.pathname.toLowerCase().startsWith('/auth');
  return (
    <header className={`header`}>
      <nav>
        <MainHeading />
        <button
          disabled={isAuth}
          className='hamburger-btn'
          onClick={() => setMenuOpen((val) => !val)}>
          <span />
        </button>
      </nav>
      <NavMenu isOpen={isOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};
