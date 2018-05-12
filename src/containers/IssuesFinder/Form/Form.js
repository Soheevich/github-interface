import React from 'react';

import './Form.css';
import Input from './Input/Input';

const Form = (props) => {
  const buttonActive = props.inputs.owner.value && props.inputs.repository.value;
  const formElementsArray = [];

  Object.keys(props.inputs).forEach((key) => {
    formElementsArray.push({
      id: key,
      config: props.inputs[key]
    });
  });

  return (
    <form onSubmit={(event) => props.onSearch(event)} className="IssuesForm">
      {formElementsArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            id={formElement.id}
            name={formElement.config.name}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={props.onInputChange}
            repositorySearch={props.onRepositorySearch} />
        );
      })}
      <button disabled={!buttonActive}>Get issues</button>
    </form>
  );
};

export default Form;
