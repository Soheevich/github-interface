import React, { Component } from 'react';
import { connect } from 'react-redux';

import './IssuesFinder.css';
import * as actions from '../../store/actions/issuesFinder';
import Form from './Form/Form';
import Issues from './Issues/Issues';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


class IssuesFinder extends Component {
  searchHandler = (event) => {
    event.preventDefault();
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);
    this.props.onSearchIssues(this.props.inputs.owner.value, this.props.inputs.repository.value, this.props.list.currentPage, issuesPerPage);
  }

  onInputChangedHandler = (event, inputIdentifier) => {
    this.props.onInputChange({ [inputIdentifier]: { value: event.target.value } });
  }

  render() {
    return (
      <div className="IssuesMain">
        <Form 
          inputs={this.props.inputs}
          onSearch={this.searchHandler}
          onInputChange={this.onInputChangedHandler} />
        <ErrorBoundary>
          <Issues />
        </ErrorBoundary>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    inputs: state.inputs,
    list: state.list,
    issues: state.issues,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchIssues: (owner, repository, page, numberOfIssues) =>
      dispatch(actions.fetchIssues(owner, repository, page, numberOfIssues)),
    onInputChange: (object) =>
      dispatch(actions.setInputs(object)),
    onPageNumberChange: (owner, repository, page, numberOfIssues) =>
      dispatch(actions.setCurrentPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFinder);
