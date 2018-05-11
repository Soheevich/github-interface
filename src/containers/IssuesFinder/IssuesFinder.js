import React, { Component } from 'react';

import Form from './Form/Form';
import Issues from './Issues/Issues';
import './IssuesFinder.css';

class IssuesFinder extends Component {
  render() {

    // const numberOfPages = this.props.list ?
    //   <p>page #{this.props.list.currentPage}, total number of pages: {this.props.list.totalPages}</p>:
    //   null;

    return (
      <div className="IssuesMain">
        <Form />
        <Issues />
        {
          // numberOfPages
        }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

export default IssuesFinder;
