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
        <header>
          <h1 className='main-heading'>
            Exercise <span>Tracker</span>
          </h1>
        </header>
        <hr />
        <br />
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <br />
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              autoFocus
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
              id='password'
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
          <p>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
