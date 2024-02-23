import React from 'react';
import { connect } from "react-redux";
import { FormControl, Grid, TextField, Autocomplete, Fab, Radio, RadioGroup, FormControlLabel , FormLabel  } from '@mui/material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import "./lookup.component.scss";

import { setHarnessListAction, setXcodeListAction, setWireListAction, setButtonAction, setXcodeAction, clearHarnessListAction, setWireAction } from '../../redux/app-reducer/app-reducer.actions';

const LookupComponent = ({ appReducer, setHarnessListAction, setXcodeListAction, setButtonAction, setXcodeAction, clearHarnessListAction, setWireListAction, setWireAction }) => {
  React.useEffect(() => {
    PopulateXcodeList()
    PopulateWireList()
  }, []);

  let timeInterval;

  const TimeIntervalhandleChange = (event) => {
    console.log(event.target.value)
    timeInterval = event.target.value
  };

  const PopulateXcodeList = () => {
    if (!appReducer.xcodeList.length) {
      setXcodeListAction(`${appReducer.API_url}getxcodes`)
    }
  }

  const PopulateWireList = () => {
    if (!appReducer.wireList.length) {
      setWireListAction(`${appReducer.API_url}getwires`)
    }
  }

  const HandleSubmit = () => {
    const selectedXcode = document.getElementById('xcode-selected-value').value
    const selectedWire = document.getElementById('wire-selected-value').value
    const timeLine = document.getElementById('outlined-number').value
    if (!selectedXcode && !selectedWire) {
      alert("Please Select Xcode or Wire to continue")
    } else {
      setXcodeAction(selectedXcode)
      setWireAction(selectedWire)
      setHarnessListAction(`${appReducer.API_url}getharnesslist?interval=${timeLine}&xcode=${selectedXcode}&wire=${selectedWire}`)
      setButtonAction(true)
    }
  };

  const HandleClear = () => {
    clearHarnessListAction()
    setXcodeAction('')
    setWireAction('')
    setButtonAction(true)
  }

  const AutocompleteXcodesJSX = () => {
    return(
      <Autocomplete
        disablePortal
        id="xcode-selected-value"
        options={appReducer.xcodeList}
        sx={{ width: 300, marginRight: '.5vw' }}
        defaultValue={appReducer.lastXcode}
        renderInput={(params) => <TextField {...params} label="Xcode" />}
      />
    )
  };

  const AutocompleteErrorListJSX = () => {
    return(
      <Autocomplete
        disabled
        className='lookup-elements-space-between'
        disablePortal
        id="error-type-selected-value"
        options={appReducer.xcodeList}
        sx={{ width: 300 }}
        defaultValue=''
        renderInput={(params) => <TextField {...params} label="Error Type" />}
      />
    )
  };

  const AutocompleteWireListJSX = () => {
    return(
      <Autocomplete
        className='lookup-elements-space-between'
        disablePortal
        id="wire-selected-value"
        options={appReducer.wireList}
        sx={{ width: 300 }}
        defaultValue={appReducer.lastWire}
        renderInput={(params) => <TextField {...params} label="Wire Type" />}
      />
    )
  };

  return (
    <FormControl fullWidth>
      <Grid container direction={"column"} spacing={4}>
        <Grid id="lookup-elements-fields" item>
          <div>
            <AutocompleteXcodesJSX />
            <AutocompleteErrorListJSX />
            <AutocompleteWireListJSX />
          </div>
          <Grid sx={{display: 'grid'}} item>
            <TextField
              sx={{marginRight: '.5vw'}}
              id="outlined-number"
              label="Time to check in minutes"
              type="number"
              variant="outlined"
              InputProps={{
                inputProps: { min: 1 }
              }}
            defaultValue={30}
            />
            <FormControl id='interval_radio_buttons'>
              <FormLabel id="demo-controlled-radio-buttons-group">Check interval</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={TimeIntervalhandleChange}
              >
                <FormControlLabel disabled value="1" control={<Radio />} label="1 minute" />
                <FormControlLabel disabled value="5" control={<Radio />} label="5 minutes" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid sx={{display: 'flex', justifyContent: 'center'}} item>
          <Fab sx={{marginRight: '5vw'}} onClick={HandleSubmit} color="primary" aria-label="LookUp">
            <DataSaverOnIcon />
          </Fab>
          <Fab onClick={HandleClear} color="secondary" aria-label="LookUp">
            <DeleteForeverIcon />
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
    setHarnessListAction: (request) => dispatch(setHarnessListAction(request)),
    setXcodeListAction: (request) => dispatch(setXcodeListAction(request)),
    setWireListAction: (request) => dispatch(setWireListAction(request)),
    setButtonAction: (request) => dispatch(setButtonAction(request)),
    setXcodeAction: (request) => dispatch(setXcodeAction(request)),
    clearHarnessListAction: (request) => dispatch(clearHarnessListAction(request)),
    setWireAction: (request) => dispatch(setWireAction(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LookupComponent);
