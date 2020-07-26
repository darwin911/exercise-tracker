import React, { useState, useContext } from 'react';
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AppContext } from '../../Store';
import {
  EXERCISE_TYPES,
  // COLORS
} from '../../constants';
import moment from 'moment';
const exerciseTypes = Object.values(EXERCISE_TYPES);

export const StackedChart = () => {
  const [state] = useContext(AppContext);

  const [selectedExerciseTypes] = useState(exerciseTypes);

  const durationExercisesObjects = state.exercises
    .filter((ex) => ex.duration && selectedExerciseTypes.includes(ex.type))
    .sort((a, b) => {
      const values = { a: moment(a.date), b: moment(b.date) };
      const isBefore = moment(values.a).isBefore(values.b);
      return isBefore ? -1 : 1;
    });

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
      <ResponsiveContainer width={'100%'} height={420}>
        <BarChart
          data={durationExercisesObjects.map((ex) => ({
            ...ex,
            date: moment(ex.date).format('DD MMM'),
          }))}
          margin={{ top: 50, right: 30, left: 0, bottom: 50 }}>
          <CartesianGrid stroke='rgba(255, 255, 255, 0.15)' strokeDasharray='2 2' />
          <XAxis dataKey='date' stroke='rgba(255, 255, 255, 0.95)' />
          <YAxis stroke='rgba(255, 255, 255, 0.95)' />
          <Tooltip cursor={{ stroke: '#4B9BFC', strokeWidth: 1.5 }} content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey='duration' stackId='duration' fill='#8884d8' />
          <Bar dataKey='duration' stackId='duration' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
