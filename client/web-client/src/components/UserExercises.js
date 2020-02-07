import React from 'react';
import { Exercise } from './Exercise';
import { AddExercise } from './AddExercise';

export const UserExercises = ({ user, exercises, setExercises }) => {
  return (
    <div className='user-exercises'>
      {user && <h4>{user ? user.username : 'Guest'}'s Exercises</h4>}
      {exercises.map(exercise => (
        <Exercise
          key={exercise._id}
          exercise={exercise}
          setExercises={setExercises}
        />
      ))}
      <hr />
      <AddExercise user={user} setExercises={setExercises} />
    </div>
  );
};
