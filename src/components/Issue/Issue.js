import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

const Issue = props => (
  <Fragment>
    <h3>{issue.title}</h3>
    <h4>Author: {issue.userLogin}</h4>
    <ReactMarkdown source={issue.body} />
  </Fragment>
);

export default Issue;
