import React, { useState } from 'react';
import { addExercise } from '../helper';

export const AddExercise = ({ user, setExercises }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [duration, setDuration] = useState(null);
  const [note, setNote] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const exerciseObj = {
      duration,
      userId: user.id,
      note,
      date: new Date(),
      username: user.username
    };

    const newExercise = await addExercise(exerciseObj);

    setExercises(prevState => [...prevState, newExercise]);
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit}>
        <p>User: {user.username}</p>
        <br />
        <label htmlFor='duration'>Duration: </label>
        <input
          type='number'
          name='duration'
          defaultValue={0}
          min={1}
          max={360}
          onChange={e => setDuration(e.target.value)}
          required
        />
        <br />
        <label htmlFor='note'>Note: </label>
        <input
          type='text'
          name='note'
          onChange={e => setNote(e.target.value)}
        />
        <br />
        <button type='submit'>Add Exercise</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </form>
    );
  } else {
    return <button onClick={() => setIsAdding(true)}>Add Exercise</button>;
  }
};
