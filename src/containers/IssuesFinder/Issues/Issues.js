import React from 'react';
import { connect } from 'react-redux';

import './Issues.css';
import Issue from './Issue/Issue';
import Spinner from '../../../components/Spinner/Spinner';

const Issues = (props) => {
  let issues = null;
  if (props.loading) {
    issues = <Spinner />
  } else if (props.issues) {
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
    <ul className="IssuesList">
      {issues}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Issues);
