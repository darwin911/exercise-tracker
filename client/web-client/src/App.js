import React, { useEffect, useContext } from 'react';
import './App.css';
import { UserExercises } from './components/UserExercises';
import { getUserExercises, verifyToken } from './helper';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthContext } from './Store';
import { SET_USER, SET_EXERCISES, LOGOUT } from './constants';

export const App = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;

  const history = useHistory();

  const loadExercises = async userId => {
    const dbExercises = await getUserExercises(userId);
    dispatch({ type: SET_EXERCISES, payload: dbExercises });
  };

  useEffect(() => {
    const loadCredentials = async token => {
      const verifiedUser = await verifyToken({ token });
      if (!verifiedUser) {
        history.push('/login');
      } else {
        dispatch({ type: SET_USER, payload: verifiedUser });
        history.push('/');
      }
    };

    let token = localStorage.getItem('token');
    if (token) {
      loadCredentials(token);
    } else {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    if (user) {
      loadExercises(user.id);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };

  return (
    <Switch>
      <Route exact path='/'>
        <div className='App'>
          <div className='container'>
            <h1>Exercise Tracker</h1>
            <hr />

            <UserExercises />

            <Link to='/login' onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
    </Switch>
  );
};
