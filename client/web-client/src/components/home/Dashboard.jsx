import React, { useContext } from 'react';
import { ExercisesSummary, FilterExercises } from './index';
import { AddExerciseButton } from '../shared/index';
import { AppContext } from '../../Store';

export const Dashboard = ({ data }) => {
  const [{ user }] = useContext(AppContext);
  return (
    <>
      <aside className='dashboard'>
        <h3 className='dashboard__heading'>Dashboard</h3>
        <ExercisesSummary username={user ? user.username : 'Guest'} {...data} />
        <div className='filter__container'>
          <FilterExercises />
          <AddExerciseButton />
        </div>
      </aside>
    </>
  );
};
