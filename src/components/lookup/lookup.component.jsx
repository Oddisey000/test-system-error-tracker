import React from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { FormControl, Grid, TextField, Autocomplete, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import "./lookup.component.scss";

import { setHarnessListAction } from '../../redux/app-reducer/app-reducer.actions';

let selectionList = [];

const LookupComponent = ({ appReducer, setHarnessListAction }) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  const HandleSubmit = () => {
    const selectedXcode = document.getElementById('xcode-selected-value').value
    const timeLine = document.getElementById('outlined-number').value
    if (!selectedXcode) {
      alert("Please Select Xcode to continue")
    } else {
      setHarnessListAction(`${appReducer.API_url}getharnesslist?interval=${timeLine}&xcode=${selectedXcode}`)
    }
  };

  const GetXcodes = () => {
    axios.get(`${appReducer.API_url}getxcodes`).then((response) => {
      if (!selectionList.length) {
        response.data.recordset.map((data, index) => {
          let dataObj = { label: data.XCode, year: index }
          selectionList.push(dataObj);
          return selectionList
        })
      }
    }).catch((error) => {
      // handle error
      console.log(error);
    })
  };

  if (!selectionList.length) {
    GetXcodes()
    setTimeout(() => {
      forceUpdate()
    }, 500);
  }
  return (
    <FormControl fullWidth>
      <Grid container direction={"column"} spacing={4}>
        <Grid id="lookup-elements-fields" item>
          <Autocomplete
            className='lookup-elements-space-between'
            disablePortal
            id="xcode-selected-value"
            options={selectionList}
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

// A few function below are necessary for redux implementation
const mapStateToProps = (state) => {
  return {
    appReducer: { ...state.appReducer }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setHarnessListAction: (request) => dispatch(setHarnessListAction(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LookupComponent);