import React, { useEffect, useState } from 'react';
import './App.css';
import { Exercise } from './components/Exercise';
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

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/exercises/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        duration: 5,
        note: 'test note',
        date: new Date(),
        username: 'Darwin'
      })
    });
    console.log(await response.json());
  };

  const handleDelete = async id => {
    const response = await fetch(`http://localhost:5000/exercises/${id}`, {
      method: 'DELETE'
    });
    console.log(await response.json());
  };

  return (
    <div className='App'>
      <h1>Exercise Tracker</h1>
      {exercises.map(exercise => (
        <Exercise
          key={exercise._id}
          exercise={exercise}
          handleDelete={handleDelete}
        />
      ))}

      <form onSubmit={handleSubmit}>
        <label htmlFor='duration'>Duration: </label>
        <input type='number' name='duration' max={360} />
        <br />
        <label htmlFor='note'>Note: </label>
        <input type='text' name='note' />
        <br />
        <button>Add Exercise</button>
      </form>
    </div>
  );
}

export default App;
