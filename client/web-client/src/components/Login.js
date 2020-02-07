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
      localStorage.setItem('token', authenticatedUser.token);
      setUser(authenticatedUser);
      history.push('/');
    }
  };

  return (
    <div className='login'>
      <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='name@email.com'
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className='form-field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='p@s5w0rd'
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button>Submit</button>
        </form>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};
