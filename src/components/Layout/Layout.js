import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';

const Layout = props => (
  <Fragment>
    <div className="Content">
      <header className="Header">
        <Link to="/">Github Interface</Link>
      </header>
      {props.children}
    </div>
    <footer className="Footer">
      2018
    </footer>
  </Fragment>
);

export default Layout;