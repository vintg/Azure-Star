import React from 'react';
import Button from '@material-ui/core/Button';

const InputForm = ({handleSubmit, handleInputChange}) => (
  <div className="inputs">
    <div className="input-form">
        <label> Address
        <input
          className="form-address"
          type="text"
          placeholder="e.g. New York, NY, full address, or use the map locator"
          name="address"
          onChange={e=> handleInputChange(e)}>
        </input>
        </label>

         <label> Rate Type
          <select
            className="form-rate-type"
            name="rate_type"
            onChange={e=> handleInputChange(e)}>
            <option value="0">Residential</option>
            <option value="1">Commercial</option>
          </select>
        </label>

        <label> Array Type
        <select
            className="form-rate-type"
            name="array_type"
            onChange={e=> handleInputChange(e)}>
            <option value="0">Fixed-Open Rack</option>
            <option value="1">Fixed-Roof Mounted</option>
          </select>
        </label>

        <label> Module Type
        <select
            className="form-module"
            name="module_type"
            onChange={e=> handleInputChange(e)}>
            <option value="0">Standard</option>
            <option value="1">Premium</option>
            <option value="2">Thin Film</option>
          </select>
        </label>

        <label> System Capacity (kW)
        <input
          className="form-syscap"
          type="text"
          name="system_capacity"
          placeholder="25"
          onChange={e=> handleInputChange(e)}>
        </input>
        </label>

        <label> Azimuth (deg)
        <input
          className="form-azimuth"
          type="text"
          placeholder="180"
          name="azimuth"
          onChange={e=> handleInputChange(e)}>
        </input>
        </label>

        <label> Tilt (deg)
        <input
          className="form-tilt"
          type="text"
          placeholder="25"
          name="tilt"
          onChange={e=> handleInputChange(e)}>
        </input>
        </label>

        <label> Efficiency Losses (%)
        <input
          className="form-eff-losses"
          type="text"
          placeholder="13"
          name="eff_losses"
          onChange={e=> handleInputChange(e)}>
        </input>
        </label>

        <label> Rate ($/kWh)
        <input
          className="form-rate"
          type="text"
          placeholder="0.12"
          name="rate"
          onChange={e=> handleInputChange(e)}>
        </input>
        </label>

        <Button
          onClick={()=>{handleSubmit()}}>
          Calculate
        </Button>
    </div>
  </div>
);

export default InputForm;