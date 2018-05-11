import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Form.css';
import * as actions from '../../../store/actions/issuesFinder';
import Input from './Input/Input';

class Form extends Component {
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
  
    return (
      <form onSubmit={this.searchHandler} className="IssuesForm">
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              id={formElement.id}
              name={formElement.config.name}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={this.onInputChangedHandler} />
          );
        })}
        <button disabled={!buttonActive}>Get issues</button>
      </form>
    );
  }
};

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
