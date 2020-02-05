import React, { useEffect, useState } from 'react';
import './App.css';
import { Exercise } from './components/Exercise';
import { AddExercise } from './components/AddExercise';
import { getExercises } from './helper';

function App() {
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
  );
}

export default App;
