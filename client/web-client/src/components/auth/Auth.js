import React from 'react';
import { MainHeading, RegisterForm, LoginForm } from './index';
import { Route } from 'react-router-dom';

export const Auth = () => {
  return (
    <main className='auth container'>
      <header>
        <MainHeading />
      </header>
      <Route path='/auth/login' component={LoginForm} />
      <Route path='/auth/register' component={RegisterForm} />
    </main>
  );
};
