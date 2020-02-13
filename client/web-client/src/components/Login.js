import React, { useState, useContext } from 'react';
import { loginUser } from '../helper';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../Store';
import { SET_USER, TOGGLE_LOADING } from '../constants';

export const Login = () => {
  const [state, dispatch] = useContext(AuthContext);

  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    dispatch({ type: TOGGLE_LOADING });

    const authenticatedUser = await loginUser({ email, password });

    if (authenticatedUser.error) {
      console.log(authenticatedUser);
      setError(authenticatedUser.error);
      dispatch({ type: TOGGLE_LOADING });
      return;
    }

    if (authenticatedUser) {
      dispatch({ type: SET_USER, payload: authenticatedUser });
      localStorage.setItem('token', authenticatedUser.token);
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
              autoComplete='username'
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
              required
            />
          </div>
          <button disabled={state.loading}>
            {state.loading ? <div className='loader' /> : 'Submit'}
          </button>
          {error && <p className='error'>{error}</p>}
        </form>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};
