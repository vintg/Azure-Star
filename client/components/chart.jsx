import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {
        steppedLine: 'before',
        responsive: true,
        title: {
          display: true,
          position: 'top',
          fontSize: 18,
          fontColor: '#111',
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label(tooltipItems) {
              return [tooltipItems.yLabel];
            },
          },
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#333',
            fontSize: 16,
          },
        },
      },
    };
  }

  render() {
    const { data } = this.props;
    const { chartOptions } = this.state;

    return (
      <div className="chart-container">
        <Line
          data={data}
          options={chartOptions}
          height={320}
          width={640}
        />
      </div>
    );
  }
}

Charts.defaultProps = {
  data: [],
};

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
};

export default Charts;
