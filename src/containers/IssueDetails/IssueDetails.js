import React from 'react';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './IssueDetails.css';

const IssueDetails = (props) => {
  const { match: { params: { number } } } = props;
  const issue = props.issues.filter((iss) => iss.number === parseInt(number, 10))[0];
  const { user } = issue;
  const text = marked(issue.body);

  return (
    <div className="IssuesDetailsMain">
      <article className="IssueDetailsContainer">
        <h3>{issue.title}</h3>
        <div className="IssueDetailsAuthor">
          <img width="44" height="44" src={user.userAvatarUrl} alt={`@${user.userLogin}` } />
          <a href={user.userUrl} className="AuthorLink">{user.userLogin}</a>
        </div>
        <section dangerouslySetInnerHTML={{ __html: text }} className="CommentBody"></section>
      </article>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues
  };
};

export default withRouter(connect(mapStateToProps)(IssueDetails));