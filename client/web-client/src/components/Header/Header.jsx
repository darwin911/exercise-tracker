import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { Link } from 'react-router-dom';
import { MainHeading } from '../shared/index';
import { NavMenu } from './index';
import { debounce } from '../../util/debounce';

const { LOGOUT } = CONSTANTS;

export const Header = ({ isOpen, setMenuOpen }) => {
  const [{ user }, dispatch] = useContext(AppContext);
  const isAuth = window.location.pathname.toLowerCase().startsWith('/auth');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const pathname = window.location.pathname;

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      if (isOpen && innerWidth <= 414 && window.innerWidth > 414) {
        setMenuOpen(false);
      }
      setInnerWidth(window.innerWidth);
    }, 200);
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
        <MainHeading userId={user.id} />
        {smallBreakpoint ? (
          <HamburgerButton />
        ) : (
          <>
            <div
              className={`nav-link-wrapper ${
                pathname.includes('home') ? 'active' : ''
              }`}>
              <Link to={`/home/${user.id}`} className='nav-link home'>
                Home
              </Link>
            </div>
            <div
              className={`nav-link-wrapper ${
                pathname.includes('profile') ? 'active' : ''
              }`}>
              <Link to={`/profile/${user.id}`} className='nav-link profile'>
                Profile
              </Link>
            </div>
            <div className='nav-link-wrapper'>
              <Link
                to='/auth/login'
                className='nav-link logout'
                onClick={() => handleLogout()}>
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
