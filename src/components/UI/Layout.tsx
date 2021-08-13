import { Component, CSSProperties } from 'react'
import Header from './Header'
import { Container, CssBaseline } from '@material-ui/core'
import Footer from '../Footer'

const styles: CSSProperties = {
  display: "flex",
  marginTop: 72
}

export default class Layout extends Component {

  render() {
    return (
      <>
        <CssBaseline>
         <Header />
         <Container style={styles} maxWidth="lg" disableGutters>
           <>
           {this.props.children}
           </>
         </Container >
         <Footer />
        </CssBaseline> 
      </>

    )
  }
}
