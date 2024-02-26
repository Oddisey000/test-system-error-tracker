const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
const path = require("path");

const app = express();
const port = process.env.PORT || 3200;

const config = {
  user: process.env.DB_USER || 'statistic_user',
  password: process.env.DB_PASSWORD || 'stat_usr_007',
  server: process.env.DB_SERVER || "SVUA5PJ05.LEONI.LOCAL",
  database: process.env.DB_DATABASE || 'BR206'

  /*user: process.env.DB_USER || 'pevi5001',
  password: process.env.DB_PASSWORD || '123',
  server: process.env.DB_SERVER || 'DESKTOP-B0FAKTM\\SQLEXPRESS',
  database: process.env.DB_DATABASE || 'LSMG3'*/
}

app.use(cors());
app.use(express.static(path.join(__dirname, '../../build')));

app.get('/getxcodes', (req, res) => {
  const query = `SELECT DISTINCT XCode FROM Module_Modules`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/getwires', (req, res) => {
  const query = `SELECT DISTINCT wire_name FROM WireList`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/geterrorlist', (req, res) => {
  const query = `SELECT ErrorType, ErrorDesc FROM ErrorTypes`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/getharnesslist', (req, res) => {
  const reqParams = {
    interval: +req.query.interval * -1,
    xcode: '%' + req.query.xcode + '%',
    wire: '%' + req.query.wire + '%',
    errorType: req.query.error === '' ? false : +req.query.error
  }
  console.log(reqParams)
  
  let query;
  if (!reqParams.errorType) {
    query = 
    `SELECT t1.id, t1.x_from, t1.x_to, t1.system_id, t1.connection_text, t1.drawing_number, t2.ErrorDesc AS type, t1.status, t1.test_date, t1.test_time, t1.retest_count
      FROM workflow_statistic AS t1
      JOIN ErrorTypes AS t2 ON t1.type = t2.ErrorType
        WHERE time > DATEADD(minute, ${reqParams.interval}, GETDATE()) AND (x_from LIKE '${reqParams.xcode}' OR x_to LIKE '${reqParams.xcode}') 
          AND connection_text LIKE '${reqParams.wire}' ORDER BY retest_count DESC`;
  } else {
    query = 
    `SELECT t1.id, t1.x_from, t1.x_to, t1.system_id, t1.connection_text, t1.drawing_number, t2.ErrorDesc AS type, t1.status, t1.test_date, t1.test_time, t1.retest_count
      FROM workflow_statistic AS t1
      JOIN ErrorTypes AS t2 ON t1.type = t2.ErrorType
        WHERE time > DATEADD(minute, ${reqParams.interval}, GETDATE()) AND (x_from LIKE '${reqParams.xcode}' OR x_to LIKE '${reqParams.xcode}') 
          AND connection_text LIKE '${reqParams.wire}' AND type = ${reqParams.errorType} ORDER BY retest_count DESC`;
  }
  
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  })
});

sql.connect(config, err => {
  if (err) {
     console.log('Failed to open a SQL Database connection.', err.stack);
     process.exit(1);
  }
  app.listen(port, () => {
     console.log(`App is listening at http://localhost:${port}`);
  });
});
