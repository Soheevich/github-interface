import React from 'react';

import './Input.css';

const Input = (props) => {
  return (
    <div className="Input">
      <label className="Label" for={props.name}>{props.name}</label>
      <input
        className="InputElement"
        value={props.value}
        onChange={(event) => props.changed(event, props.name)} />
    </div>
  );
};

export default Input;