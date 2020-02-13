import React, { useState, useContext } from 'react';
import { registerUser } from '../helper';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../Store';
import { SET_USER, TOGGLE_LOADING } from '../constants';

export const Register = () => {
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async e => {
    e.preventDefault();
    dispatch({ type: TOGGLE_LOADING });

    const authenticatedUser = await registerUser({ username, email, password });

    if (authenticatedUser.error) {
      console.log(authenticatedUser);
      setError(authenticatedUser.error);
      dispatch({ type: TOGGLE_LOADING });
      return;
    }

    if (authenticatedUser) {
      localStorage.setItem('token', authenticatedUser.token);
      dispatch({ type: SET_USER, payload: authenticatedUser });
      history.push('/');
    }
  };

  return (
    <div className='register'>
      <div className='container'>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className='form-field'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              placeholder='select a username'
              onChange={e => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              autoComplete='email'
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
              autoComplete='current-password'
              placeholder='p@s5w0rd'
              onChange={e => setPassword(e.target.value)}
              value={password}
              minLength={3}
              required
            />
          </div>
          <button disabled={state.loading}>
            {state.loading ? <div className='loader' /> : 'Submit'}
          </button>
          {error && <p className='error'>{error}</p>}
        </form>
        <p>
          Already have an account? <Link to='/login'>Login!</Link>
        </p>
      </div>
    </div>
  );
};
