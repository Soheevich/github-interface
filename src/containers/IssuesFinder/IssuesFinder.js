import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from './Input/Input';
import Issue from '../../components/Issue/Issue';
import * as actions from '../../store/actions/issuesFinder';

class IssuesFinder extends Component {
  searchHandler = (event) => {
    event.preventDefault();
    this.props.onSearchIssues(this.props.inputs.owner, this.props.inputs.repository);
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
          <li key={issue.id}>
            <Issue
              title={issue.title}
              user={issue.user}
              createdAt={issue.createdAt}
              number={issue.number} />
          </li>
        );
      })
    }

    return (
      <div>
        <form onSubmit={this.searchHandler}>
          {inputs}
          <button>Get issues</button>
        </form>
        <ul>
          { issues }
        </ul>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    inputs: state.inputs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchIssues: (owner, repository) => dispatch(actions.fetchIssues(owner, repository)),
    onInputChange: (object) => dispatch(actions.setInputs(object))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFinder);
