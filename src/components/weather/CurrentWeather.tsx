import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import WeatherContext from '../../context/weather-context'

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 0,
  },
});

export default function CurrentWeather() {

  const ctx = useContext(WeatherContext)

  console.log(ctx.weatherData[0])
 
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
            
            {ctx.weatherData.length > 0 ? (
              <div>
                <img width="100" src={require(`../../assets/icons/${ctx.weatherData[0][0].weatherSymbol}.png`).default} alt="" />
                <p>{ctx.weatherData[0][0].temp}</p>
              </div>)
            : "loading"}

              Lizards are all continents except Antarctica
            widespread group of squamate reptiles, with over 6,000 species, ranging
              across 
              </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

        </CardActions>
      </Card>
    </>
  );
}