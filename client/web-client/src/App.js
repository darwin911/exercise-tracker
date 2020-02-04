import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [exercises, setExercises] = useState([]);

  const loadExercises = () => {
    fetch('http://localhost:5000/exercises')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setExercises(data);
      });
  };

  useEffect(() => {
    loadExercises();
    return () => setExercises([]);
  }, [setExercises]);

  return (
    <div className='App'>
      <h1>Exercise Tracker</h1>
      {exercises.map(exercise => (
        <p key={exercise}>{JSON.stringify(exercise)}</p>
      ))}
    </div>
  );
}

export default App;
