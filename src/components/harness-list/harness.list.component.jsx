import * as React from 'react';
import { connect } from "react-redux";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import "./harness.list.component.scss";

import { setButtonAction, setButtonClearAction } from '../../redux/app-reducer/app-reducer.actions';

const HarnessList = ({ appReducer, setButtonAction, setButtonClearAction }) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    if (appReducer.actionButtonPressed) {
      setTimeout(() => {
        forceUpdate()
        if (!appReducer.harnessList.length) {
          if (!appReducer.clearButtonPressed) {
            //alert("No data has been found!")
          } else {
            setButtonClearAction(false)
          }
        }
      }, 1000);
      setButtonAction(false)
    }
  });

  return (
    <React.Fragment>
      <Typography id="harness-list-title" component="h2" variant="h6" color="primary" gutterBottom>
        {  appReducer.harnessList.length ? 'Affected Harnesses ' + appReducer.harnessList.length : 'Affected Harnesses' }
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className='row-font-size'>System_ID</TableCell>
            <TableCell className='row-font-size'>Xcode 1</TableCell>
            <TableCell className='row-font-size'>Xcode 2</TableCell>
            <TableCell className='row-font-size'>Wire name</TableCell>
            <TableCell className='row-font-size'>Harness number</TableCell>
            <TableCell className='row-font-size'>Error type</TableCell>
            <TableCell className='row-font-size'>Status</TableCell>
            <TableCell className='row-font-size'>Test Date</TableCell>
            <TableCell className='row-font-size'>Test Time</TableCell>
            <TableCell className='row-font-size'>Retest counts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appReducer.harnessList.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='row-font-size'>{row.system_id}</TableCell>
              <TableCell className='row-font-size'>{row.x_from}</TableCell>
              <TableCell className='row-font-size'>{row.x_to}</TableCell>
              <TableCell className='row-font-size'>{row.connection_text}</TableCell>
              <TableCell className='row-font-size'>{row.drawing_number}</TableCell>
              <TableCell className='row-font-size'>{row.type}</TableCell>
              <TableCell className='row-font-size'>{row.status}</TableCell>
              <TableCell className='row-font-size'>{row.test_date}</TableCell>
              <TableCell className='row-font-size'>{row.test_time}</TableCell>
              <TableCell className='row-font-size'>{row.retest_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
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
    setButtonAction: (request) => dispatch(setButtonAction(request)),
    setButtonClearAction: (request) => dispatch(setButtonClearAction(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HarnessList);
