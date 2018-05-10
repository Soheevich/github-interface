import React from 'react';

import './Input.css';

const Input = ({name, value, changed}) => {
  return (
    <div className="Input">
      <label className="Label" htmlFor={name}>{name}</label>
      <input
        id={name}
        className="InputElement"
        value={value}
        onChange={(event) => changed(event, name)} />
    </div>
  );
};

export default Input;