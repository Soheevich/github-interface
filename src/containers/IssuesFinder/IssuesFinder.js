import React, { Component } from 'react';
import { connect } from 'react-redux';

import './IssuesFinder.css';
import * as actions from '../../store/actions/issuesFinder';
import Form from './Form/Form';
import Issues from './Issues/Issues';
import Pagination from './Pagination/Pagination';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


class IssuesFinder extends Component {
  state = {
    showAutocomplete: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputs.repository !== this.props.inputs.repository && prevState.showAutocomplete !== this.state.showAutocomplete) {
      this.onSearchHandler();
    }
  }

  componentWillReceiveProps({ inputs: { repository: { value } } }) {
    if (value && value !== this.props.inputs.repository.value) {
      // console.log('nextProps', value);
      this.props.onSearchRepositories(this.props.inputs.owner.value, value);
    }
  }

  onToggleAutocomplete = () => {
    console.log('onToggleAutocomplete');
    this.setState(prevState => ({
      showAutocomplete: !prevState.showAutocomplete
    }));
  }

  onSearchHandler = (event) => {
    if (event) event.preventDefault();
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);

    // this method takes current page from the store
    this.props.onSearchIssues(this.props.inputs.owner.value, this.props.inputs.repository.value, this.props.list.currentPage, issuesPerPage);
  }

  onSearchRepositoriesHandler = () => {
    this.props.onSearchRepositories(this.props.inputs.owner.value, this.props.inputs.repository.value);
  }

  onInputChangedHandler = (value, inputIdentifier) => {
    this.props.onInputChange({ [inputIdentifier]: { value } });
  }

  onChangePageHandler = (page) => {
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);

    // this method takes current page from clicked element, it rewrites store's current page
    this.props.onSearchIssues(this.props.inputs.owner.value, this.props.inputs.repository.value, page, issuesPerPage);
  }

  onAutocompleteClickHandler = (repository) => {
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);
    this.props.onAutocompleteSearch(repository, this.props.inputs.owner.value, 1, issuesPerPage);
    this.onToggleAutocomplete();
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
          repositories={this.props.repositories}
          showAutocomplete={this.state.showAutocomplete}
          onToggleAutocomplete={this.onToggleAutocomplete}
          onSearch={this.onSearchHandler}
          onInputChange={this.onInputChangedHandler}
          onRepositorySearch={this.onSearchRepositoriesHandler}
          onAutocompleteClick={this.onAutocompleteClickHandler} />
        <ErrorBoundary error={this.props.error}>
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
    repositories: state.repositories,
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
    onSearchRepositories: (owner, repository) =>
      dispatch(actions.fetchRepositories(owner, repository)),
    onAutocompleteSearch: (repo, owner, page, perPage) => 
      dispatch(actions.selectAutocomplete(repo, owner, page, perPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssuesFinder);
