import React from 'react';
import { Exercise } from './Exercise';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

export const ExerciseList = ({ exercises }) => {
  if (!exercises.length)
    return (
      <div>
        <h3>Sorry</h3>
        <p>No exercises found.</p>
      </div>
    );
  return (
    <motion.div className='exercises__container'>
      <AnimatePresence>
        {exercises.map(exercise => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
