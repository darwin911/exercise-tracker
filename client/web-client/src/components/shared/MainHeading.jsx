import { Link } from 'react-router-dom';
import React from 'react';

export const MainHeading = ({ userId }) => (
  <h1 className='main-heading'>
    <Link to={`/home/${userId}`}>
      E<span className='hide-sm'>xercise </span>
      <b>
        T<span className='hide-sm'>racker</span>
      </b>
    </Link>
  </h1>
);
