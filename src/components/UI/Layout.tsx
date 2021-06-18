import React, { Component, CSSProperties } from 'react'
import Header from './Header'
import { Container } from '@material-ui/core'
import { Route, } from 'react-router-dom';
import StartView from '../../Pages/StartView'
import ForecastView from '../../Pages/ForecastView'
import ForecastDetailView from '../../Pages/ForecastDetailView'
import Footer from '../Footer'





const styles: CSSProperties = {
  display: "flex",
  marginTop: 72
}

export default class Layout extends Component {




  render() {
    return (
      <>
        <Header />
        <Container style={styles} maxWidth="lg" disableGutters>
          <Route path="/" exact>
            <StartView />
          </Route>

          <Route path="/:cityName" exact>
            <ForecastView />
          </Route>

          <Route path="/:cityName/:currentDate">
            <ForecastDetailView />
          </Route>
        </Container >

        <Footer />
      </>

    )
  }
}
