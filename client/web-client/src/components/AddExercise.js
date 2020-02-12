import React, { useState, useContext } from 'react';
import { addExercise } from '../helper';
import { AuthContext } from '../Store';
import { ADD_EXERCISE, TOGGLE_MODAL } from '../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

const exerciseTypes = ['Gym', 'Run', 'Yoga'];

export const AddExercise = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, modalOpen } = state;
  console.log(modalOpen);

  const [duration, setDuration] = useState(0);
  const [note, setNote] = useState('');
  const [type, setType] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const exerciseObj = {
      duration,
      userId: user.id,
      note,
      date: new Date(),
      username: user.username,
      type
    };

    const newExercise = await addExercise(exerciseObj);
    dispatch({ type: ADD_EXERCISE, payload: newExercise });
    dispatch({ type: TOGGLE_MODAL });
    resetForm();
  };

  const resetForm = () => {
    setLoading(false);
    setDuration(0);
    setNote('');
    setType(null);
  };

  const closeModal = () => {
    console.log('close modal called');
    dispatch({ type: TOGGLE_MODAL });
  };
  if (modalOpen) {
    return createPortal(
      <aside className='add-exercise__modal'>
        <motion.form
          className='add-exercise'
          initial={{ y: 0 }}
          animate={{ y: 10 }}>
          <h2 style={{ marginBottom: '1rem' }}>Add Exercise: </h2>
          <div className='form-field duration'>
            <div className='form-field type'>
              <select
                onChange={e => setType(e.target.value)}
                defaultValue={type}>
                <option disabled>Select Exercise Type</option>
                {exerciseTypes.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor='duration'>Duration: </label>
            <input
              inputMode='numeric'
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
              placeholder='Ran with Jimmy around park.'
              type='text'
              name='note'
              onChange={e => setNote(e.target.value)}
              required
              value={note}
            />
          </div>
          <div className='form-field buttons-container'>
            <button
              className='btn add'
              onClick={handleSubmit}
              disabled={loading}>
              {loading ? <div className='loader' /> : 'Add'}
            </button>
            <button
              type='button'
              className='btn cancel'
              onClick={closeModal}
              disabled={loading}>
              Cancel
            </button>
          </div>
        </motion.form>
      </aside>,
      document.body
    );
  } else {
    return null;
  }
};
