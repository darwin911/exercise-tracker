import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TOGGLE_MODAL } from '../constants';
import { AuthContext } from '../Store';
import { AddSVG } from './AddSVG';

export const AddExerciseButton = () => {
  const dispatch = useContext(AuthContext)[1];
  const history = useHistory();
  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
    history.push('/home/add');
  };
  return (
    <button className='btn toggle-form' onClick={() => toggleModal()}>
      <AddSVG fill={'white'} />
    </button>
  );
};
