import React, { useContext } from 'react';
import { AuthContext } from '../../Store';

export const ExercisesSummary = ({ minutes, count, miles }) => {
  const { user } = useContext(AuthContext)[0];

  let defaultUserName = 'Guest';

  if (user) {
    defaultUserName = user.username;
  }

  return (
    <>
      <div className='user-exercises__summary'>
        <h4 className='user-exercises__summary__heading'>{defaultUserName}'s Exercises</h4>
        <p className='user-exercises__summary__total-mins'>
          {minutes} <span>Mins</span>
        </p>
        <p className='user-exercises__summary__total-exercises'>
          {count} <span>Exercises</span>
        </p>
        <p className='user-exercises__summary__total-miles'>
          {miles} <span>Miles</span>
        </p>
      </div>
      <hr />
    </>
  );
};
