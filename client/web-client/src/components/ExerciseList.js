import React from 'react';
import { Exercise } from './Exercise';
import { AnimatePresence } from 'framer-motion';

export const ExerciseList = ({ exercises }) => {
  return (
    <AnimatePresence>
      {exercises.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </AnimatePresence>
  );
};
