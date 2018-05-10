import React from 'react';
import ReactMarkdown from 'react-markdown';


const IssueDetails = props => (
  <div>
    <ReactMarkdown source={props.body} />
  </div>
);

export default IssueDetails;