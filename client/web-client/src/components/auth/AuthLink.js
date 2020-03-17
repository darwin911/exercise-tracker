import React from 'react';
import { Link } from 'react-router-dom';

export const AuthLink = ({ path }) => {
  return (
    <p>
      Don't have an account? <Link to={`/auth/${path}`}>{path}</Link>
    </p>
  );
};
