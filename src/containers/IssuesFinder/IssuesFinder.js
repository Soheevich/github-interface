import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/issuesFinder';

class IssuesFinder extends Component {
  state = {
    inputs: {
      owner: '',
      repository: ''
    }
  }

  searchHandler = (event) => {
    event.preventDefault();

    console.log('[Issues Finder Container] - searchHandler', this.state.inputs);
    this.props.onSearchIssues(this.state.inputs.owner, this.state.inputs.repository);
  }

  onInputChangedHandler = (event, inputIdentifier) => {
    const newInputs = {
      ...this.state.inputs,
      [inputIdentifier]: event.target.value
    };
    this.setState({ inputs: newInputs });
  }

  render() {
    const inputs = Object.keys(this.state.inputs).map((inputElement) => {
      return (
        <Input
          key={inputElement}
          name={inputElement}
          value={this.state.inputs[inputElement]}
          changed={this.onInputChangedHandler} />
      );
    });

    console.log(this.props.issues)
    return (
      <div>
        <form onSubmit={this.searchHandler}>
          {inputs}
          <button>Get repos</button>
        </form>
        <ul>
          
        </ul>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    issues: state.issues
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchIssues: (owner, repository) => dispatch(actions.fetchIssues(owner, repository))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFinder);
