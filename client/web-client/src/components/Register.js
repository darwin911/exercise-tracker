import React, { useState } from 'react';
import { registerUser } from '../helper';
import { Link, useHistory } from 'react-router-dom';

export const Register = ({ setIsLoggedIn }) => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    console.log('handleRegister');

    const registerResponse = await registerUser({ username, email, password });
    if (registerResponse) {
      setIsLoggedIn(true);
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
        />
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
        Already have an account? <Link to='/login'>Login!</Link>
      </p>
    </div>
  );
};
