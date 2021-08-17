import React, { Component } from 'react'

interface Props {}
interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false
  };

componentDidCatch() {
  this.setState({ hasError: true })
}

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Errorboundary Component</h1>
        </div>
      )
    }

    return this.props.children
  }
}
