import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';

const Layout = props => (
  <Fragment>
    <header className="Header">
      <Link to="/">Github Interface</Link>
    </header>
    {props.children}
    <footer className="Footer">
      2018
    </footer>
  </Fragment>
);

export default Layout;