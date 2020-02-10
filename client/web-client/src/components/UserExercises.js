import React, { useContext } from 'react';
import { Exercise } from './Exercise';
import { AddExercise } from './AddExercise';
import { ExercisesSummary } from './ExercisesSummary';
import { AuthContext } from '../Store';
import { AnimatePresence } from 'framer-motion';

export const UserExercises = () => {
  const state = useContext(AuthContext)[0];
  const { user, exercises, loading } = state;

  const totalExerciseMins = exercises.reduce(
    (total, exercise) => total + exercise.duration,
    0
  );

  if (!loading) {
    return (
      <div className='user-exercises'>
        <ExercisesSummary
          username={user ? user.username : 'Guest'}
          totalExercises={exercises.length}
          totalExerciseMins={totalExerciseMins}
        />
        <hr />
        <AnimatePresence>
          {exercises.map(exercise => (
            <Exercise key={exercise._id} exercise={exercise} />
          ))}
        </AnimatePresence>
        <AddExercise />
        <hr />
      </div>
    );
  } else {
    return <div className='loader'></div>;
  }
};
