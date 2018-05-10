import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './IssueDetails.css';

const IssueDetails = (props) => {
  const { match: { params: { number } } } = props;
  const issue = props.issues.filter((iss) => iss.number === parseInt(number, 10))[0];
  const { user } = issue;
  console.log(issue);

  return (
    <div className="IssuesDetailsMain">
      <h3>{issue.title}</h3>
      <div>
        <img width="44" height="44" src={user.userAvatarUrl} alt={`@${user.userLogin}` } />
        <a href={user.userUrl}>{user.userLogin}</a>
        <ReactMarkdown source={issue.body} />;
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues
  };
};

export default withRouter(connect(mapStateToProps)(IssueDetails));