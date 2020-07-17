import React, { useState, useContext } from 'react';
import { editExercise } from '../../helper';
import { AppContext } from '../../Store';
import { CONSTANTS, EXERCISE_TYPES } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
const { PUSH_UPS } = EXERCISE_TYPES;
const { UPDATE_EXERCISE, TOGGLE_MODAL } = CONSTANTS;

const DOMRoot = document.querySelector('#root');

export const EditExerciseModal = ({ exercise }) => {
  const { id, date, time, duration, note, distance, type, repetitions } = exercise;
  const [{ user }, dispatch] = useContext(AppContext);

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleEdit = async (values) => {
    setLoading(true);

    const updatedExercise = await editExercise(id, {
      userId: user.id,
      username: user.username,
      ...values,
    });

    if (updatedExercise) {
      handleSuccess(updatedExercise);
    } else {
      console.error('Error updating => ', updatedExercise);
      setLoading(false);
    }
  };

  const handleSuccess = (updatedExercise) => {
    dispatch({ type: UPDATE_EXERCISE, payload: updatedExercise });
    dispatch({ type: TOGGLE_MODAL });
    resetForm();
    history.push(`/home/${user.id}`);
  };

  const handleClose = () => {
    dispatch({ type: TOGGLE_MODAL });
    history.push(`/home/${user.id}`);
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
    time: moment(time, 'Hmm').format(moment.HTML5_FMT.TIME),
    duration: duration,
    distance: distance,
    repetitions,
    note,
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
            <Form
              className={`edit-exercise ${exercise.type.toLowerCase()}`}
              onSubmit={handleSubmit}>
              <Header />
              <div className='form-field date'>
                <label htmlFor='date'>Date:</label>
                <Field
                  id='date'
                  name='date'
                  type='date'
                  pattern='\d{4}-\d{2}-\d{2}'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={date}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className='form-field time'>
                <label htmlFor='time'>Time:</label>
                <Field
                  id='time'
                  name='time'
                  type='time'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={time}
                  disabled={isSubmitting}
                  required
                />
              </div>
              {exercise.type !== PUSH_UPS ? (
                <div className='form-field duration'>
                  <label htmlFor='duration'>Duration: </label>
                  <Field
                    id='duration'
                    name='duration'
                    type='number'
                    inputMode='numeric'
                    placeholder='0'
                    min={1}
                    max={9999}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={duration}
                    disabled={isSubmitting}
                    required
                  />
                  <label htmlFor='duration'>min{duration > 1 && 's'}</label>
                </div>
              ) : (
                <div className='form-field repetitions'>
                  <label htmlFor='repetitions'>Repetitions: </label>
                  <ErrorMessage name='repetitions'>
                    {(msg) => <span className='input-error'>{msg}</span>}
                  </ErrorMessage>
                  <Field
                    id='repetitions'
                    name='repetitions'
                    type='number'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={repetitions}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              )}
              {distance && (
                <div className='form-field distance'>
                  <label htmlFor='note'>Distance: </label>
                  <Field
                    id='distance'
                    name='distance'
                    type='number'
                    placeholder='0.0'
                    step={0.1}
                    min={0.1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={distance}
                    disabled={isSubmitting}
                    required
                  />
                  <label htmlFor='distance'>mi</label>
                </div>
              )}
              {note && (
                <div className='form-field note'>
                  <label htmlFor='note'>Note: </label>
                  <Field
                    as='textarea'
                    rows='2'
                    id='note'
                    name='note'
                    type='text'
                    placeholder='Felt great!'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={note}
                    disabled={isSubmitting}
                    required
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
            </Form>
          );
        }}
      </Formik>
    </motion.aside>,
    DOMRoot
  );
};
