import React, { Component, CSSProperties } from 'react'
import Header from './Header'
import { Container } from '@material-ui/core'
import { Route } from 'react-router-dom';
import StartView from '../../Pages/StartView'
import ForecastView from '../../Pages/ForecastView'
import ForecastDetailView from '../../Pages/ForecastDetailView'
import Regn from './regn.png'
import Footer from '../Footer'


const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 72
}

export default class Layout extends Component {

  render() {
    return (
      <Container style={styles} maxWidth="lg" >
        <Header />
        <img src={Regn} alt="aa" />
        <Route path="/" exact>
          <StartView />
        </Route>

        <Route path="/forecast">
          <ForecastView />
        </Route>

        <Route path="/forecastdetail">
          <ForecastDetailView />
        </Route>
        <Footer />
      </Container >
    )
  }
}
