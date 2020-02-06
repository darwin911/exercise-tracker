import React, { useState } from 'react';
import { loginUser } from '../helper';
import { Link, useHistory } from 'react-router-dom';

export const Login = ({ setUser }) => {
  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();

    const authenticatedUser = await loginUser({ email, password });

    if (authenticatedUser) {
      setUser(authenticatedUser);
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
          value={email}
        />
        <input
          type='password'
          name='password'
          autoComplete='off'
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button>Submit</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};
