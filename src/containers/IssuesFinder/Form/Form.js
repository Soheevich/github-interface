import React, { Fragment } from 'react';

import './Form.css';
import Input from './Input/Input';
import Autocomplete from './Autocomplete/Autocomplete';

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
        let autocomplete = null;

        if (props.showAutocomplete && props.inputs.repository.value) {
          autocomplete = <Autocomplete
            repositories={props.repositories}
            toggleAutocomplete={props.onToggleAutocomplete} />;
        }

        return (
          <Fragment key={formElement.id}>
            <Input
              id={formElement.id}
              name={formElement.config.name}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              showAutocomplete={props.showAutocomplete}
              toggleAutocomplete={props.onToggleAutocomplete}
              changed={props.onInputChange}
              repositorySearch={props.onRepositorySearch} />
            { autocomplete }
          </Fragment>
        );
      })}
      <button disabled={!buttonActive}>Get issues</button>
    </form>
  );
};

export default Form;
