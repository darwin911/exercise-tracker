import React, { useState } from 'react';
import { registerUser } from '../helper';
import { Link, useHistory } from 'react-router-dom';

export const Register = ({ setUser }) => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async e => {
    e.preventDefault();

    const registeredUser = await registerUser({ username, email, password });

    if (registeredUser) {
      setUser(registeredUser);
      history.push('/');
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          name='username'
          placeholder='select a username'
          autoComplete='off'
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
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
        Already have an account? <Link to='/login'>Login!</Link>
      </p>
    </div>
  );
};
