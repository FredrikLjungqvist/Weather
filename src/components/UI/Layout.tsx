import { Component, CSSProperties } from 'react'
import Header from './Header'
import { Container, CssBaseline } from '@material-ui/core'
import Footer from './Footer'

const styles: CSSProperties = {
  display: "flex",
  marginTop: 150
}

interface Props {
  onToggle: () => void;
}

export default class Layout extends Component<Props> {

  render() {
    return (
      <>
        <CssBaseline>
        { <Header onToggle={this.props.onToggle} />}
       {<Container style={styles} maxWidth="lg" disableGutters>
           <>
           {this.props.children}
           </>
         </Container >}
         <Footer />
        </CssBaseline> 
      </>

    )
  }
}
