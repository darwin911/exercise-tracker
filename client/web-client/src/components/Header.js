import React from 'react';
import { NavMenu } from './NavMenu';
import { MainHeading } from './MainHeading';

export const Header = ({ isOpen, setMenuOpen }) => {
  return (
    <header className={`header`}>
      <nav>
        <MainHeading />
        <button className='hamburger-btn' onClick={() => setMenuOpen((val) => !val)}>
          <span />
        </button>
      </nav>
      <NavMenu isOpen={isOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};
