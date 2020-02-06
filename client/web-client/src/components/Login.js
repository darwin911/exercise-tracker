import React, { useState } from 'react';
import { loginUser } from '../helper';
import { Link, useHistory } from 'react-router-dom';

export const Login = ({ setIsLoggedIn }) => {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    console.log('handleLogin');

    const loginResponse = await loginUser({ email, password });
    if (loginResponse) {
      setIsLoggedIn(true);
      history.push('/');
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          name='email'
          placeholder='name@email.com'
          autoComplete='off'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          autoComplete='off'
          onChange={e => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};