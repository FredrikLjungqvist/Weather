import React, { CSSProperties} from 'react'
import WeatherIconItem from './WeatherIconItem'
import { iconDesc } from '../iconDesc'
import { Grid } from '@material-ui/core'
const overflow: CSSProperties = {
}
const WeatherIconList = () => {
  console.log(iconDesc)
  return (
    <>
      {iconDesc.map((desc) => <Grid style={overflow} container alignItems="center" direction="row"><WeatherIconItem desc={desc.title} imgIcon={desc.img} /></Grid>)}
    </>
  )
}

export default WeatherIconList

