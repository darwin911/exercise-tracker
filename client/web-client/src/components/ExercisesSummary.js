import React, { useContext } from 'react';
import { AuthContext } from '../Store';

export const ExercisesSummary = () => {
  const { user, exercises } = useContext(AuthContext)[0];

  const totalMinutes = getTotalMinutes(exercises);
  const exerciseCount = exercises.length;
  const totalMiles = getTotalMiles(exercises);

  let defaultUserName = 'Guest';

  if (user) {
    defaultUserName = user.username;
  }

  return (
    <>
      <div className='user-exercises__summary'>
        <h4 className='user-exercises__summary__heading'>{defaultUserName}'s Exercises</h4>
        <p className='user-exercises__summary__total-mins'>
          {totalMinutes} <span>Mins</span>
        </p>
        <p className='user-exercises__summary__total-exercises'>
          {exerciseCount} <span>Exercises</span>
        </p>
        <p className='user-exercises__summary__total-miles'>
          {totalMiles} <span>Miles</span>
        </p>
      </div>
      <hr />
    </>
  );
};

const getTotalMiles = exerciseCollection => {
  return (
    Math.round(
      exerciseCollection
        .filter(exercise => exercise.distance)
        .reduce((acc, item) => acc + item.distance, 0) * 100
    ) / 100
  );
};

const getTotalMinutes = exerciseCollection => {
  return exerciseCollection.reduce((total, exercise) => total + exercise.duration, 0);
};
