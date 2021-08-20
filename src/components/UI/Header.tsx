import React, { Component, CSSProperties } from 'react'
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import Search from './CitySearch'
import logoStyle from './Logo.module.css'
import InfoIcon from '@material-ui/icons/Info';

interface Props {
  onToggle: () => void;
}

export default class Header extends Component<Props> {

  render() {
    return (
      <AppBar style={{ zIndex: 1}} position="fixed" color="inherit">
        <Toolbar style={{paddingLeft: 0, paddingRight:30}}>
          <Container style={classes} maxWidth="lg">
            <NavLink className={logoStyle.logo} to="/">
                <Typography  variant="h3">
                  VäderApp
                </Typography>
            </NavLink>
            <Search />
          </Container>
          <InfoIcon onClick={this.props.onToggle} />
        </Toolbar>
      </AppBar>
    )
  }
}

const classes:CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}