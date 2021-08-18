import React, { Component, CSSProperties } from 'react'
import { Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
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
        <Container maxWidth="lg" style={styles}>
          <h1>Något gick fel...</h1>
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