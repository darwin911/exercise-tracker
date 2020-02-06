import React, { useEffect, useState } from 'react';
import './App.css';
import { Exercise } from './components/Exercise';
import { AddExercise } from './components/AddExercise';
import { getExercises } from './helper';
import { Login } from './components/Login';

function App() {
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
    <div className='App'>
      {isLoggedIn ? (
        <>
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
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
