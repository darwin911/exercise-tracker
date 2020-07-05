import React, { useContext } from 'react';
import { Exercise } from './Exercise';
import { AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Store';

export const ExerciseList = ({ exercises }) => {
  const { filterByType, filterByDate } = useContext(AuthContext)[0];

  if (!exercises.length)
    return <EmptyFilterResult typeFilter={filterByType} dateFilter={filterByDate} />;

  return (
    <article className='exercises__container'>
      <AnimatePresence>
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </AnimatePresence>
    </article>
  );
};

const EmptyFilterResult = ({ typeFilter, dateFilter }) => (
  <article className='empty-filter-result'>
    <h3>No Results</h3>
    <p>
      No{typeFilter === 'ALL' ? '' : ` ${typeFilter}`} exercises found in {dateFilter.toLowerCase()}
      .
    </p>
  </article>
);
