import React, { useContext, useEffect, useState } from 'react';
import { TOGGLE_MODAL } from '../constants';
import { ExercisesSummary } from './ExercisesSummary';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../Store';
import { AnimatePresence } from 'framer-motion';

export const UserExercises = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { user, exercises, loading, filteredExercises } = state;
  const [totalMins, setTotalMins] = useState(0);
  const [numExercises, setNumExercises] = useState(0);

  useEffect(() => {
    if (filteredExercises) {
      setTotalMins(
        filteredExercises.reduce(
          (total, exercise) => total + exercise.duration,
          0
        )
      );
      setNumExercises(filteredExercises.length);
    } else {
      setTotalMins(
        exercises.reduce((total, exercise) => total + exercise.duration, 0)
      );
      setNumExercises(exercises.length);
    }
  }, [exercises, filteredExercises]);

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  if (!loading) {
    return (
      <div className='user-exercises'>
        <ExercisesSummary
          username={user ? user.username : 'Guest'}
          totalExercises={numExercises}
          totalExerciseMins={totalMins}
        />
        <hr />

        <div className='exercises__container'>
          <AnimatePresence>
            <ExerciseList exercises={filteredExercises || exercises} />
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
