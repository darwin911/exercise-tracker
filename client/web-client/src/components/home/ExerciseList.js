import React, { useEffect, useContext, useState } from 'react';
import { Exercise } from './Exercise';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Store';

const filterExercisesByType = (value = 'All', exerciseCollection) => {
  if (value === 'All') return exerciseCollection;
  return exerciseCollection.filter(ex => ex.type === value);
};

export const ExerciseList = () => {
  const [{ filter, exercises }, dispatch] = useContext(AuthContext);

  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredExercises(exercises);
      return;
    }

    setFilteredExercises(filterExercisesByType(filter, exercises));
  }, [filter, exercises]);

  let renderExerciseList = filteredExercises.length ? filteredExercises : exercises;

  if (!filteredExercises.length) return <EmptyFilterResult />;

  return (
    <motion.div className='exercises__container'>
      <AnimatePresence>
        {renderExerciseList.map(exercise => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const EmptyFilterResult = () => (
  <div>
    <h3>Sorry</h3>
    <p>No exercises found.</p>
  </div>
);
