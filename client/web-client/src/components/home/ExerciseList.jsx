import React, { useContext } from 'react';
import { Exercise } from './Exercise';
import { AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Store';

export const ExerciseList = ({ exercises }) => {
  const { filter } = useContext(AuthContext)[0];

  if (!exercises.length) return <EmptyFilterResult selectValue={filter} />;

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

const EmptyFilterResult = ({ selectValue }) => (
  <div>
    <h3>Sorry</h3>
    <p>No{selectValue === 'ALL' ? '' : ` ${selectValue}`} exercises found.</p>
  </div>
);