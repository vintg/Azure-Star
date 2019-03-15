import React from 'react';
import Button from '@material-ui/core/Button';

const Summary =({annSol, ac, ev, changeView})=> (
  <div className="summary">
    <div>Annual Expected Solar Radiation (kWh/m^2)
     <h1>{annSol}</h1>
    </div>

    <div>AC Energy (kW)
     <h1>{ac}</h1>
    </div>

    <div>Electricity Value Generated ($)
     <h1>{ev}</h1>
    </div>

    <Button
      onClick={()=>{changeView()}}>
      Reset
    </Button>
  </div>
);

export default Summary;