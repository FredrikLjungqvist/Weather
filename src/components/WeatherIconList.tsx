import { CSSProperties} from 'react'
import WeatherIconItem from './WeatherIconItem'
import { iconDesc } from '../iconDesc'
import { Grid } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'
const overflow: CSSProperties = {
}
const WeatherIconList = () => {
  return (
    <>
      {iconDesc.map((desc) => <Grid key={uuidv4()} style={overflow} container alignItems="center" direction="row"><WeatherIconItem desc={desc.title} imgIcon={desc.img} /></Grid>)}
    </>
  )
}

export default WeatherIconList

