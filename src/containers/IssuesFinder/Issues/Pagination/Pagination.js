import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Pagination.css';
import * as actions from '../../../../store/actions/issuesFinder';

class Pagination extends Component {
  pageChangeHandler = (page) => {
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);

    this.props.onPageNumberChange(page);
    this.props.onSearchIssues(this.props.inputs.owner.value, this.props.inputs.repository.value, this.props.list.currentPage, issuesPerPage);
  }

  render() {
    let previousPageClasses = ['PaginationButton', 'PreviousPage'];
    let nextPageClasses = ['PaginationButton', 'NextPage'];
  
    if (this.props.list.currentPage === 1) {
      previousPageClasses.push('Disabled');
    }
    if (this.props.list.currentPage === this.props.list.totalPages) {
      nextPageClasses.push('Disabled');
    }
  
    return (
      <div className="Pagination">
        <span className={previousPageClasses.join(' ')}>Previous</span>
        <span className={nextPageClasses.join(' ')}>Next</span>
      </div>
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
    onPageNumberChange: (page) =>
      dispatch(actions.setCurrentPage(page)),
    onSearchIssues: (owner, repository, page, numberOfIssues) =>
      dispatch(actions.fetchIssues(owner, repository, page, numberOfIssues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
