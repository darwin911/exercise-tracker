import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../Store";
import { CONSTANTS } from "../../constants";
import { Link } from "react-router-dom";
import { MainHeading } from "../shared/index";
import { NavMenu } from "./index";
import { debounce } from "../../util/debounce";

const { LOGOUT } = CONSTANTS;

export const Header = ({ isOpen, setMenuOpen }) => {
  const [{ user }, dispatch] = useContext(AppContext);
  const isAuth = window.location.pathname.toLowerCase().startsWith("/auth");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const isMobile = innerWidth <= 414;
  const { pathname } = window.location;

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      if (isOpen && innerWidth <= 414 && window.innerWidth > 414) {
        setMenuOpen(false);
      }
      setInnerWidth(window.innerWidth);
    }, 200);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  });

  const HamburgerButton = () =>
    isMobile ? (
      <button
        disabled={isAuth}
        className="hamburger-btn"
        onClick={() => setMenuOpen((val) => !val)}
      >
        <span />
      </button>
    ) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    dispatch({ type: LOGOUT });
  };

  return (
    <header className={`header ${isMobile ? "header-mobile" : ""}`}>
      <nav>
        <MainHeading />
        {isMobile ? (
          <HamburgerButton />
        ) : user ? (
          <>
            <div
              className={`nav-link-wrapper ${
                pathname.includes("home") ? "active" : ""
              }`}
            >
              <Link to={`/home/${user.username}`} className="nav-link home">
                Home
              </Link>
            </div>
            <div
              className={`nav-link-wrapper ${
                pathname.includes("profile") ? "active" : ""
              }`}
            >
              <Link
                to={`/profile/${user.username}`}
                className="nav-link profile"
              >
                Profile
              </Link>
            </div>
            <div className="nav-link-wrapper">
              <Link
                to="/login"
                className="nav-link logout"
                onClick={() => handleLogout()}
              >
                Logout
              </Link>
            </div>
          </>
        ) : null}
      </nav>
      <NavMenu isOpen={isOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};
