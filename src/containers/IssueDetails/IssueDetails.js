import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const IssueDetails = (props) => {
  const { match: { params: { number } } } = props;
  const issue = props.issues.filter((iss) => iss.number === parseInt(number, 10))[0];

  return (
    <div>
      <p>Issue details</p>
      <ReactMarkdown source={issue.body} />;
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues
  };
};

export default withRouter(connect(mapStateToProps)(IssueDetails));