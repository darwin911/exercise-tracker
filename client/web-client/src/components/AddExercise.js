import React from 'react';

export const AddExercise = () => {
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
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='duration'>Duration: </label>
      <input type='number' name='duration' max={360} />
      <br />
      <label htmlFor='note'>Note: </label>
      <input type='text' name='note' />
      <br />
      <button>Add Exercise</button>
    </form>
  );
};
