import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLink = ({ path }) => {
  const isLogin = window.location.pathname.includes('/login');
  return (
    <p>
      {isLogin ? "Don't " : 'Already '}
      have an account?{' '}
      <Link to={`/auth/${path}`} style={{ textTransform: 'capitalize' }}>
        {path}
      </Link>
    </p>
  );
};
