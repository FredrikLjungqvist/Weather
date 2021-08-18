import React from 'react'
import { Card, CardContent, makeStyles } from '@material-ui/core'
import WeatherIconList from '../WeatherIconList'

const useStyles = makeStyles({
  modalStyling: {
      position: "fixed",
      top: "10vh",
      height: 500,
      right: "0",
      zIndex: 100,
      overflowY: "scroll"
  }
})

const ModalCard = () => {

  const classes = useStyles();

  return (  
    <Card className={classes.modalStyling}>
      <CardContent>
        <WeatherIconList />
      </CardContent>
    </Card>
  )
}

export default ModalCard
