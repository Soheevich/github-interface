import React, { Component } from 'react';

import './Pagination.css';

class Pagination extends Component {
  state = {
    currentPage: this.props.list.currentPage,
    totalPages: this.props.list.totalPages
  }

  render() {
    let previousPageClasses = ['PaginationButton', 'PreviousPage'];
    let nextPageClasses = ['PaginationButton', 'NextPage'];
  
    if (this.state.currentPage === 1) {
      previousPageClasses.push('Disabled');
    }
    if (this.state.currentPage === this.state.totalPages) {
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

export default Pagination;
