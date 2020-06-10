import React from 'react';

export const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <br />
      <strong>Created by &copy; Darwin Smith</strong>
      <span> {new Date().getFullYear()}</span>
      <br />
    </div>
  </footer>
);
