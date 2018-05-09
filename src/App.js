import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Layout from './components/Layout/Layout';
import IssuesFinder from './containers/IssuesFinder/IssuesFinder';
import IssueDetails from './containers/IssueDetails/IssueDetails';


const App = (props) => (
  <Fragment>
    <Layout>
      <Switch>
        <Route path="/issue" component={IssueDetails}/>
        <Route path="/" exact component={IssuesFinder} />
      </Switch>
    </Layout>
  </Fragment>
);

export default App;
