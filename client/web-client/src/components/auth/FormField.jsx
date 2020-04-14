import React from 'react';
import { Field } from 'formik';

export const FormField = ({ inputType, value, handleChange, handleBlur, error, disabled }) => {
  switch (inputType) {
    case 'name':
      return (
        <div className='form-field'>
          <label htmlFor='name'>Name</label>
          <Field
            id={'name'}
            className={error ? 'has-error' : null}
            type={'text'}
            name={'name'}
            placeholder='John Doe'
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            maxLength={255}
            required
            disabled={disabled}
          />
          <div className='form-field__error'>{error}</div>
        </div>
      );
    case 'email':
      return (
        <div className='form-field'>
          <label htmlFor='email'>Email</label>
          <Field
            autoComplete='on'
            id={inputType}
            className={error ? 'has-error' : null}
            type={inputType}
            name={inputType}
            placeholder='email@example.com'
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            disabled={disabled}
          />
          <div className='form-field__error'>{error}</div>
        </div>
      );
    case 'password':
      return (
        <div className='form-field'>
          <label htmlFor='password'>Password</label>
          <Field
            id='password'
            className={error ? 'has-error' : null}
            type='password'
            name='password'
            autoComplete='current-password'
            placeholder='p@s5w0rd'
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            required
            disabled={disabled}
          />
          <div className='form-field__error'>{error}</div>
        </div>
      );
    case 'username':
      return (
        <div className='form-field'>
          <label htmlFor='username'>Username</label>
          <Field
            id='username'
            className={error ? 'has-error' : null}
            type='text'
            name='username'
            placeholder='UsernameExample'
            onChange={handleChange}
            value={value}
            required
            disabled={disabled}
          />
          <div className='form-field__error'>{error}</div>
        </div>
      );
    default:
      return null;
  }
};
