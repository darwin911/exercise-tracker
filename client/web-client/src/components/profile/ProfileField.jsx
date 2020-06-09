import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Store';
import { updateUser } from '../../helper';
import { CONSTANTS } from '../../constants';

const { SET_USER, UNITS } = CONSTANTS;

const convertToKg = (lbs) => Number(lbs / 2.2046).toFixed(1);

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
  const isWeightField = field === 'weight';

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

  const weightLabel = user.unitSystem === UNITS.IMPERIAL ? 'Lbs' : 'Kg';

  const WeightFieldHeading = (
    <h4>
      {fieldKey} <span style={{ fontWeight: 300, fontSize: '0.8em' }}>({weightLabel})</span>
    </h4>
  );

  const DefaultHeading = <h4>{fieldKey}</h4>;

  return (
    <div className='profile__field'>
      {isWeightField ? WeightFieldHeading : DefaultHeading}
      <input
        name={fieldKey}
        className='profile__field-input'
        type={isWeightField ? 'number' : 'text'}
        disabled={!isEditing}
        value={isWeightField && user.unitSystem === UNITS.METRIC ? convertToKg(value) : value}
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
