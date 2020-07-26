import React from 'react';

export const Loader = ({ size }) => (
  <div
    className='loader'
    style={{
      width: `${size}rem`,
      height: `${size}rem`,
      borderWidth: `${size + 2}px`,
      marginTop: `${size}rem`,
      marginBottom: `${size}rem`,
    }}
  />
);
