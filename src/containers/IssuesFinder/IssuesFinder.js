import React from 'react';

import './IssuesFinder.css';
import Form from './Form/Form';
import Issues from './Issues/Issues';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


const IssuesFinder = (props) => {

  // const numberOfPages = this.props.list ?
  //   <p>page #{this.props.list.currentPage}, total number of pages: {this.props.list.totalPages}</p>:
  //   null;

  return (
    <div className="IssuesMain">
      <Form />
      <ErrorBoundary>
        <Issues />
      </ErrorBoundary>
      {
        // numberOfPages
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

export default IssuesFinder;
