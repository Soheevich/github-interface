import React from 'react';

import './Pagination.css';

const Pagination = (props) => {
  console.log('make pages', props.list);
  const { currentPage, totalPages } = props.list;
  let pages = [];

  const previousPageClasses = ['PaginationButton', 'PreviousPage'];
  const nextPageClasses = ['PaginationButton', 'NextPage'];
  
  if (props.list.currentPage === 1) {
    previousPageClasses.push('Disabled');
  }
  if (props.list.currentPage === props.list.totalPages) {
    nextPageClasses.push('Disabled');
  }
  
  pages.push(<span
    className={previousPageClasses.join(' ')}
    key="Previous"
    onClick={() => props.pageChange(currentPage - 1)}>
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
        onClick={() => props.pageChange(pageNumber)}>
        {pageNumber}
      </span>
    );
  });
  console.log(mainPages);

  pages = pages.concat(mainPages);
  pages.push(<span
    className={nextPageClasses.join(' ')}
    key="Next"
    onClick={() => props.pageChange(currentPage + 1)}>
      Next
    </span>);

    return (
      <div className="Pagination">
        {pages}
      </div>
    );
};

export default Pagination;
