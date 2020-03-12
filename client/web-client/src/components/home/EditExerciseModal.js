import React, { useState, useContext } from 'react';
import { editExercise } from '../../helper';
import { AuthContext } from '../../Store';
import { UPDATE_EXERCISE, TOGGLE_MODAL } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export const EditExerciseModal = ({ exercise }) => {
  const [state, dispatch] = useContext(AuthContext);
  const { user } = state;
  const history = useHistory();

  const [distance, setDistance] = useState(exercise.distance); // Units in miles (imperial)
  const [date, setDate] = useState(moment(exercise.date).format(moment.HTML5_FMT.DATE));
  const [time, setTime] = useState(moment(exercise.time, 'Hmm').format(moment.HTML5_FMT.TIME));
  const [duration, setDuration] = useState(exercise.duration);
  const [note, setNote] = useState(exercise.note);

  const [loading, setLoading] = useState(false);

  const handleEdit = async e => {
    e.preventDefault();
    setLoading(true);

    let exerciseObj = {
      duration,
      userId: user.id,
      note,
      date: moment(date).format(moment.HTML5_FMT.DATE),
      username: user.username,
      time,
      type: exercise.type,
      distance,
    };

    const updatedExercise = await editExercise(exercise.id, exerciseObj);

    if (updatedExercise) {
      handleSuccess(updatedExercise);
    }
  };

  const handleSuccess = updatedExercise => {
    dispatch({ type: UPDATE_EXERCISE, payload: updatedExercise });
    dispatch({ type: TOGGLE_MODAL });
    resetForm();
    history.push('/home');
  };

  const handleClose = () => {
    dispatch({ type: TOGGLE_MODAL });
    history.push('/home');
    resetForm();
  };

  const resetForm = () => {
    setLoading(false);
    setLoading(false);
    setDate(moment(exercise.date).format(moment.HTML5_FMT.DATE));
    setDuration('');
    setNote('');
    setDistance('');
  };

  const DateField = () => (
    <div className='form-field date'>
      <label htmlFor='date'>Date:</label>
      <input
        id='date'
        type='date'
        pattern='\d{4}-\d{2}-\d{2}'
        onChange={e => setDate(e.target.value)}
        value={date}
        required
      />
    </div>
  );

  const TimeField = () => (
    <div className='form-field time'>
      <label htmlFor='time'>Time:</label>
      <input id='time' type='time' onChange={e => setTime(e.target.value)} value={time} required />
    </div>
  );

  const DurationField = () => (
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

  const DistanceField = () =>
    exercise.distance ? (
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

  const NoteField = () => (
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

  const ButtonsContainer = () => (
    <div className='form-field buttons-container'>
      <button className='btn edit' onClick={e => handleEdit(e)} disabled={loading || !duration}>
        {loading ? <div className='loader' /> : 'Save'}
      </button>
      <button type='button' className='btn cancel' onClick={() => handleClose()} disabled={loading}>
        Cancel
      </button>
    </div>
  );

  return createPortal(
    <aside className='edit-exercise__modal'>
      <motion.form
        className={`edit-exercise ${exercise.type.toLowerCase()}`}
        initial={{ y: 0 }}
        animate={{ y: 10 }}>
        <header>
          <h2>Edit Exercise</h2>
          <h4 className='type'>{exercise.type}</h4>
        </header>
        <hr className='divider' />
        <DateField />
        <TimeField />
        <DurationField />
        <DistanceField />
        <NoteField />
        <ButtonsContainer />
      </motion.form>
    </aside>,
    document.body
  );
};
