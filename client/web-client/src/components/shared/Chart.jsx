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
import { AppContext } from '../../Store';
import { EXERCISE_TYPES } from '../../constants';
import moment from 'moment';
const exerciseTypes = Object.values(EXERCISE_TYPES);

export const Chart = () => {
  const [state] = useContext(AppContext);

  const [selectedExerciseTypes, setSelectedTypes] = useState(exerciseTypes);

  const durationExercisesObjects = state.exercises
    .filter((ex) => ex.duration && selectedExerciseTypes.includes(ex.type))
    .sort((a, b) => {
      const values = { a: moment(a.date), b: moment(b.date) };
      const isBefore = moment(values.a).isBefore(values.b);
      return isBefore ? -1 : 1;
    });

  console.log(durationExercisesObjects);

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0].payload) {
      const { date, type } = payload[0].payload;
      return (
        <div className='custom-tooltip'>
          <p className='desc'>{`${type}`}</p>
          <p className='date'>{moment(date).format('ddd, MMMM DD')}</p>
          <p className='intro'>{`${payload[0].value} mins`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='chart'>
      <h2>Charts!</h2>
      <div className='chart__container'>
        <p>Select Exercises to Track:</p>
        <form className='chart__filter'>
          {exerciseTypes.map((type) => (
            <div key={type}>
              <input
                id={type}
                name={type}
                type='checkbox'
                checked={selectedExerciseTypes.includes(type)}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </form>
      </div>
      <ResponsiveContainer width={'100%'} height={420}>
        <LineChart
          data={durationExercisesObjects.map((ex) => ({
            ...ex,
            date: moment(ex.date).format('DD MMM'),
          }))}
          margin={{ top: 50, right: 30, left: 0, bottom: 50 }}>
          <Line type='monotone' dataKey='duration' stroke='#a64eff' strokeWidth={1.5} />
          <CartesianGrid stroke='rgba(255, 255, 255, 0.15)' strokeDasharray='2 2' />
          <XAxis dataKey='date' stroke='rgba(255, 255, 255, 0.95)' />
          <YAxis stroke='rgba(255, 255, 255, 0.95)' />
          <Tooltip cursor={{ stroke: '#4B9BFC', strokeWidth: 1.5 }} content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
