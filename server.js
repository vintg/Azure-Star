const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const config = require('../config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.set('PORT', process.env.PORT || 3000);

app.get('/api', (req, res) => {
  console.log('GET', req.query);

  const latitude = req.query.lat;
  const longitude = req.query.lon;
  const system_capacity = req.query.system_capacity;
  const azimuth = req.query.azimuth;
  const tilt = req.query.tilt;
  const array_type = req.query.array_type;
  const module_type = req.query.module_type;
  const eff_losses = req.query.eff_losses;

  const api_params = `&lat=${latitude}&lon=${longitude}&system_capacity=${system_capacity}&azimuth=${azimuth}&tilt=${tilt}&array_type=${array_type}&module_type=${module_type}&losses=${eff_losses}`;

  const uri = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${config.PVWATTS}` + api_params;

  const filepath = path.join(`${__dirname}/data/${api_params}.json`);
      // check for existing output file, if not exists, make new call
      if (!fs.existsSync(filepath)) {
        console.log('request sent to',uri);
        request(uri).then(data=> {
          return new Promise((resolve, reject)=> {
            fs.writeFile(filepath, data, 'UTF-8', err=> {
              if (err) reject(err);
              else resolve(data);
            });
          }).then(res.status(200).send(data))
          .catch(err=>console.log(err))
        }).catch(err=>res.status(404).send(err));
      } else { // else retrieve existing cached version from data folder
        console.log('retrieving cached data from',filepath);
        fs.readFile(filepath, (err, data) => {
          if (err) res.status(400).send(err);
          res.status(200).send(data);
        });
      }

});

const server = app.listen(app.get('PORT'), () => {
  console.log(`Node server running on`, server.address());
});