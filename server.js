const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const config = require('./config');
const axios = require('axios');
const converter = require('json-2-csv');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.set('PORT', process.env.PORT || 3000);

const asyncMiddleware = cb => (req, res, next=console.error) => {
  Promise.resolve(cb(req, res, next)).catch(next);
};

app.get('/address', asyncMiddleware(async(req,res,next) => {
  const location = req.query.address || 'New York, NY';
  const uri = `http://open.mapquestapi.com/geocoding/v1/address?key=${config.MAPQUEST}&location=${location}`;
  const coords = await axios.get(uri);
  res.json(coords.data.results);
}));

app.get('/calculate', asyncMiddleware(async(req,res,next) => {
  const {
        lat,
        lon,
        system_capacity,
        azimuth,
        tilt,
        array_type,
        module_type,
        eff_losses
      } = req.query;

  const api_params = `&lat=${lat}&lon=${lon}&system_capacity=${system_capacity}&azimuth=${azimuth}&tilt=${tilt}&array_type=${array_type}&module_type=${module_type}&losses=${eff_losses}`;
  const uri = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${config.PVWATTS}` + api_params;
  const getPVWatts = await axios.get(uri);
  const filepath = path.join(`${__dirname}/data/${api_params}.json`);

 // if (!fs.existsSync(filepath)) {
    converter.json2csvAsync(getPVWatts.data)
    .then(json => {
      fs.writeFile(filepath, json, err => {
        if (err) throw err;
      });
      res.json(getPVWatts.data.outputs);
    })
    .catch(err => console.log(err))
  // } else {
  //   fs.readFile(filepath, "utf8", (err, data) => {
  //     if (err) res.status(400).send(err);
  //     converter.csv2jsonAsync(data)
  //     .then(()=>{
  //       console.log(data);
  //       res.json(data)
  //     })
  //     .catch(err => console.log(err));
  //   });
  // }

}));

const server = app.listen(app.get('PORT'), () => {
  console.log(`Node server running on`, server.address());
});