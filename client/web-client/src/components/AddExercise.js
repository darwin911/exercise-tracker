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

  const [duration, setDuration] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('');
  const [distance, setDistance] = useState(0); // Units in miles (imperial)

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (duration < 1) {
      setLoading(false);
      return;
    }

    const exerciseObj = {
      duration,
      userId: user.id,
      note,
      date: new Date(),
      username: user.username,
      type,
    };

    const newExercise = await addExercise(exerciseObj);

    if (newExercise) {
      dispatch({ type: ADD_EXERCISE, payload: newExercise });
    }

    dispatch({ type: TOGGLE_MODAL });
    resetForm();
  };

  const resetForm = () => {
    setLoading(false);
    setDuration(0);
    setNote('');
    setType('');
    setDistance(0);
  };

  const closeModal = () => {
    console.log('close modal called');
    dispatch({ type: TOGGLE_MODAL });
    resetForm();
  };

  const handleSelectChange = value => {
    setType(value);
  };

  const typeField = (
    <div className='form-field type'>
      <label htmlFor='type'>Type:</label>
      <select id='type' onChange={e => handleSelectChange(e.target.value)} value={type} autoFocus>
        <option value='' disabled>
          Choose...
        </option>
        {exerciseTypes.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const durationField = (
    <div className='form-field duration'>
      <label htmlFor='duration'>Duration: </label>
      <input
        id='duration'
        type='number'
        inputMode='numeric'
        placeholder='0'
        min={1}
        max={360}
        onChange={e => setDuration(e.target.value)}
        required
        value={duration}
      />
      <label htmlFor='duration'>min{duration > 1 && 's'}</label>
    </div>
  );

  const noteField = (
    <div className='form-field note'>
      <label htmlFor='note'>Note: </label>
      <input
        id='note'
        type='text'
        placeholder='Felt great!'
        onChange={e => setNote(e.target.value)}
        required
        value={note}
      />
    </div>
  );

  const distanceField =
    type.toUpperCase() === 'RUN' ? (
      <div className='form-field distance'>
        <label htmlFor='note'>Distance: </label>
        <input
          id='distance'
          type='number'
          step={0.1}
          onChange={e => setDistance(e.target.value)}
          value={distance}
          required
        />
        <label htmlFor='distance'>mi</label>
      </div>
    ) : null;

  const buttonsContainer = (
    <div className='form-field buttons-container'>
      <button className='btn add' onClick={handleSubmit} disabled={loading || !duration}>
        {loading ? <div className='loader' /> : 'Add'}
      </button>
      <button type='button' className='btn cancel' onClick={closeModal} disabled={loading}>
        Cancel
      </button>
    </div>
  );

  if (modalOpen) {
    return createPortal(
      <aside className='add-exercise__modal'>
        <motion.form className='add-exercise' initial={{ y: 0 }} animate={{ y: 10 }}>
          <h2>Log New Exercise</h2>
          <hr className='divider' />
          {typeField}
          {durationField}
          {distanceField}
          {noteField}
          {buttonsContainer}
        </motion.form>
      </aside>,
      document.body
    );
  } else {
    return null;
  }
};
