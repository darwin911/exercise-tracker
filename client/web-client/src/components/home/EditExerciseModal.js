import React, { useState, useContext } from 'react';
import { editExercise } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS, EXERCISE_TYPES } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
const { UPDATE_EXERCISE, TOGGLE_MODAL } = CONSTANTS;

const DOMRoot = document.querySelector('#root');

const DurationField = ({ input, update }) => (
  <div className='form-field duration'>
    <label htmlFor='duration'>Duration: </label>
    <input
      id='duration'
      type='number'
      inputMode='numeric'
      placeholder='0'
      min={1}
      max={360}
      onChange={e => update(e.target.value)}
      required
      value={input}
    />
    <label htmlFor='duration'>min{input > 1 && 's'}</label>
  </div>
);

const RepetitionsField = ({ input, update }) => (
  <div className='form-field repetitions'>
    <label htmlFor='repetitions'>Repetitions: </label>
    <input
      id='repetitions'
      type='number'
      min={1}
      max={9999}
      onChange={e => update(e.target.value)}
      required
      value={input}
    />
  </div>
);

const DateField = ({ input, update }) => (
  <div className='form-field date'>
    <label htmlFor='date'>Date:</label>
    <input
      id='date'
      type='date'
      pattern='\d{4}-\d{2}-\d{2}'
      onChange={e => update(e.target.value)}
      value={input}
      required
    />
  </div>
);

const TimeField = ({ input, update }) => (
  <div className='form-field time'>
    <label htmlFor='time'>Time:</label>
    <input id='time' type='time' onChange={e => update(e.target.value)} value={input} required />
  </div>
);

const DistanceField = ({ input, update }) => (
  <div className='form-field distance'>
    <label htmlFor='note'>Distance: </label>
    <input
      id='distance'
      type='number'
      placeholder='0.0'
      step={0.1}
      min={0.1}
      onChange={e => update(e.target.value)}
      value={input}
      required
    />
    <label htmlFor='distance'>mi</label>
  </div>
);

const NoteField = ({ input, update }) => (
  <div className='form-field note'>
    <label htmlFor='note'>Note: </label>
    <input
      id='note'
      type='text'
      placeholder='Felt great!'
      onChange={e => update(e.target.value)}
      required
      value={input}
    />
  </div>
);

export const EditExerciseModal = ({ exercise }) => {
  const { id, date, time, duration, note, distance, type, repetitions } = exercise;
  const [{ user }, dispatch] = useContext(AuthContext);
  const history = useHistory();
  const [inputDistance, editDistance] = useState(distance); // miles
  const [inputDate, editDate] = useState(moment.utc(date).format(moment.HTML5_FMT.DATE));
  const [inputTime, editTime] = useState(moment(time, 'Hmm').format(moment.HTML5_FMT.TIME));
  const [inputDuration, editDuration] = useState(duration);
  const [inputRepetitions, editRepetitions] = useState(repetitions);
  const [inputNote, editNote] = useState(note);
  const [loading, setLoading] = useState(false);

  const handleEdit = async e => {
    e.preventDefault();
    setLoading(true);

    const updatedExercise = await editExercise(id, {
      duration: inputDuration,
      userId: user.id,
      note: inputNote,
      date: moment(inputDate).format(moment.HTML5_FMT.DATE),
      username: user.username,
      repetitions: inputRepetitions,
      time: inputTime,
      distance: inputDistance,
    });

    if (updatedExercise) {
      handleSuccess(updatedExercise);
    } else {
      console.error('Error updating => ', updatedExercise);
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
    editDate(moment(exercise.date).format(moment.HTML5_FMT.DATE));
    editDuration('');
    editNote('');
    editDistance('');
  };

  const Header = () => (
    <>
      <header>
        <h2>Edit Exercise</h2>
        <h4 className='type'>{type}</h4>
      </header>
      <hr className='divider' />
    </>
  );

  const ButtonsContainer = () => (
    <div className='form-field buttons-container'>
      <button
        className='btn edit'
        onClick={e => handleEdit(e)}
        disabled={
          loading ||
          (type !== EXERCISE_TYPES.PUSH_UPS && !duration) ||
          (type === EXERCISE_TYPES.PUSH_UPS && !repetitions)
        }>
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
        <Header />
        <DateField input={inputDate} update={editDate} />
        <TimeField input={inputTime} update={editTime} />
        {type !== EXERCISE_TYPES.PUSH_UPS ? (
          <DurationField input={inputDuration} update={editDuration} />
        ) : (
          <RepetitionsField input={inputRepetitions} update={editRepetitions} />
        )}
        {distance && <DistanceField input={inputDistance} update={editDistance} />}
        <NoteField input={inputNote} update={editNote} />
        <ButtonsContainer />
      </motion.form>
    </aside>,
    DOMRoot
  );
};
