import React, { useContext } from 'react';
import { deleteUser } from '../../helper';
import { AppContext } from '../../Store';
import { CONSTANTS, TRANSITIONS } from '../../constants';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

const { LOGOUT } = CONSTANTS;

export const ConfirmDeleteAccountModal = ({ userId }) => {
  const [{ user }, dispatch] = useContext(AppContext);
  const history = useHistory();

  const handleCancel = () => {
    history.push('/profile/' + userId);
  };

  const handleDelete = async () => {
    await deleteUser(user.id);
    dispatch({ type: LOGOUT });
    history.push('/auth/login');
  };

  return createPortal(
    <motion.div
      className='modal'
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={TRANSITIONS.SPRING}>
      <div className='delete-account'>
        <h2>Confirm Account Deletion</h2>
        <p>
          This action will delete all of your user account information, including your Profile and
          Exercise data. This action will be permanent.
        </p>
        <button onClick={() => handleCancel()}>Cancel</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </motion.div>,
    document.body
  );
};
