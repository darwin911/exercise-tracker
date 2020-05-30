import React, { useContext } from 'react';
import { AuthContext } from '../../Store';
import { CONSTANTS } from '../../constants';
import { updateUser } from '../../helper';

export const ProfileUnitsField = () => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const { SET_USER, UNITS } = CONSTANTS;

  const handleChangeUnits = async (e) => {
    let updatedUserObject = {};
    updatedUserObject[e.target.name] = e.target.value.toUpperCase();
    const updatedUser = await updateUser(user.id, updatedUserObject);
    dispatch({ type: SET_USER, payload: updatedUser });
  };

  return (
    <div className='form-field unit-system'>
      <h4>Units</h4>
      <label>
        <input
          type='radio'
          name='unitSystem'
          value={UNITS.IMPERIAL}
          onChange={(e) => handleChangeUnits(e)}
          checked={user.unitSystem === UNITS.IMPERIAL}
        />
        Imperial
      </label>
      <br />
      <label>
        <input
          type='radio'
          name='unitSystem'
          value={UNITS.METRIC}
          onChange={(e) => handleChangeUnits(e)}
          checked={user.unitSystem === UNITS.METRIC}
        />
        Metric
      </label>
    </div>
  );
};
