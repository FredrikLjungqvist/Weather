import { Component } from "react"
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ContainerClassKey } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const useStyles = makeStyles({
    root: {
      minWidth: 150,
      maxWidth: 150,
      textAlign: 'center',
      justifyContent: 'center',
      
    },
    cont: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      
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
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


  interface mock {
    day:string,
    tempmax: number,
    tempmin: number,
    symbol: number,
    date: string,
  }
  const mock:mock[] = [{
      day:'monday',
      tempmax: 20,
      tempmin: 10,
      symbol: 2,
      date: "2021-03-05",
    },
    {
        day:'tuesday',
      tempmax: 20,
      tempmin: 12,
      symbol: 5,
      date: "2021-03-06",
    }]
   const Forecast = ()=> {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    

            return (
            <Container className={classes.cont}>
             {mock.map((data) => (
               <Link className={classes.link} to="/forecastdetail">
        <Card className={classes.root}>
        <CardContent>
    
          <Typography variant="h5" component="h2">
            {data.day}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {data.date}
          </Typography>
          <Typography className={classes.pos} color="textPrimary">
            {data.tempmax} °
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.tempmin} °
            <br />
            <img src={require(`../../assets/icons/${data.symbol}.png`).default} width="100" alt="" />
          </Typography>
        </CardContent>
        
      </Card>
      </Link>
      ))}
      </Container>
         ) 
    
        

    


    }
export default Forecast