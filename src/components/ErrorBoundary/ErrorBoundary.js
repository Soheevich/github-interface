import React, { Component } from 'react';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>An error happened during loading from database.</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
