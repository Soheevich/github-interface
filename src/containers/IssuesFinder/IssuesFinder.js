import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './Input/Input';
import Issue from '../../components/Issue/Issue';
import * as actions from '../../store/actions/issuesFinder';
import './IssuesFinder.css';

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
    const buttonActive = this.props.inputs.owner && this.props.inputs.repository;

    const formElementsArray = [];
    Object.keys(this.props.inputs).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: this.props.inputs[key]
      });
    });

    const form = (
      <form onSubmit={this.searchHandler} className="IssuesForm">
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              name={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={this.onInputChangedHandler} />
          );
        })}
        <button disabled={!buttonActive}>Get issues</button>
      </form>
    );

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

    const numberOfPages = this.props.list ?
      <p>page #{this.props.list.currentPage}, total number of pages: {this.props.list.totalPages}</p>:
      null;

    return (
      <div className="IssuesMain">
        {form}
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
