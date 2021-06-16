/* import { minHeight } from '@material-ui/system'; */
/* import { black, white } from 'material-ui/styles/colors'; */
/* import React from 'react'; */
import { CSSProperties } from 'react';


/* import { fade, makeStyles } from '@material-ui/core/styles'; */


/* const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})); */


const Footer = () => {
  /*  const classes = useStyles(); */
  return (
    <div style={styles}>

      <p>Systemutveckling, Ramverk. Made by Grupp 3 <a href="https://medieinstitutet.se/">@MedieInstitutet </a>WIE20G</p>

    </div>
  )
}


const styles: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  background: 'Dodgerblue',
  color: 'whitesmoke',
  width: '100%',
  textAlign: 'center',
  letterSpacing: '2px',


}



export default Footer
