import React from 'react';

const Layout = (props) => (
  <div>
    <p>Header</p>
    { props.children }
  </div>
);

export default Layout;