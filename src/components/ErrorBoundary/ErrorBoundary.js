import React from 'react';

import './ErrorBoundary.css';

const ErrorBoundary = (props) => {
  if (props.error) {
    return <p>An error happened during loading from database.</p>;
  }
  return props.children;
}

export default ErrorBoundary;
