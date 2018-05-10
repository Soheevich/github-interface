import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

const Issue = props => (
  <Fragment>
    <h3>{props.title}</h3>
    <h4>Author: {props.user.userLogin}</h4>
    <ReactMarkdown source={props.body} />
  </Fragment>
);

export default Issue;
