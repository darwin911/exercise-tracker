import React, { useEffect, useState } from 'react';
import './App.css';
import { UserExercises } from './components/UserExercises';
import { getUserExercises, verifyToken } from './helper';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

export const App = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);

  const loadExercises = async userId => {
    const dbExercises = await getUserExercises(userId);
    setExercises(dbExercises);
  };

  useEffect(() => {
    const loadCredentials = async token => {
      const verifiedUser = await verifyToken({ token });
      if (!verifiedUser) {
        history.push('/login');
      } else {
        setUser(verifiedUser);
        history.push('/');
      }
    };

    let token = localStorage.getItem('token');
    if (token) {
      loadCredentials(token);
    }
  }, [history]);

  useEffect(() => {
    if (user) {
      loadExercises(user.id);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Switch>
      <Route exact path='/'>
        <div className='App'>
          <div className='container'>
            <h1>Exercise Tracker</h1>
            <hr />

            <UserExercises
              user={user}
              exercises={exercises}
              setExercises={setExercises}
            />

            <Link to='/login' onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </Route>
      <Route path='/login'>
        <Login setUser={setUser} />
      </Route>
      <Route path='/register'>
        <Register setUser={setUser} />
      </Route>
    </Switch>
  );
};
