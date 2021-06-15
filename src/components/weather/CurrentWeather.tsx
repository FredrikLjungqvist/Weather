import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 0,
  },
});

export default function CurrentWeather() {
  const classes = useStyles();
  return (
    <>

      <Card className={classes.root}>
        <CardActionArea>
          <CardContent className={classes.root}>
            <Typography gutterBottom variant="h1" component="h2">
              Göteborg
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

        </CardActions>
      </Card>
    </>
  );
}