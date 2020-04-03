import React, { useState, useContext } from 'react';
import { editExercise } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS, EXERCISE_TYPES } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
const { PUSH_UPS } = EXERCISE_TYPES;
const { UPDATE_EXERCISE, TOGGLE_MODAL } = CONSTANTS;

const DOMRoot = document.querySelector('#root');

export const EditExerciseModal = ({ exercise }) => {
  const { id, date, time, duration, note, distance, type, repetitions } = exercise;
  const [{ user }, dispatch] = useContext(AuthContext);

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleEdit = async values => {
    const { date, distance, duration, note, repetitions, time } = values;
    setLoading(true);

    const objectE = {
      date: moment(date).format(moment.HTML5_FMT.DATE),
      distance,
      duration,
      note,
      userId: user.id,
      username: user.username,
      repetitions,
      time,
    };

    const updatedExercise = await editExercise(id, objectE);

    if (updatedExercise) {
      handleSuccess(updatedExercise);
    } else {
      console.error('Error updating => ', updatedExercise);
      setLoading(false);
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

  const initValues = {
    date: moment.utc(date).format(moment.HTML5_FMT.DATE),
    time: moment().format(moment.HTML5_FMT.TIME),
    duration: duration,
    distance: distance,
    repetitions: repetitions,
    note: note,
  };

  return createPortal(
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='edit-exercise__modal'>
      <Formik initialValues={initValues} onSubmit={handleEdit}>
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => {
          const { date, duration, distance, note, repetitions, time } = values;
          return (
            <form
              className={`edit-exercise ${exercise.type.toLowerCase()}`}
              onSubmit={handleSubmit}>
              <Header />
              <div className='form-field date'>
                <label htmlFor='date'>Date:</label>
                <input
                  id='date'
                  type='date'
                  pattern='\d{4}-\d{2}-\d{2}'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={date}
                  required
                />
              </div>
              <div className='form-field time'>
                <label htmlFor='time'>Time:</label>
                <input
                  id='time'
                  type='time'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={time}
                  required
                />
              </div>
              {exercise.type !== PUSH_UPS ? (
                <div className='form-field duration'>
                  <label htmlFor='duration'>Duration: </label>
                  <input
                    id='duration'
                    type='number'
                    inputMode='numeric'
                    placeholder='0'
                    min={1}
                    max={360}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={duration}
                  />
                  <label htmlFor='duration'>min{duration > 1 && 's'}</label>
                </div>
              ) : (
                <div className='form-field repetitions'>
                  <label htmlFor='repetitions'>Repetitions: </label>
                  <input
                    id='repetitions'
                    type='number'
                    min={1}
                    max={9999}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={repetitions}
                  />
                </div>
              )}
              {distance && (
                <div className='form-field distance'>
                  <label htmlFor='note'>Distance: </label>
                  <input
                    id='distance'
                    type='number'
                    placeholder='0.0'
                    step={0.1}
                    min={0.1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={distance}
                    required
                  />
                  <label htmlFor='distance'>mi</label>
                </div>
              )}
              {note && (
                <div className='form-field note'>
                  <label htmlFor='note'>Note: </label>
                  <input
                    id='note'
                    type='text'
                    placeholder='Felt great!'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={note}
                  />
                </div>
              )}
              <div className='form-field buttons-container'>
                <button
                  className='btn edit'
                  disabled={
                    loading ||
                    (type !== PUSH_UPS && !duration) ||
                    (type === PUSH_UPS && !repetitions)
                  }>
                  {loading ? <div className='loader' /> : 'Save'}
                </button>
                <button
                  type='button'
                  className='btn cancel'
                  onClick={() => handleClose()}
                  disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </motion.aside>,
    DOMRoot
  );
};
