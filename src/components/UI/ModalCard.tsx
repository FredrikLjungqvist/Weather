import React from 'react'
import { Card, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  modalStyling: {
      position: "fixed",
      top: "30vh",
      left: "10%",
      width: "80%",
      zIndex: 100,
      overflow: "hidden"
  }
})

const ModalCard = () => {

  const classes = useStyles();

  return (  
    <Card className={classes.modalStyling}>
      <CardContent>
        massa bilder
      </CardContent>
    </Card>
  )
}

export default ModalCard
