import React from 'react';

import './IssuesFinder.css';
import Form from './Form/Form';
import Issues from './Issues/Issues';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


const IssuesFinder = (props) => {
  return (
    <div className="IssuesMain">
      <Form />
      <ErrorBoundary>
        <Issues />
      </ErrorBoundary>
    </div>
  );
};

export default IssuesFinder;
