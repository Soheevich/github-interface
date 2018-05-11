import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './Issues.css';
import Issue from './Issue/Issue';
import Spinner from '../../../components/Spinner/Spinner';
import Pagination from './Pagination/Pagination';


const Issues = (props) => {
  let issues = null;
  let pagination = null;

  if (props.loading) {
    issues = <Spinner />
  } else if (props.error) {
    throw props.error;
  } else if (props.issues) {
    pagination = <Pagination />;

    issues = props.issues.map((issue) => {
      // console.log('issue', issue);
      return (
        <li key={issue.id} className="IssuesListElement">
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
    <Fragment>
      <ul className="IssuesList">
        {issues}
      </ul>
      {pagination}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(Issues);
