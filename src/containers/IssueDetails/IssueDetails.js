import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

const IssueDetails = (props) => {
  const { match: { params: { number } } } = props;
  const issue = props.issues.filter((iss) => iss.number === parseInt(number, 10))[0];
  console.log(issue);

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

export default connect(mapStateToProps)(IssueDetails);