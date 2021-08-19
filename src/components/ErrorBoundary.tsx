import React, { Component, CSSProperties, ErrorInfo } from 'react'
import { Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
interface Props {}
interface State {
    error?: Error;
    errorMessage: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = {
    error: undefined,
    errorMessage: ''
  };

componentDidCatch(error:Error, errorInfo: ErrorInfo) {
  this.setState({ error, errorMessage: error.message })
}

  render() {
    if (this.state.error) {
      return (
        <Container maxWidth="lg" style={styles}>
          <h1>{this.state.errorMessage }</h1>
          <Link style={linkStyles} to="/">
            <Button variant="contained" color="secondary">Tillbaka till startsidan</Button>
          </Link>
        </Container>
      )
    }
    
    return this.props.children
  }
}
const linkStyles: CSSProperties = {
  textDecoration: "none",
}
const styles: CSSProperties = {
  display:"flex",
  alignItems:"center",
  flexDirection: "column",
}