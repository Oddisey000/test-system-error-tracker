import React from 'react';
import { connect } from "react-redux";
import { FormControl, Grid, TextField, Autocomplete, Fab, Radio, RadioGroup, FormControlLabel , FormLabel  } from '@mui/material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import "./lookup.component.scss";

import { setHarnessListAction, setXcodeListAction, setWireListAction, setErrorListAction, setButtonAction, setButtonClearAction, setXcodeAction, setErrorAction, clearHarnessListAction, setWireAction, setContinuouslyCheckAction } from '../../redux/app-reducer/app-reducer.actions';

let timeInterval;
let intervalID;

const LookupComponent = ({ appReducer, setHarnessListAction, setXcodeListAction, setErrorListAction, setButtonAction, setButtonClearAction, setErrorAction, setXcodeAction, clearHarnessListAction, setWireListAction, setWireAction, setContinuouslyCheckAction }) => {
  React.useEffect(() => {
    PopulateXcodeList()
    PopulateWireList()
    PopulateErrorList()
  }, []);
  React.useEffect(() => {
    if (appReducer.continuouslyCheck) {
      CheckDataIntervalStart()
    }
  });

  const CheckDataIntervalStart = () => {
    setContinuouslyCheckAction(false)
    intervalID = setInterval(doStuff, timeInterval * 60 * 1000);
    function doStuff() {
      document.getElementById('get-data-results').click()
      const newTimeValue = +document.getElementById('outlined-number').value + +timeInterval
      document.getElementById('outlined-number').value = newTimeValue
    }
  }

  const TimeIntervalhandleChange = (event) => {
    timeInterval = event.target.value
    setContinuouslyCheckAction(true)
  };

  const PopulateXcodeList = () => {
    if (!appReducer.xcodeList.length) {
      setXcodeListAction(`${appReducer.API_url}getxcodes`)
    }
  }

  const PopulateErrorList = () => {
    if (!appReducer.errorList.length) {
      setErrorListAction(`${appReducer.API_url}geterrorlist`)
    }
  }

  const PopulateWireList = () => {
    if (!appReducer.wireList.length) {
      setWireListAction(`${appReducer.API_url}getwires`)
    }
  }

  const HandleSubmit = () => {
    let selectedErrorNumber = '';
    const selectedXcode = document.getElementById('xcode-selected-value').value
    const selectedWire = document.getElementById('wire-selected-value').value
    const selectedError = document.getElementById('error-type-selected-value').value
    const timeLine = document.getElementById('outlined-number').value

    document.getElementById('interval_radio_buttons').style.display = 'block'

    for (let index = 0; index < appReducer.errorList.length; index++) {
      const element = appReducer.errorList[index];
      if (element.label === selectedError) {
        selectedErrorNumber = element.ErrorType
      }
    }

    if (!selectedXcode && !selectedWire && !selectedError) {
      alert("Please Select Xcode or Wire to continue")
    } else {
      setXcodeAction(selectedXcode)
      setWireAction(selectedWire)
      setErrorAction(selectedError)
      setHarnessListAction(`${appReducer.API_url}getharnesslist?interval=${timeLine}&xcode=${selectedXcode}&wire=${selectedWire}&error=${selectedErrorNumber}`)
      setButtonAction(true)
    }
  };

  const HandleClear = () => {
    clearInterval(intervalID)
    clearHarnessListAction()
    setXcodeAction('')
    setWireAction('')
    setErrorAction('')
    setContinuouslyCheckAction(false)
    setButtonAction(true)
    setButtonClearAction(true)
    window.location.reload()
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
        className='lookup-elements-space-between'
        disablePortal
        id="error-type-selected-value"
        options={appReducer.errorList}
        sx={{ width: 300 }}
        defaultValue={appReducer.lastError}
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
                id="check-interval-value"
                name="controlled-radio-buttons-group"
                onChange={TimeIntervalhandleChange}
              >
                <FormControlLabel className="interval-radio-button" value="1" control={<Radio />} label="1 minute" />
                <FormControlLabel className="interval-radio-button" value="5" control={<Radio />} label="5 minutes" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid sx={{display: 'flex', justifyContent: 'center'}} item>
          <Fab id="get-data-results" sx={{marginRight: '5vw'}} onClick={HandleSubmit} color="primary" aria-label="LookUp">
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
    setErrorListAction: (request) => dispatch(setErrorListAction(request)),
    setButtonAction: (request) => dispatch(setButtonAction(request)),
    setButtonClearAction: (request) => dispatch(setButtonClearAction(request)),
    setXcodeAction: (request) => dispatch(setXcodeAction(request)),
    setErrorAction: (request) => dispatch(setErrorAction(request)),
    setWireAction: (request) => dispatch(setWireAction(request)),
    clearHarnessListAction: (request) => dispatch(clearHarnessListAction(request)),
    setContinuouslyCheckAction: (request) => dispatch(setContinuouslyCheckAction(request)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LookupComponent);
