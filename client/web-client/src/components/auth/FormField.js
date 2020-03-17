import React from 'react';

export const FormField = ({ inputType, value, setter }) => {
  switch (inputType) {
    case 'email':
      return (
        <div className='form-field'>
          <label htmlFor='email'>Email</label>
          <input
            id={inputType}
            type={inputType}
            name={inputType}
            autoFocus
            autoComplete='username'
            placeholder='name@email.com'
            onChange={e => setter(e.target.value)}
            value={value}
            required
          />
        </div>
      );
    case 'password':
      return (
        <div className='form-field'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            autoComplete='current-password'
            placeholder='p@s5w0rd'
            onChange={e => setter(e.target.value)}
            value={value}
            required
          />
        </div>
      );
    case 'username':
      return (
        <div className='form-field'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            name='username'
            autoComplete='name'
            placeholder='select a username'
            onChange={e => setter(e.target.value)}
            value={value}
            required
          />
        </div>
      );
    default:
      return null;
  }
};
