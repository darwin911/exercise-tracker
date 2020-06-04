import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Store';
import { updateUser } from '../../helper';
import { CONSTANTS } from '../../constants';

const { SET_USER } = CONSTANTS;

export const ProfileField = ({ field }) => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const userfieldVal = user[`${field}`];

  const [value, setValue] = useState(userfieldVal);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    let updatedUserObject = {};
    updatedUserObject[field] = value;
    const updatedUser = await updateUser(user.id, updatedUserObject);
    dispatch({ type: SET_USER, payload: updatedUser });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setValue(user[`${field}`]);
  };

  const fieldKey = field.charAt(0).toUpperCase() + field.slice(1);
  const isWeightField = field !== 'weight' ? 'text' : 'number';

  const handleChange = (e) => {
    setValue(e.target.value);
    // Todo: handle confirmation of change
    if (field === 'weight') return;
  };

  const EditButton = () => (
    <button
      className='profile__edit-field-button'
      onClick={() => setIsEditing((prevVal) => !prevVal)}>
      Edit
    </button>
  );

  const ConfirmButton = () =>
    isEditing && (
      <button
        className='profile__confirm-field-button'
        style={{ background: 'green' }}
        onClick={(e) => handleEdit()}>
        Confirm
      </button>
    );

  const CancelButton = () => (
    <button
      className='profile__cancel-field-button'
      style={{ background: 'crimson' }}
      onClick={() => cancelEdit()}>
      Cancel
    </button>
  );

  return (
    <div className='profile__field'>
      <h4>{fieldKey}</h4>
      <input
        className='profile__field-input'
        type={isWeightField}
        disabled={!isEditing}
        value={value}
        onChange={(e) => handleChange(e)}
      />
      <div>
        {!isEditing ? <EditButton /> : <CancelButton />}
        <ConfirmButton />
      </div>
      <br />
    </div>
  );
};
