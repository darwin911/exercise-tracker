import React from 'react';
import { useHistory } from 'react-router-dom';
import { AddSVG } from './AddSVG';

export const AddExerciseButton = () => {
  const history = useHistory();
  const toggleModal = () => {
    history.push('/home/add');
  };
  return (
    <button className='btn toggle-form' onClick={() => toggleModal()}>
      <AddSVG fill={'white'} />
    </button>
  );
};
