import React from 'react';

export const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <p className='footer-copy'>
        Created by
        <a href='https://www.darwinpsmith.com' target='_blank' rel='noreferrer noopener'>
          {' '}
          <span> &copy; Darwin Smith {new Date().getFullYear()}</span>
        </a>
        <a
          href='https://www.github.com/darwin911'
          className='github-icon'
          target='_blank'
          rel='noreferrer noopener'>
          <img src={process.env.PUBLIC_URL + '/images/github-icon.svg'} alt='Github' />
        </a>
      </p>
    </div>
  </footer>
);
