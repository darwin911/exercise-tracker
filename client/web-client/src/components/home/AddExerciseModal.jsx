import React, { useState, useContext } from 'react';
import { addExercise } from '../../helper';
import { AuthContext } from '../../Store';
import { CONSTANTS, EXERCISE_TYPES, TRANSITIONS } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
const { ADD_EXERCISE, TOGGLE_MODAL } = CONSTANTS;
const { PUSH_UPS, RUN } = EXERCISE_TYPES;

export const AddExerciseModal = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, modalOpen } = state;
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ date, distance, duration, time, type, repetitions, note }) => {
    setLoading(true);

    const newExercise = await addExercise({
      duration,
      userId: user.id,
      note,
      date,
      username: user.username,
      repetitions,
      type,
      time,
      distance,
    });

    if (newExercise) {
      dispatch({ type: ADD_EXERCISE, payload: newExercise });
    }

    dispatch({ type: TOGGLE_MODAL });
    setLoading(false);
    history.push('/home');
  };

  const closeModal = () => {
    if (modalOpen) {
      dispatch({ type: TOGGLE_MODAL });
    }
    history.push('/home');
  };

  const initValues = {
    date: moment().format(moment.HTML5_FMT.DATE),
    time: moment().format(moment.HTML5_FMT.TIME),
    type: '',
    duration: '',
    distance: '',
    repetitions: '',
    note: '',
  };

  return createPortal(
    <motion.aside
      className='add-exercise__modal'
      initial={{ x: '-10%', opacity: 0.15 }}
      animate={{ x: '0', opacity: 1 }}
      transition={TRANSITIONS.SPRING}>
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting }) => {
          const { type, date, duration, distance, note, repetitions, time } = values;
          const addButtonDisabledState =
            loading ||
            (type !== PUSH_UPS && !duration) ||
            (type === PUSH_UPS && !repetitions) ||
            (type === RUN && !distance);
          return (
            <form className='add-exercise' onSubmit={handleSubmit}>
              <h2>Log New Exercise</h2>
              <br />
              <hr className='divider' />

              <div className='form-field date'>
                <label htmlFor='date'>Date:</label>
                <input
                  id='date'
                  type='date'
                  pattern='\d{4}-\d{2}-\d{2}'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={date}
                  max={moment().format(moment.HTML5_FMT.DATE)}
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

              <div className='form-field type'>
                <label htmlFor='type'>Type:</label>
                <select
                  id='type'
                  name='type'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={type}>
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

              {type !== PUSH_UPS ? (
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

              {type === RUN ? (
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
              ) : null}

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

              <div className='form-field buttons-container'>
                <button
                  type='submit'
                  className='btn add'
                  onClick={handleSubmit}
                  disabled={addButtonDisabledState}>
                  {loading ? <div className='loader' /> : 'Add'}
                </button>
                <button
                  type='button'
                  className='btn cancel'
                  onClick={() => closeModal()}
                  disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </motion.aside>,
    document.body
  );
};
