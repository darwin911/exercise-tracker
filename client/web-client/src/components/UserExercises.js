import React, { useContext, useEffect, useState } from 'react';
import { TOGGLE_MODAL } from '../constants';
import { Exercise } from './Exercise';
import { ExercisesSummary } from './ExercisesSummary';
import { AuthContext } from '../Store';
import { motion, AnimatePresence } from 'framer-motion';

export const UserExercises = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, exercises, loading } = state;
  const [totalMins, setTotalMins] = useState(0);

  useEffect(() => {
    setTotalMins(
      exercises.reduce((total, exercise) => total + exercise.duration, 0)
    );
  }, [exercises]);

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  if (!loading) {
    return (
      <motion.div
        className='user-exercises'
        animate={{ height: '100%' }}
        initial={{ height: '100%' }}>
        <ExercisesSummary
          username={user ? user.username : 'Guest'}
          totalExercises={exercises.length}
          totalExerciseMins={totalMins}
        />
        <hr />

        <div className='exercises__container'>
          <AnimatePresence>
            {exercises.map(exercise => (
              <Exercise key={exercise.id} exercise={exercise} />
            ))}
            <button className='btn toggle-form' onClick={toggleModal}>
              Add Exercise
            </button>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  } else {
    return <div className='loader'></div>;
  }
};
