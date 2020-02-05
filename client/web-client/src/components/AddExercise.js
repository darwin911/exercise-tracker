import React, { useState } from 'react';
import { addExercise } from '../helper';

export const AddExercise = () => {
  const [duration, setDuration] = useState(null);
  const [note, setNote] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const obj = {
      duration,
      note,
      date: new Date(),
      username: 'Darwin'
    };

    const resp = await addExercise(obj);
    console.log(resp);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='duration'>Duration: </label>
      <input
        type='number'
        name='duration'
        max={360}
        onChange={e => setDuration(e.target.value)}
      />
      <br />
      <label htmlFor='note'>Note: </label>
      <input type='text' name='note' onChange={e => setNote(e.target.value)} />
      <br />
      <button>Add Exercise</button>
    </form>
  );
};
