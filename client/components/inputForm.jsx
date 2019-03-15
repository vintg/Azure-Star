import React from 'react';
import Button from '@material-ui/core/Button';

const InputForm = ({handleSubmit, handleInputChange}) => (
  <div className="inputs">
    <div className="input-form">
        <input
          className="form-address"
          type="text"
          placeholder="Address"
          name="address"
          onChange={e=> handleInputChange(e)}>
        </input>

        <div className="form-rate-type">
          <input
            className="form-rate-type"
            type="radio"
            value="0"
            name="rate_type"
            onChange={e=> handleInputChange(e)}>
          </input><label>Residential</label>

          <input
            className="form-rate-type"
            type="radio"
            value="1"
            name="rate_type"
            onChange={e=> handleInputChange(e)}>
          </input> <label>Commercial</label>
        </div>

        <input
          className="form-rate"
          type="text"
          placeholder="Rate $/kWh"
          name="rate"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input
          className="form-syscap"
          type="text"
          name="system_capacity"
          placeholder="System Capacity (kW) e.g. 25"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input
          className="form-azimuth"
          type="text"
          placeholder="Azimuth (deg) e.g. 180"
          name="azimuth"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input
          className="form-tilt"
          type="text"
          placeholder="Tilt (deg) e.g. 25"
          name="tilt"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input
          className="form-array"
          type="text"
          name="array_type"
          placeholder = "Array Type: Enter 0 for Fixed - Open Rack, 1 for Fixed - Roof Mounted"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input
          className="form-module"
          type="text"
          placeholder="Module Type: Enter 0 for Standard, 1 Premium, 2 Thin film"
          name="module_type"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input
          className="form-eff-losses"
          type="text"
          placeholder="Efficiency Losses (percent) e.g. 13"
          name="eff_losses"
          onChange={e=> handleInputChange(e)}>
        </input>

        <Button
          // className="form-submit"
          onClick={()=>{handleSubmit()}}>
          Calculate
        </Button>
    </div>
  </div>
);

export default InputForm;