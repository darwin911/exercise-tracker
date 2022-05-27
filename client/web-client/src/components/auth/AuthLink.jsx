import { Link } from "react-router-dom";
import React from "react";

export const AuthLink = ({ path }) => {
  const isLogin = window.location.pathname.includes("/login");
  return (
    <div className="auth-copy__wrapper">
      <p>
        {isLogin ? "Don't " : "Already "}
        have an account?
      </p>
      <Link to={`/${path}`} className="auth-copy__text">
        {path}
      </Link>
    </div>
  );
};
