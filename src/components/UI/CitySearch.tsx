import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import myArray from '../../citys';
import { useHistory } from 'react-router-dom'

export default function CitySearch() {
  let history = useHistory();

  const toForecastHandler = ( event: object, value: String) => {
    // om value är === någon stad i listan. 
    if( value === null) {
      throw new Error('Du måste skriva in en stad!')
    }
      history.push(`/stad/${value}`)
  }

    return (
      <div style={{ width: 300 }}>
        <Autocomplete
          onChange={( event, value) =>  value != null ? toForecastHandler(event, value) : '' }
          freeSolo
          id="free-solo-2-demo"
          autoSelect={true}
          options={myArray.map((option) => option )}
          renderInput={(params) => (
            <TextField
            {...params}
            id="textField"
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
          
        />
      </div>
    );
  }