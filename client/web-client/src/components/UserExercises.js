import React, { useContext, useEffect, useState } from 'react';
import { TOGGLE_MODAL } from '../constants';
import { ExercisesSummary } from './ExercisesSummary';
import { ExerciseList } from './ExerciseList';
import { AuthContext } from '../Store';

export const UserExercises = () => {
  const [state, dispatch] = useContext(AuthContext);
  const {
    user,
    exercises,
    loading,
    filteredExercises,
    exerciseCount,
    exerciseMins,
    totalMiles,
  } = state;

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
  };

  if (!loading) {
    return (
      <div className='user-exercises'>
        <ExercisesSummary
          username={user ? user.username : 'Guest'}
          totalExercises={exerciseCount}
          totalExerciseMins={exerciseMins}
          totalMiles={totalMiles}
        />
        <hr />

        <div className='exercises__container'>
          <ExerciseList exercises={exercises} />
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
