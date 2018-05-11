import React from 'react';

import './Input.css';

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      inputElement =
        <input
          id={props.name}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={(event) => props.changed(event, props.name)} />;
      break;
    case ('select'):
      inputElement = (
        <select
          id={props.name}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={(event) => props.changed(event, props.name)}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement =
        <input
          id={props.name}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={(event) => props.changed(event, props.name)} />;
  }

  return (
    <div className="Input">
      <label className="Label" htmlFor={props.name}>{props.name}</label>
      { inputElement }
    </div>
  );
};

export default Input;