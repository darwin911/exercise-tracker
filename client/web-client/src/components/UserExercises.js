import React, { useContext, useEffect, useState } from 'react';
import { TOGGLE_MODAL } from '../constants';
import { Exercise } from './Exercise';
import { ExercisesSummary } from './ExercisesSummary';
import { AuthContext } from '../Store';
import { AnimatePresence } from 'framer-motion';

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
      <div className='user-exercises'>
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
          </AnimatePresence>
          <div style={{ gridColumn: '1 / -1' }}>
            <button className='btn toggle-form' onClick={toggleModal}>
              Add Exercise
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className='loader'></div>;
  }
};
