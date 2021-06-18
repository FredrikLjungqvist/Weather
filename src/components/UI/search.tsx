/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import myArray from '../../citys';



export default function FreeSolo() {
    let city
    console.log('hej')
    return (
      <div style={{ width: 300 }}>
          
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={myArray.map((option) => option)}
          
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              value=""
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
            
          )}
        />
      </div>
    );
  }