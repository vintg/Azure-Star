import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const Summary = ({
  annSol, ac, ev, changeView,
}) => (
  <div className="summary">
    <div>
      Annual Expected Solar Radiation (kWh/m^2)
      <h1>{annSol}</h1>
    </div>

    <div>
      AC Energy (kW)
      <h1>{ac}</h1>
    </div>

    <div>
      Electricity Value Generated ($)
      <h1>{ev}</h1>
    </div>

    <Button
      onClick={() => {
        changeView();
      }}
    >
      Reset
    </Button>
  </div>
);

Summary.defaultProps = {
  annSol: 0,
  ac: 0,
  ev: 0,
  changeView: '',
};

Summary.propTypes = {
  annSol: PropTypes.number,
  ac: PropTypes.number,
  ev: PropTypes.number,
  changeView: PropTypes.func,
};

export default Summary;
