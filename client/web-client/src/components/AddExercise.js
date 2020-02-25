import React, { useState, useContext, useRef } from 'react';
import { addExercise } from '../helper';
import { AuthContext } from '../Store';
import { ADD_EXERCISE, TOGGLE_MODAL } from '../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { createRef } from 'react';

const exerciseTypes = ['Gym', 'Run', 'Yoga'];

export const AddExercise = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, modalOpen } = state;

  const [distance, setDistance] = useState(''); // Units in miles (imperial)
  const [date, setDate] = useState(new Date(Date.now()));
  const [duration, setDuration] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('');
  console.log('date', date);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (duration < 1) {
      setLoading(false);
      return;
    }

    let exerciseObj = {
      duration,
      userId: user.id,
      note,
      date: new Date(date),
      username: user.username,
      type,
      distance,
    };

    debugger;

    // const newExercise = await addExercise(exerciseObj);

    // if (newExercise) {
    //   dispatch({ type: ADD_EXERCISE, payload: newExercise });
    // }

    // dispatch({ type: TOGGLE_MODAL });
    // resetForm();
  };

  const resetForm = () => {
    setLoading(false);
    setDate('');
    setDuration('');
    setNote('');
    setType('');
    setDistance('');
  };

  const closeModal = () => {
    dispatch({ type: TOGGLE_MODAL });
    resetForm();
  };

  const handleSelectChange = value => {
    setType(value);
  };

  const dateRef = createRef();
  console.dir(dateRef.current);

  const dateField = (
    <div className='form-field date' ref={dateRef}>
      <label htmlFor='date'>Date:</label>
      <input
        id='date'
        type='datetime-local'
        onChange={e => setDate(e.target.value)}
        value={date}
        required
      />
    </div>
  );

  const typeField = (
    <div className='form-field type'>
      <label htmlFor='type'>Type:</label>
      <select id='type' onChange={e => handleSelectChange(e.target.value)} value={type}>
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
          min={0.1}
          onChange={e => setDistance(e.target.value)}
          value={distance}
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
          {dateField}
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
