import React, { useState } from 'react';
import { addExercise } from '../helper';

export const AddExercise = ({ setExercises }) => {
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

    setExercises(prevState => [...prevState, obj]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='user'>User: </label>
      <select required name='user'>
        <option value=''>--Select User--</option>
        {['Darwin', 'Felix'].map(user => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor='duration'>Duration: </label>
      <input
        type='number'
        name='duration'
        min={1}
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
