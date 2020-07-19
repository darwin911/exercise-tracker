import React, { useContext, useEffect, useState } from 'react';
import { NavMenu } from './NavMenu';
import { MainHeading } from './MainHeading';
import { Link } from 'react-router-dom';
import { AppContext } from '../Store';

export const Header = ({ isOpen, setMenuOpen }) => {
  const [{ user }] = useContext(AppContext);
  const isAuth = window.location.pathname.toLowerCase().startsWith('/auth');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  console.log(innerWidth);

  const smallBreakpoint = innerWidth <= 414;

  const HamburgerButton = () =>
    smallBreakpoint ? (
      <button
        disabled={isAuth}
        className='hamburger-btn'
        onClick={() => setMenuOpen((val) => !val)}>
        <span />
      </button>
    ) : null;

  return (
    <header className={`header ${smallBreakpoint ? 'header-mobile' : ''}`}>
      <nav>
        <MainHeading />
        {smallBreakpoint ? (
          <HamburgerButton />
        ) : (
          <>
            <div
              className={`nav-link-wrapper ${
                window.location.pathname.includes('home') ? 'active' : ''
              }`}>
              <Link to={`/home/${user ? user.id : ''}`} className='nav-link home'>
                Home
              </Link>
            </div>
            <div
              className={`nav-link-wrapper ${
                window.location.pathname.includes('profile') ? 'active' : ''
              }`}>
              <Link to={`/profile/${user ? user.id : ''}`} className='nav-link profile'>
                Profile
              </Link>
            </div>
            <div className='nav-link-wrapper'>
              <Link to='/auth/login' className='nav-link logout'>
                Logout
              </Link>
            </div>
          </>
        )}
      </nav>
      <NavMenu isOpen={isOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};
