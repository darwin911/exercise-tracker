import React, { useState, useContext } from 'react';
import { AuthLink, FormField, MainHeading } from './index';
import { Route, useHistory, withRouter } from 'react-router-dom';
import { loginUser, registerUser } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';

const { SET_USER, TOGGLE_LOADING } = CONSTANTS;

export const Auth = withRouter(({ location }) => {
  const [{ loading }, dispatch] = useContext(AuthContext);
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const { pathname } = location;
    dispatch({ type: TOGGLE_LOADING });
    let authenticatedUser;

    if (pathname === '/auth/login') {
      authenticatedUser = await loginUser({ email, password });
    } else if (pathname === '/auth/register') {
      authenticatedUser = await registerUser({ username, email, password });
    }

    if (authenticatedUser) {
      if (authenticatedUser.error) {
        setError(authenticatedUser.error);
        dispatch({ type: TOGGLE_LOADING });
        return;
      }
      dispatch({ type: SET_USER, payload: authenticatedUser });
      localStorage.setItem('token', authenticatedUser.token);
      history.push('/home');
    }
    dispatch({ type: TOGGLE_LOADING });
  };

  const disabled = loading || !email || password.length <= 3;

  return (
    <main className='auth container'>
      <header>
        <MainHeading />
      </header>
      <form onSubmit={e => handleSubmit(e)}>
        <Route path='/auth/login' render={() => <h2>Login</h2>} />
        <Route path='/auth/register' render={() => <h2>Register</h2>} />
        <br />
        <Route
          path='/auth/register'
          render={() => <FormField inputType='username' value={username} setter={setUsername} />}
        />
        <FormField inputType='email' value={email} setter={setEmail} />
        <FormField inputType='password' value={password} setter={setPassword} />
        <button disabled={disabled}>{loading ? <div className='loader' /> : 'Submit'}</button>
        {error && <p className='error'>{error}</p>}
        <Route path='/auth/login' render={() => <AuthLink path='register' />} />
        <Route path='/auth/register' render={() => <AuthLink path='login' />} />
      </form>
    </main>
  );
});
