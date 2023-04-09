import React from 'react';

export const Avatar = ({ name = '', className }) => {
  return (
    <div className={`${className}__avatar`}>
      <p className={`${className}__initials`}>{name.charAt(0).toUpperCase()}</p>
    </div>
  );
};
