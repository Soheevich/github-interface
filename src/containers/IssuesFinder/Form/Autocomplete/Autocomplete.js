import React from 'react';

import './Autocomplete.css';

const Autocomplete = (props) => {
  let repos = null;
  if (props.repositories) {
    repos = props.repositories.slice(0, 5).map(repo => {
      return (
        <div
          key={repo.id}
          className="AutocompleteElement"
          onClick={ () => { props.autocompleteClick(repo.name) }
          }>{repo.name}
        </div>
      );
    });
  }
  // console.log(repos);
  return (
    <div className="Autocomplete">
      <div className="AutocompleteArray">
        {repos}
      </div>
      <div
        className="Backdrop"
        onClick={props.toggleAutocomplete}></div>
    </div>
  );
};

export default Autocomplete;