import React, { useState, useContext } from 'react';
import { addExercise } from '../helper';
import { AuthContext } from '../Store';
import { ADD_EXERCISE } from '../constants';

export const AddExercise = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;

  const [isAdding, setIsAdding] = useState(false);
  const [duration, setDuration] = useState(null);
  const [note, setNote] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const exerciseObj = {
      duration,
      userId: user.id,
      note,
      date: new Date(),
      username: user.username
    };

    const newExercise = await addExercise(exerciseObj);

    dispatch({ type: ADD_EXERCISE, payload: newExercise });
    setIsAdding(false);
    setLoading(false);
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className='add-exercise'>
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
        <div className='form-field'>
          <label htmlFor='note'>Note: </label>
          <input
            type='text'
            name='note'
            onChange={e => setNote(e.target.value)}
            required
          />
        </div>
        <div className='form-field'>
          <button className='btn add' type='submit' disabled={loading}>
            {loading ? <div className='loader' /> : 'Add'}
          </button>
          <button
            className='btn delete'
            onClick={() => setIsAdding(false)}
            disabled={loading}>
            Cancel
          </button>
        </div>
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
