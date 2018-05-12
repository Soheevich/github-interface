import React from 'react';

import './Input.css';

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
    // console.log(props);
      if (props.id === 'repository') {
        inputElement =
          <input
            id={props.id}
            className="InputElement"
            {...props.elementConfig}
            value={props.value}
            onChange={(event) => {props.changed(event, props.id)}}
            onClick={(event) => {
              props.repositorySearch(event);

              if (!props.showAutocomplete) {
                props.toggleAutocomplete();
              }
            }} />;
      } else {
        inputElement =
          <input
            id={props.id}
            className="InputElement"
            {...props.elementConfig}
            value={props.value}
            onChange={(event) => props.changed(event, props.id)} />;
      }
      break;
    case ('select'):
      inputElement = (
        <select
          id={props.id}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={(event) => props.changed(event, props.id)}>
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
          id={props.id}
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={(event) => props.changed(event, props.id)} />;
  }

  return (
    <div className="Input">
      <label className="Label" htmlFor={props.id}>{props.name}</label>
      { inputElement }
    </div>
  );
};

export default Input;