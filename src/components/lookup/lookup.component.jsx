import React from 'react';
import { FormControl, Grid, TextField, Autocomplete, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import "./lookup.component.scss";

const top100Films = [
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];

const HandleSubmit = () => {
  //const selectedXcode = document.getElementById('xcode-selected-value').value
  console.log(document.getElementById('xcode-selected-value').value);
};

const LookupComponent = () => {
  return (
    <FormControl fullWidth>
      <Grid container direction={"column"} spacing={4}>
        <Grid id="lookup-elements-fields" item>
          <Autocomplete
            className='lookup-elements-space-between'
            disablePortal
            id="xcode-selected-value"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Xcode" />}
          />
          <TextField
            sx={{marginRight: '1vw'}}
            id="outlined-number"
            label="Tineline to check"
            type="number"
            variant="outlined"
            InputProps={{
              inputProps: { min: 1 }
            }}
           defaultValue={30}
          />
          <Fab onClick={HandleSubmit} type="submit" color="primary" aria-label="LookUp">
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default LookupComponent;