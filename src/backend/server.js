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

app.get('/getharnesslist', (req, res) => {
  const reqParams = {
    interval: +req.query.interval * -1,
    xcode: req.query.xcode
  }
  const query = 
    `SELECT id, system_id, connection_text, drawing_number, type, status, test_date, test_time, retest_count
    FROM workflow_statistic
    WHERE time > DATEADD(minute, ${reqParams.interval}, GETDATE()) AND (x_from = '${reqParams.xcode}' OR x_to = '${reqParams.xcode}') ORDER BY retest_count DESC`;
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
