import React, { Component } from 'react';
import axios from 'axios';

import InputForm from './components/inputForm';
import Charts from './components/chart';
import Summary from './components/summary';

import config from '../config.json';

let L;

L.mapquest.key = config.MAPQUEST;
const defLat = 40.741423;
const defLon = -73.99758;

export class App extends Component {
  constructor() {
    super();
    this.state = {
      // rate_type: 0,
      rate: 0.12,
      address: '',
      lat: defLat,
      lon: defLon,
      systemCapacity: 25,
      azimuth: 180,
      tilt: 25,
      arrayType: 1,
      moduleType: 1,
      effLosses: 13,
      view: 0,
      chartData: {},
      annualSolar: 0,
      acEnergy: 0,
      electricityValue: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.loadMap();
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    let coords; let latitude; let longitude;

    const {
      lat, lon, systemCapacity, azimuth, tilt, arrayType, moduleType, effLosses, address,
    } = this.state;

    axios
      .get('/address', {
        params: {
          address: { address },
        },
      })
      .then((res) => {
        coords = res.data[0].locations[1];
        latitude = coords.latLng.lat;
        longitude = coords.latLng.lng;

        if ({ lat } !== defLat && { lon } !== defLon) {
          latitude = { lat };
          longitude = { lon };
        }

        axios
          .get('/calculate', {
            params: {
              lat: latitude,
              lon: longitude,
              systemCapacity: { systemCapacity },
              azimuth: { azimuth },
              tilt: { tilt },
              arrayType: { arrayType },
              moduleType: { moduleType },
              effLosses: { effLosses },
            },
          })
          .then((res2) => {
            this.setState({
              chartData: this.preprocess(res2.data),
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    this.changeView();
  }

  preprocess(data) {
    const { rate } = this.state;

    this.setState({
      annualSolar: Number(data.solrad_annual.toFixed(3)),
      acEnergy: Number(data.ac_annual.toFixed(3)),
      electricityValue: Number(({ rate } * data.ac_annual).toFixed(3)),
    });
    const d = new Date();
    const start = d.getMonth();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const xlabel = [];
    for (let i = start; i < start + 12; i + 1) {
      xlabel.push(months[i % 12]);
    }
    return {
      ac: {
        labels: xlabel,
        datasets: [
          {
            label: 'AC 1-YR',
            backgroundColor: 'rgba(66,134,244,0.3)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data.ac_monthly,
          },
        ],
      },
      solar: {
        labels: xlabel,
        datasets: [
          {
            label: 'Solar Radiation 1-YR',
            backgroundColor: 'rgba(255,203,5,0.3)',
            borderColor: 'rgba(255, 203, 5, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 203, 5, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(255, 203, 5, 1)',
            pointHoverBorderColor: 'rgba(248, 148, 6, 1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data.solrad_monthly,
          },
        ],
      },
    };
  }

  loadMap() {
    const { lat, lon } = this.state;

    const map = L.mapquest.map('map', {
      center: [{ lat }, { lon }],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12,
    });

    const locatorControl = L.mapquest.locatorControl();
    locatorControl.on('current_position', (e) => {
      const c = e.position.coords;
      this.setState({
        lat: c.latitude,
        lon: c.longitude,
      });
    });
    map.addControl(locatorControl);

    const marker = L.marker([{ lat }, { lon }], {
      draggable: true,
    });

    marker.on('dragend', (e) => {
      this.setState({
        lat: e.target._latlng.lat,
        lon: e.target._latlng.lng,
      });
    });

    marker.addTo(map);
  }

  changeView() {
    const { view } = this.state;

    this.setState({
      view: ({ view } + 1) % 2,
    });
    const x = document.getElementById('map');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  renderView() {
    const {
      view, chartData, annualSolar, acEnergy, electricityValue,
    } = this.state;
    if (view === 0) {
      return (
        <div>
          <InputForm
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      );
    }
    return (
      <div>
        <Charts data={chartData.ac} />
        <Charts data={chartData.solar} />
        <Summary
          annSol={annualSolar}
          ac={acEnergy}
          ev={electricityValue}
          changeView={this.changeView}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div id="map" />
        {this.renderView()}
      </div>
    );
  }
}

export default App;
