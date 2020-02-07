import React, { useState, useEffect } from 'react';
import { Exercise } from './Exercise';

export const UserExercises = ({ user, exercises, setExercises }) => {
  return (
    <>
      {user && <h4>{user ? user.username : 'Guest'}'s Exercises</h4>}
      {exercises.map(exercise => (
        <Exercise
          key={exercise._id}
          exercise={exercise}
          setExercises={setExercises}
        />
      ))}
    </>
  );
};
