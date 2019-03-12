import React, { Component } from 'react';
import axios from 'axios';

import InputForm from './components/inputForm';
import Charts from './components/chart';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      rateType: 0,
      rate: 0,
      address: '',
      lat: 0,
      lon: 0,
      sysCap: 25,
      azimuth: 180,
      tilt: 25,
      array_type: 1,
      module_type: 1,
      eff_losses: 13,
      view: 0,
      chartData: {},
      annual_solar: 0,
      AC_energy: 0,
      electricity_value: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });

    if(e.target.name === 'coordinates') {
      axios.get('/coordinates', {
        params: {
          address: this.state.address
        }
      }).then(res => {
        this.setState({
          lat: res.lat,
          lon: res.lng
        });
      }).catch((err)=> console.log(err));
    }
  }

  handleSubmit(){
    axios.get('/api',{
      params: {
        lat: this.state.lat,
        lon: this.state.lon,
        system_capacity: this.state.syscap,
        azimuth: this.state.azimuth,
        tilt: this.state.tilt,
        array_type: this.state.array_type,
        module_type: this.state.module_type,
        eff_losses: this.state.eff_losses,
      }
    }).then(res => {
      this.setState({
        chartData: this.preprocess(res.data)
      });
      console.log('output:\n',res.data);
    }).catch((err)=> console.log(err));

    this.changeView();
  }

  preprocess(data) {
    this.setState({
      annual_solar: data.solrad_annual,
      AC_energy: data.ac,
      electricity_value: this.state.rate*data.ac
    });
    const d = new Date();
    const start = d.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const xlabel = [];
    for (let i = start; i<start+12;i++){
      xlabel.push(months[i%12]);
    }
    return {
      labels: xlabel,
      //type: 'bar',
      datasets: [{
          label: 'AC',
            backgroundColor: "rgba(66,134,244,0.3)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          data: data.ac_monthly
        }, {
          label: 'Solar Radiation',
          data: solrad_monthly,
        }]
    };
  }

  changeView(){
    this.setState({
      view: this.state.view === 0? 1:0
    });
  }

  renderView(){
    const view = this.state.view;
    if(view === 0){
      return <InputForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    } else {
      return <Charts
        data = {this.state.chartData}
      />
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.renderView()}
      </div>
    );
  }
};
