import React, { useState, useContext } from 'react';
import { addExercise } from '../helper';
import { AuthContext } from '../Store';
import { ADD_EXERCISE } from '../constants';
import { motion } from 'framer-motion';

export const AddExercise = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;

  const [isAdding, setIsAdding] = useState(false);
  const [duration, setDuration] = useState(0);
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
      <motion.form
        onSubmit={handleSubmit}
        className='add-exercise'
        initial={{ y: 0 }}
        animate={{ y: 10 }}>
        <div className='form-field duration'>
          <label htmlFor='duration'>Duration: </label>
          <input
            placeholder={0}
            type='number'
            name='duration'
            min={1}
            max={360}
            onChange={e => setDuration(e.target.value)}
            required
            value={duration}
          />
        </div>
        <div className='form-field note'>
          <label htmlFor='note'>Note: </label>
          <input
            type='text'
            name='note'
            onChange={e => setNote(e.target.value)}
            required
            value={note}
          />
        </div>
        <div className='form-field type'>
          <label htmlFor='type'>Type:</label>
          <select>
            <option value='blank'>----Select----</option>
            <option value='gym'>Gym</option>
            <option value='run'>Run</option>
            <option value='yoga'>Yoga</option>
          </select>
        </div>
        <div className='form-field buttons-container'>
          <button className='btn add' type='submit' disabled={loading}>
            {loading ? <div className='loader' /> : 'Add'}
          </button>
          <button
            className='btn cancel'
            onClick={() => setIsAdding(false)}
            disabled={loading}>
            Cancel
          </button>
        </div>
      </motion.form>
    );
  } else {
    return (
      <motion.button
        className='btn toggle-form'
        onClick={() => setIsAdding(true)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        Add Exercise
      </motion.button>
    );
  }
};
