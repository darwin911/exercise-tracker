import React, { useContext, useEffect, useState } from 'react';
import { NavMenu } from './NavMenu';
import { MainHeading } from './MainHeading';
import { Link } from 'react-router-dom';
import { AppContext } from '../Store';
import { CONSTANTS } from '../constants';
const { LOGOUT } = CONSTANTS;

// https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export const Header = ({ isOpen, setMenuOpen }) => {
  const [{ user }, dispatch] = useContext(AppContext);
  const isAuth = window.location.pathname.toLowerCase().startsWith('/auth');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setInnerWidth(window.innerWidth);
    }, 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  });

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMenuOpen(false);
    dispatch({ type: LOGOUT });
  };

  if (!user) return null;

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
              <Link to='/auth/login' className='nav-link logout' onClick={() => handleLogout()}>
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
