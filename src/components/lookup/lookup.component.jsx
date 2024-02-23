import React from 'react';
import { connect } from "react-redux";
import { FormControl, Grid, TextField, Autocomplete, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import "./lookup.component.scss";

import { setHarnessListAction, setXcodeListAction, setButtonAction, setXcodeAction } from '../../redux/app-reducer/app-reducer.actions';

const LookupComponent = ({ appReducer, setHarnessListAction, setXcodeListAction, setButtonAction, setXcodeAction }) => {
  React.useEffect(() => {
    PopulateXcodeList()
  }, []);

  const PopulateXcodeList = () => {
    if (!appReducer.xcodeList.length) {
      setXcodeListAction(`${appReducer.API_url}getxcodes`)
    }
  }

  const HandleSubmit = () => {
    const selectedXcode = document.getElementById('xcode-selected-value').value
    const timeLine = document.getElementById('outlined-number').value
    if (!selectedXcode) {
      alert("Please Select Xcode to continue")
    } else {
      setXcodeAction(selectedXcode)
      setHarnessListAction(`${appReducer.API_url}getharnesslist?interval=${timeLine}&xcode=${selectedXcode}`)
      setButtonAction(true)
    }
  };

  const AutocompleteJSX = () => {
    return(
      <Autocomplete
        className='lookup-elements-space-between'
        disablePortal
        id="xcode-selected-value"
        options={appReducer.xcodeList}
        sx={{ width: 300 }}
        defaultValue={appReducer.lastXcode}
        renderInput={(params) => <TextField {...params} label="Xcode" />}
      />
    )
  };

  return (
    <FormControl fullWidth>
      <Grid container direction={"column"} spacing={4}>
        <Grid id="lookup-elements-fields" item>
          <AutocompleteJSX />
          <TextField
            sx={{marginRight: '1vw'}}
            id="outlined-number"
            label="Tineline to check in minutes"
            type="number"
            variant="outlined"
            InputProps={{
              inputProps: { min: 1 }
            }}
           defaultValue={30}
          />
          <Fab onClick={HandleSubmit} color="primary" aria-label="LookUp">
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
    setHarnessListAction: (request) => dispatch(setHarnessListAction(request)),
    setXcodeListAction: (request) => dispatch(setXcodeListAction(request)),
    setButtonAction: (request) => dispatch(setButtonAction(request)),
    setXcodeAction: (request) => dispatch(setXcodeAction(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LookupComponent);