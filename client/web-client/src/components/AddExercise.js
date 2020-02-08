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
      <form onSubmit={handleSubmit} className='add-exercise'>
        <p>User: {user.username}</p>
        <br />
        <div className='form-field'>
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
        </div>
        <br />
        <div className='form-field'>
          <label htmlFor='note'>Note: </label>
          <input
            type='text'
            name='note'
            onChange={e => setNote(e.target.value)}
          />
        </div>
        <br />
        <button type='submit'>Add</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </form>
    );
  } else {
    return (
      <button className='btn' onClick={() => setIsAdding(true)}>
        Add Exercise
      </button>
    );
  }
};
