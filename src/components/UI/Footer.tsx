import { CSSProperties } from 'react';

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
