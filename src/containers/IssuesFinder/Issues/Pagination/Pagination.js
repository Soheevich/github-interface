import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Pagination.css';
import * as actions from '../../../../store/actions/issuesFinder';

class Pagination extends Component {
  pageChangeHandler = (page) => {
    const issuesPerPage = parseInt(this.props.inputs.issuesPerPage.value, 10);

    this.props.onPageNumberChange(this.props.inputs.owner.value, this.props.inputs.repository.value, page, issuesPerPage);
  }

  makePages = () => {
    console.log('make pages', this.props.list);
    const { currentPage, totalPages } = this.props.list;
    let pages = [];

    const previousPageClasses = ['PaginationButton', 'PreviousPage'];
    const nextPageClasses = ['PaginationButton', 'NextPage'];
    
    if (this.props.list.currentPage === 1) {
      previousPageClasses.push('Disabled');
    }
    if (this.props.list.currentPage === this.props.list.totalPages) {
      nextPageClasses.push('Disabled');
    }
    
    pages.push(<span
      className={previousPageClasses.join(' ')}
      key="Previous"
      onClick={() => this.pageChangeHandler(currentPage - 1)}>
        Previous
      </span>);
    
    const mainPages = Array.from({ length: totalPages }, (page, index, array) => {
      const pageNumber = index + 1;
      const pageClasses = ['PaginationButton'];

      if (pageNumber === currentPage) {
        pageClasses.push('CurrentPageButton');
      }

      return (
        <span
          className={pageClasses.join(' ')}
          key={pageNumber}
          onClick={() => this.pageChangeHandler(pageNumber)}>
          {pageNumber}
        </span>
      );
    });
    console.log(mainPages);
  
    pages = pages.concat(mainPages);
    pages.push(<span
      className={nextPageClasses.join(' ')}
      key="Next"
      onClick={() => this.pageChangeHandler(currentPage + 1)}>
        Next
      </span>);

    return pages;
  }

  render() {
    return (
      <div className="Pagination">
        {this.makePages()}
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
    onPageNumberChange: (owner, repository, page, numberOfIssues) =>
      dispatch(actions.setPage(owner, repository, page, numberOfIssues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
