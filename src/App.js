import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import './App.css';
import Layout from './components/Layout/Layout';
import IssuesFinder from './containers/IssuesFinder/IssuesFinder';
import IssueDetails from './containers/IssueDetails/IssueDetails';


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={IssuesFinder} />
          <Route path="/issue/:number" render={() => (
            this.props.issues ? 
              (<IssueDetails />) :
              (<Redirect to="/" />)
          )} />
          <Redirect push to="/" />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    issues: state.issues
  };
};

export default withRouter(connect(mapStateToProps)(App));
