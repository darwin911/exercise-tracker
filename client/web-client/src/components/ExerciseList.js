import React from 'react';
import { Exercise } from './Exercise';

export const ExerciseList = ({ exercises }) => {
  return exercises.map(exercise => (
    <Exercise key={exercise.id} exercise={exercise} />
  ));
};
