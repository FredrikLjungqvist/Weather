import React, { Component } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import FreeSolo from './search'

export default class Header extends Component {

  render() {
    return (
      <AppBar color="transparent">
        <Toolbar>
          <NavLink to="/">
            <h1>VäderApp</h1>
          </NavLink>
          <FreeSolo />
        </Toolbar>
      </AppBar>
    )
  }
}