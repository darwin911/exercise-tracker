import React, { useState, useContext } from 'react';
import { addExercise } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS, EXERCISE_TYPES } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
const { ADD_EXERCISE, TOGGLE_MODAL } = CONSTANTS;

export const AddExercise = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, menuOpen } = state;
  const history = useHistory();

  const [distance, setDistance] = useState(''); // Units in miles (imperial)
  const [date, setDate] = useState(moment().format(moment.HTML5_FMT.DATE));
  const [time, setTime] = useState(moment().format(moment.HTML5_FMT.TIME));
  const [duration, setDuration] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('');

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
      date,
      username: user.username,
      type,
      time,
      distance,
    };

    const newExercise = await addExercise(exerciseObj);

    if (newExercise) {
      dispatch({ type: ADD_EXERCISE, payload: newExercise });
    }

    dispatch({ type: TOGGLE_MODAL });
    resetForm();
    history.push('/home');
  };

  const resetForm = () => {
    setLoading(false);
    setDate(moment().format(moment.HTML5_FMT.DATE));
    setDuration('');
    setNote('');
    setType('');
    setDistance('');
  };

  const closeModal = () => {
    if (menuOpen) {
      dispatch({ type: TOGGLE_MODAL });
    }
    history.push('/home');
    resetForm();
  };

  const handleSelectChange = value => {
    setType(value);
  };

  const dateField = (
    <div className='form-field date'>
      <label htmlFor='date'>Date:</label>
      <input
        id='date'
        type='date'
        pattern='\d{4}-\d{2}-\d{2}'
        onChange={e => setDate(e.target.value)}
        value={date}
        max={moment().format(moment.HTML5_FMT.DATE)}
        required
      />
    </div>
  );

  const timeField = (
    <div className='form-field time'>
      <label htmlFor='time'>Time:</label>
      <input id='time' type='time' onChange={e => setTime(e.target.value)} value={time} required />
    </div>
  );

  const typeField = (
    <div className='form-field type'>
      <label htmlFor='type'>Type:</label>
      <select id='type' onChange={e => handleSelectChange(e.target.value)} value={type}>
        <option value='' disabled>
          Choose...
        </option>
        {Object.values(EXERCISE_TYPES).map(option => (
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
          placeholder='0.0'
          step={0.1}
          min={0.1}
          onChange={e => setDistance(e.target.value)}
          value={distance}
          required
        />
        <label htmlFor='distance'>mi</label>
      </div>
    ) : null;

  const buttonsContainer = (
    <div className='form-field buttons-container'>
      <button
        className='btn add'
        onClick={handleSubmit}
        disabled={loading || !duration || (type.toUpperCase() === 'RUN' && !distance)}>
        {loading ? <div className='loader' /> : 'Add'}
      </button>
      <button type='button' className='btn cancel' onClick={closeModal} disabled={loading}>
        Cancel
      </button>
    </div>
  );

  return createPortal(
    <aside className='add-exercise__modal'>
      <motion.form className='add-exercise' initial={{ y: 0 }} animate={{ y: 10 }}>
        <h2>Log New Exercise</h2>
        <hr className='divider' />
        {dateField}
        {timeField}
        {typeField}
        {durationField}
        {distanceField}
        {noteField}
        {buttonsContainer}
      </motion.form>
    </aside>,
    document.body
  );
};
