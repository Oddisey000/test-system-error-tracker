import * as React from 'react';
import { connect } from "react-redux";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import "./harness.list.component.scss";

import { setButtonAction } from '../../redux/app-reducer/app-reducer.actions';

const HarnessList = ({ appReducer, setButtonAction }) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    console.log(appReducer.harnessList)
    if (appReducer.actionButtonPressed) {
      setTimeout(() => {
        forceUpdate()
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
            <TableCell>System_ID</TableCell>
            <TableCell>Wire name</TableCell>
            <TableCell>Harness number</TableCell>
            <TableCell>Error type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Test Date</TableCell>
            <TableCell>Test Time</TableCell>
            <TableCell>Retest counts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appReducer.harnessList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.system_id}</TableCell>
              <TableCell>{row.connection_text}</TableCell>
              <TableCell>{row.drawing_number}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.test_date}</TableCell>
              <TableCell>{row.test_time}</TableCell>
              <TableCell>{row.retest_count}</TableCell>
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
    setButtonAction: (request) => dispatch(setButtonAction(request))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HarnessList);
