import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';

class IssuesFinder extends Component {
  state = {
    inputs: {
      author: '',
      repository: ''
    }
  }

  searchHandler = (event) => {
    event.preventDefault();

    this.props.onSearchIssues(this.state.author, this.state.repository);
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
          name={inputElement}
          value={this.state.inputs[inputElement]}
          changed={this.onInputChangedHandler} />
      );
    });
    return (
      <div>
        <form onSubmit={this.searchHandler}>

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

  };
};

export default IssuesFinder;
