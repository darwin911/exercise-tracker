import React from 'react';
import { Link } from 'react-router-dom';

const workoutSeed = [
  {
    name: 'Push-ups',
    repetitions: 8,
    sets: 3,
    completedSets: 0,
  },
  {
    name: 'Stretching',
    duration: 30,
    isComplete: false,
  },
];

export const Workouts = ({ workouts = workoutSeed }) => {
  return (
    <section className='workouts'>
      <h2>Workouts</h2>
      <div className='workout-list'>
        {workouts.map((item, idx) => (
          <Item key={idx} workoutItem={item} />
        ))}
      </div>
      <div>
        <h6>Make your own Workout</h6>
        <Link to='/home/create-workout'>Create</Link>
      </div>
    </section>
  );
};

const Item = ({ workoutItem }) => {
  const [isCompleted, setCompleted] = React.useState(false);
  const [workout, setWorkout] = React.useState(workoutItem);

  React.useEffect(() => {
    console.log(workout);
    if (workout.completedSets >= workout.sets) {
      setCompleted(true);
    } else if (workout.isComplete) {
      console.log('isComplete!');
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [workout]);

  return (
    <div className='workout-item'>
      <p
        className='workout-item--exercise'
        style={{
          textDecoration: isCompleted ? 'line-through' : 'initial',
          display: 'inline-block',
        }}>
        {workoutItem.name}
        {workout.sets && <span>{`${workout.completedSets} / ${workoutItem.sets}`}</span>}
      </p>
      {(workout.isComplete || isCompleted) && <span style={{ marginLeft: '1rem' }}>&#10004;</span>}
      {Array(workout.sets)
        .fill(null)
        .map((x, idx) => (
          <SubItem key={idx} workout={workout} setWorkout={setWorkout} />
        ))}
      <br />
    </div>
  );
};

const SubItem = ({ workout, setWorkout }) => {
  const [isCompleted, setCompleted] = React.useState(false);
  const handleChange = () => {
    if (!workout.duration) {
      setCompleted((val) => !val);
      setWorkout((prevState) => {
        return {
          ...prevState,
          completedSets: !isCompleted ? prevState.completedSets + 1 : prevState.completedSets - 1,
        };
      });
    } else {
      setCompleted((val) => !val);
      setWorkout((prevState) => {
        return {
          ...prevState,
          isComplete: !prevState.isComplete,
        };
      });
    }
  };
  return (
    <div>
      <label
        style={{
          textDecoration: isCompleted ? 'line-through' : 'initial',
          opacity: isCompleted ? 0.25 : 1,
        }}>
        {workout.repetitions} {workout.name}{' '}
        <span>{workout.duration && workout.duration + ' mins'}</span>
        <input
          type='checkbox'
          name='sub-item'
          value={isCompleted}
          onChange={() => handleChange()}
        />
      </label>
    </div>
  );
};
