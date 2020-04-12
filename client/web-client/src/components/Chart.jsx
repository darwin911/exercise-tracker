import React, { useState, useContext } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AuthContext } from '../Store';
import { EXERCISE_TYPES } from '../constants';
import { Debug } from './Debug';
const exerciseTypes = Object.values(EXERCISE_TYPES);

export const Chart = () => {
  const [state] = useContext(AuthContext);

  const [selectedExerciseTypes, setSelectedTypes] = useState(exerciseTypes);

  const durationExercisesObjects = state.exercises
    .filter((ex) => ex.duration && selectedExerciseTypes.includes(ex.type))
    .map((ex) => ({ type: ex.type, duration: ex.duration }));

  const handleChange = (event) => {
    const { name } = event.target;
    const isIncluded = selectedExerciseTypes.includes(name);
    console.log('isIncluded', isIncluded);
    // confirm if TYPE checked = true

    setSelectedTypes((prevSelected) => {
      if (isIncluded) {
        return prevSelected.filter((item) => item !== name);
      } else {
        return [...prevSelected, name];
      }
    });
    // toggle value of TYPE
    // Add/Remove from selectedExerciseTypes [string, string]
  };

  return (
    <div className='chart'>
      <h2>Chart!</h2>
      <div className=''>
        <p>Select Exercises to Track:</p>
        {/* <Debug data={selectedExerciseTypes} /> */}
        <form>
          {exerciseTypes.map((type) => (
            <div key={type}>
              <label htmlFor={type}>{type}</label>
              <input
                id={type}
                name={type}
                type='checkbox'
                checked={selectedExerciseTypes.includes(type)}
                onChange={(e) => handleChange(e)}
              />
            </div>
          ))}
        </form>
      </div>
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={durationExercisesObjects}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <Line type='monotone' dataKey='duration' stroke='#a64eff' />
          <CartesianGrid stroke='#cccccc80' strokeDasharray='2 2' />
          <XAxis dataKey='type' />
          <YAxis dataKey='duration' />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
