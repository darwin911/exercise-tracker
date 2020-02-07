import React, { useEffect, useState } from 'react';
import './App.css';
import { Exercise } from './components/Exercise';
import { AddExercise } from './components/AddExercise';
import { getExercises, verifyToken } from './helper';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

export const App = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);

  const loadExercises = async () => {
    const dbExercises = await getExercises();
    setExercises(dbExercises);
  };

  const loadCredentials = async token => {
    const verifiedUser = await verifyToken({ token });
    if (!verifiedUser) {
      history.push('/login');
    } else {
      setUser(verifiedUser);
      history.push('/');
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      loadCredentials(token);
      loadExercises();
    }
  }, [setExercises, setUser]);

  return (
    <Switch>
      <Route exact path='/'>
        <div className='App'>
          <h1>Exercise Tracker</h1>
          <hr />

          {user && <p>{user ? user.username : 'Guest'}'s Exercises</p>}

          {exercises &&
            exercises.map(exercise => (
              <Exercise
                key={exercise._id}
                exercise={exercise}
                setExercises={setExercises}
              />
            ))}

          <AddExercise setExercises={setExercises} />
          <hr />
          <Link to='/login' onClick={() => setUser(null)}>
            Logout
          </Link>
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
