import React from 'react'
import {  Link, useParams} from "react-router-dom";
import {Typography, CardContent, Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    maxWidth: 150,
    textAlign: 'center',
    justifyContent: 'center',
    flexWrap:'wrap'
  },
  cont: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  link: {
    textDecoration: 'none',
    margin: '30px',
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '1vw',
    
  },
  date : {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  id: string;
  city: string;
  day: string;
  date: string;
  tempmin: number;
  tempmax:  number;
  symbol: number;
}

const ForecastCard = (props: Props) => {
  const params:any = useParams()
  const classes = useStyles();

  return (
    <Link key={props.id} className={classes.link} to={`/stad/${props.city}/datum/${props.date}`}>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          {params.cityName ? props.day : props.city}
        </Typography>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {props.date}
        </Typography>
        <Typography className={classes.pos} color="textPrimary">
          {Math.floor(props.tempmax)}°
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {Math.floor(props.tempmin)}°
          <br />
        <img src={require(`../../assets/icons/${props.symbol}.png`).default} width="100" alt="" />
        </Typography>
      </CardContent>
    </Card>
  </Link>
  )
}

export default ForecastCard
