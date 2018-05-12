import React, { Fragment } from 'react';

import './Autocomplete.css';

const Autocomplete = (props) => {
  return (
    <Fragment>
      <div className="Autocomplete">Autocomplete</div>
      <div
        className="Backdrop"
        onClick={props.toggleAutocomplete}>Backdrop</div>
    </Fragment>
  );
};

export default Autocomplete;