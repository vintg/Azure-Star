import React, { Component } from 'react';
import axios from 'axios';

import InputForm from './components/inputForm';
import Charts from './components/chart';
import Summary from './components/summary';

import config from '../config.json';

L.mapquest.key = config.MAPQUEST;
const defLat = 40.741423;
const defLon = -73.99758;

export class App extends Component {
  constructor() {
    super();
    this.state = {
      rate_type: 0,
      rate: 0.12,
      address: '',
      lat: defLat,
      lon: defLon,
      system_capacity: 25,
      azimuth: 180,
      tilt: 25,
      array_type: 1,
      module_type: 1,
      eff_losses: 13,
      view: 0,
      chartData: {},
      annual_solar: 0,
      ac_energy: 0,
      electricity_value: 0,
      mapURL: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(){
    let coords, latitude, longitude, mapURL;

    axios.get('/address', {
      params: {
          address: this.state.address
        }
    }).then(res => {
      coords = res.data[0].locations[1];
      latitude = coords.latLng.lat;
      longitude = coords.latLng.lng;

      if(this.state.lat !== defLat && this.state.lon !== defLon){
        latitude = this.state.lat;
        longitude = this.state.lon;
      }

      axios.get('/calculate',{
        params: {
          lat: latitude,
          lon: longitude,
          system_capacity: this.state.system_capacity,
          azimuth: this.state.azimuth,
          tilt: this.state.tilt,
          array_type: this.state.array_type,
          module_type: this.state.module_type,
          eff_losses: this.state.eff_losses,
        }
      }).then(res => {
          this.setState({
            chartData: this.preprocess(res.data)
          })
      }).catch((err)=> console.log(err));
    }).catch((err)=> console.log(err));

    this.changeView();
  }

  preprocess(data) {
    this.setState({
      annual_solar: Number(data.solrad_annual.toFixed(3)),
      ac_energy: Number(data.ac_annual.toFixed(3)),
      electricity_value: Number((this.state.rate*data.ac_annual).toFixed(3))
    });
    const d = new Date();
    const start = d.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const xlabel = [];
    for (let i = start; i<start+12;i++){
      xlabel.push(months[i%12]);
    }
    return {
      ac:{
      labels: xlabel,
      datasets: [{
          label: 'AC 1-YR',
            backgroundColor: "rgba(66,134,244,0.3)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          data: data.ac_monthly
        }]
      },
      solar:{
        labels: xlabel,
        datasets: [{
          label: 'Solar Radiation 1-YR',
            backgroundColor: "rgba(255,203,5,0.3)",
            borderColor: "rgba(255, 203, 5, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255, 203, 5, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(255, 203, 5, 1)",
            pointHoverBorderColor: "rgba(248, 148, 6, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          data: data.solrad_monthly
        }]
      }
    };
  }

  loadMap(){
    let map = L.mapquest.map('map', {
      center: [this.state.lat, this.state.lon],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });

    let locatorControl = L.mapquest.locatorControl()
    locatorControl.on('current_position', e=>{
      const c = e.position.coords;
      this.setState({
        lat: c.latitude,
        lon: c.longitude
      });
    });
    map.addControl(locatorControl);

    let marker = L.marker([this.state.lat, this.state.lon],
      {  draggable: true });

    marker.on('dragend', (e)=> {
      this.setState({
        lat: e.target._latlng.lat,
        lon: e.target._latlng.lng
      });
    });

    marker.addTo(map);
  }

  changeView(){
    this.setState({
      view: (this.state.view+1)%2
    });
    const x = document.getElementById("map");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  renderView(){
    const view = this.state.view;
    if(view === 0){
      return (
        <div>
        <InputForm
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        </div>
      )
    } else {
      return (
        <div>
        <Charts data={this.state.chartData.ac}/>
        <Charts data={this.state.chartData.solar}/>
        <Summary
           annSol={this.state.annual_solar}
           ac={this.state.ac_energy}
           ev={this.state.electricity_value}
           changeView={this.changeView}
        />
        </div>
      )
    }
  }

  componentDidMount(){
    this.loadMap();
  }

  render() {
    return (
      <div className="wrapper">
        <div id = "map"></div>
        {this.renderView()}
      </div>
    );
  }
};
