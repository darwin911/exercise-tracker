import React from 'react';

export const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <br />
      <strong>
        Created by &copy; <span>Darwin Smith</span>
      </strong>
      <span> {new Date().getFullYear()}</span>
      <br />
    </div>
  </footer>
);
