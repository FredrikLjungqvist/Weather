
import { Grid } from '@material-ui/core'


const WeatherIconItem = (props:any) => {
  return (
    <>
    <Grid item>
      <img width="50" src={require(`../assets/icons/${props.imgIcon}.png`).default} alt="" />
    </Grid>
    <Grid item>
      <h5>{props.desc}</h5>
    </Grid>
    </>
  )
}

export default WeatherIconItem
