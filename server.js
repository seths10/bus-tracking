const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bus_nodes',
  password: 'admin',
  port: 5432,
});

const app = express();
app.use(bodyParser.json());


app.post('/api/uplink', (req, res) => {
  const { payload_fields } = req.body.uplink_message.decoded_payload;

  pool.query(
    'INSERT INTO payload_data (altitude, latitude, longitude, sat) VALUES ($1, $2, $3, $4)',
    [payload_fields.altitude, payload_fields.latitude, payload_fields.longitude, payload_fields.sat],
    (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error executing query');
      } else {
        console.log('Payload data saved successfully');
        res.status(200).send('Payload data saved successfully');
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});