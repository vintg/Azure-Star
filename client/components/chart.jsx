import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Charts extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartOptions:  {
        steppedLine: 'before',
        responsive: true,
        title: {
            display: true,
            position: "top",
            text: 'Energy Forecast (1 Yr)',
            fontSize: 18,
            fontColor: "#111"
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        },
        elements: {
          line: {
              tension: 0
          }
        },
        tooltips: {
              enabled: true,
              mode: 'single',
              callbacks: {
                  label: function(tooltipItems, data) {
                     return [tooltipItems.yLabel]
                  }
              }
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16
            }
        },
      }
    };
  }

  render(){
    return (
      <div className="chart-container">
        <Line
          data = {this.props.data}
          options = {this.state.chartOptions}
          height={500}
          width={700}
        />
      </div>
    );
  }
}

export default Charts;

