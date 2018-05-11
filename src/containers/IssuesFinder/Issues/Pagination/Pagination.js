import React from 'react';

import './Pagination.css';

const Pagination = (props) => {
  return (
    <div>
      <p>Current Page {props.list.currentPage}, total pages {props.list.totalPages}</p>
    </div>
  );
};

export default Pagination;
