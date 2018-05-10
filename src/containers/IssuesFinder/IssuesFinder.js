import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './Input/Input';
import Issue from '../../components/Issue/Issue';
import * as actions from '../../store/actions/issuesFinder';
import './IssuesFinder.css';

class IssuesFinder extends Component {
  searchHandler = (event) => {
    event.preventDefault();
    this.props.onSearchIssues(this.props.inputs.owner, this.props.inputs.repository, this.props.list.currentPage, this.props.inputs.issuesPerPage);
  }

  onInputChangedHandler = (event, inputIdentifier) => {
    this.props.onInputChange({ [inputIdentifier]: event.target.value })
  }

  render() {
    const inputs = Object.keys(this.props.inputs).map((inputElement) => {
      return (
        <Input
          key={inputElement}
          name={inputElement}
          value={this.props.inputs[inputElement]}
          changed={this.onInputChangedHandler} />
      );
    });

    let issues = null;
    if (this.props.issues) {
      issues = this.props.issues.map((issue) => {
        // console.log('issue', issue);
        return (
          <li key={issue.id} className="IssuesListElement">
            <Issue
              title={issue.title}
              user={issue.user}
              createdAt={issue.createdAt}
              number={issue.number} />
          </li>
        );
      })
    }

    const buttonActive = this.props.inputs.owner && this.props.inputs.repository;

    const numberOfPages = this.props.list ?
      <p>page #{this.props.list.currentPage}, total number of pages: {this.props.list.totalPages}</p>:
      null;

    return (
      <div className="IssuesMain">
        <form onSubmit={this.searchHandler} className="IssuesForm">
          {inputs}
          <button disabled={!buttonActive}>Get issues</button>
        </form>
        <ul className="IssuesList">
          { issues }
        </ul>
        {numberOfPages}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    inputs: state.inputs,
    list: state.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchIssues: (owner, repository, page, numberOfIssues) =>
      dispatch(actions.fetchIssues(owner, repository, page, numberOfIssues)),
    onInputChange: (object) =>
      dispatch(actions.setInputs(object))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFinder);
