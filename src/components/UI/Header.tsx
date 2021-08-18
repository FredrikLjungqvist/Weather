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
    const classes = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
    return (
      <AppBar color="transparent">
        <Toolbar>
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

