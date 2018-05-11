import React, { Component } from 'react';
import { connect } from 'react-redux';

import './IssuesFinder.css';
import * as actions from '../../store/actions/issuesFinder';
import Form from './Form/Form';
import Issues from './Issues/Issues';
import Pagination from './Pagination/Pagination';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


class IssuesFinder extends Component {
  onSearchHandler = (event) => {
    event.preventDefault();
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);

    // this method takes current page from the store
    this.props.onSearchIssues(this.props.inputs.owner.value, this.props.inputs.repository.value, this.props.list.currentPage, issuesPerPage);
  }

  onInputChangedHandler = (event, inputIdentifier) => {
    this.props.onInputChange({ [inputIdentifier]: { value: event.target.value } });
  }

  onChangePageHandler = (page) => {
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);

    // this method takes current page from clicked element, it rewrites store's current page
    this.props.onSearchIssues(this.props.inputs.owner.value, this.props.inputs.repository.value, page, issuesPerPage);
  }

  render() {
    let pagination = null;

    if (this.props.issues && !this.props.loading) {
    pagination = <Pagination
      list={this.props.list}
      pageChange={this.onChangePageHandler} />;
    }

    return (
      <div className="IssuesMain">
        <Form 
          inputs={this.props.inputs}
          onSearch={this.onSearchHandler}
          onInputChange={this.onInputChangedHandler} />
        <ErrorBoundary>
          <Issues 
            issues={this.props.issues}
            list={this.props.list}
            loading={this.props.loading}
            error={this.props.error} />
          {pagination}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFinder);
