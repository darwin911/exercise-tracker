import React from 'react';

export const ExercisesSummary = ({ username, exercises }) => {
  const totalExerciseMins = exercises.reduce((total, exercise) => total + exercise.duration, 0);
  const totalExercises = exercises.length;
  const totalMiles =
    Math.round(
      exercises
        .filter(exercise => exercise.distance)
        .reduce((acc, item) => acc + item.distance, 0) * 100
    ) / 100;
  return (
    <>
      <div className='user-exercises__summary'>
        <h4 className='user-exercises__summary__heading'>{username}'s Exercises</h4>
        <p className='user-exercises__summary__total-mins'>
          {totalExerciseMins} <span>Mins</span>
        </p>
        <p className='user-exercises__summary__total-exercises'>
          {totalExercises} <span>Exercises</span>
        </p>
        <p className='user-exercises__summary__total-miles'>
          {totalMiles} <span>Miles</span>
        </p>
      </div>
      <hr />
    </>
  );
};
