import React, { useEffect, useState } from 'react';
import './App.css';
import { Exercise } from './components/Exercise';
import { AddExercise } from './components/AddExercise';
import { getExercises } from './helper';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Switch, Route } from 'react-router-dom';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [exercises, setExercises] = useState([]);

  const loadExercises = async () => {
    const dbExercises = await getExercises();
    setExercises(dbExercises);
  };

  useEffect(() => {
    loadExercises();
  }, [setExercises]);

  return (
    <Switch>
      <Route exact path='/'>
        <div className='App'>
          <h1>Exercise Tracker</h1>
          {exercises &&
            exercises.map(exercise => (
              <Exercise
                key={exercise._id}
                exercise={exercise}
                setExercises={setExercises}
              />
            ))}

          <AddExercise setExercises={setExercises} />
        </div>
      </Route>
      <Route path='/login'>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </Route>
      <Route path='/register'>
        <Register setIsLoggedIn={setIsLoggedIn} />
      </Route>
    </Switch>
  );
};
