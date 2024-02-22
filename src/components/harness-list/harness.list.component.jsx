import * as React from 'react';
import { connect } from "react-redux";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import "./harness.list.component.scss";

// Generate Order Data
function createData(id, system_id, logged_in_user, drawing_number, status, test_date, test_time, retest_count) {
  return {id, system_id, logged_in_user, drawing_number, status, test_date, test_time, retest_count };
}

const rows = [];
/*const rows = [
  createData(
    '0',
    'ETE11_01',
    '427291',
    '40008607858MBR',
    'Test ended OK',
    '27.10.2021',
    '16:05:45',
    '1'
  ),
  createData(
    '1',
    'ETE11_01',
    '427291',
    '40008607858MBR',
    'Test ended OK',
    '27.10.2021',
    '16:05:45',
    '1'
  ),
  createData(
    '2',
    'ETE11_01',
    '427291',
    '40008607858MBR',
    'Test ended OK',
    '27.10.2021',
    '16:05:45',
    '1'
  ),
  createData(
    '3',
    'ETE11_01',
    '427291',
    '40008607858MBR',
    'Test ended OK',
    '27.10.2021',
    '16:05:45',
    '1'
  ),
  createData(
    '4',
    'ETE11_01',
    '427291',
    '40008607858MBR',
    'Test ended OK',
    '27.10.2021',
    '16:05:45',
    '1'
  ),
];*/

const HarnessList = ({ appReducer }) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  setTimeout(() => {
    if (!appReducer.harnessList.length) {
      forceUpdate()
    }
  }, 500);
  return (
    <React.Fragment>
      <Typography id="harness-list-title" component="h2" variant="h6" color="primary" gutterBottom>
        Affected Harnesses
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>System_ID</TableCell>
            <TableCell>Operator</TableCell>
            <TableCell>Harness number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Test Date</TableCell>
            <TableCell>Test Time</TableCell>
            <TableCell>Retest couts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appReducer.harnessList.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.system_id}</TableCell>
              <TableCell>{row.logged_in_user}</TableCell>
              <TableCell>{row.drawing_number}</TableCell>
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

export default connect(mapStateToProps)(HarnessList);