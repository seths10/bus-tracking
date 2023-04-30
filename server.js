const express = require('express');
const app = express();

let data = [];

app.post('/api/uplink', (req, res) => {
  const { payload_fields } = req.body.uplink_message.decoded_payload;
  const deviceID = req.body.device_ids.device_id;

  console.log(`Received data from device ${deviceID}: ${payload_fields}`);

  const altitude = payload_fields.altitude;
  const latitude = payload_fields.latitude;
  const longitude = payload_fields.longitude;
  const sat = payload_fields.sat;

  const newData = {
    deviceID,
    altitude,
    latitude,
    longitude,
    sat,
    timestamp: Date.now()
  };

  data.push(newData);

  res.sendStatus(200);

});

app.get('/api/data', (req, res) => {
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});