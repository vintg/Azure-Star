import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const InputForm = ({ handleSubmit, handleInputChange }) => (
  <div className="inputs">
    <div className="input-form">
      <label htmlFor="address">
        {' '}
        Address
        <input
          id="address"
          className="form-address"
          type="text"
          placeholder="e.g. New York, NY, full address, or use the map locator"
          name="address"
          onChange={e => handleInputChange(e)}
        />
      </label>

      <label htmlFor="rate_type">
        {' '}
        Rate Type
        <select
          id="rate_type"
          className="form-rate-type"
          name="rate_type"
          onChange={e => handleInputChange(e)}
        >
          <option value="0">Residential</option>
          <option value="1">Commercial</option>
        </select>
      </label>

      <label htmlFor="array_type">
        {' '}
        Array Type
        <select
          id="array_type"
          className="form-rate-type"
          name="array_type"
          onChange={e => handleInputChange(e)}
        >
          <option value="0">Fixed-Open Rack</option>
          <option value="1">Fixed-Roof Mounted</option>
        </select>
      </label>

      <label htmlFor="module_type">
        {' '}
        Module Type
        <select
          id="module_type"
          className="form-module"
          name="module_type"
          onChange={e => handleInputChange(e)}
        >
          <option value="0">Standard</option>
          <option value="1">Premium</option>
          <option value="2">Thin Film</option>
        </select>
      </label>

      <label htmlFor="system_capacity">
        {' '}
        System Capacity (kW)
        <input
          id="system_capacity"
          className="form-syscap"
          type="text"
          name="system_capacity"
          placeholder="25"
          onChange={e => handleInputChange(e)}
        />
      </label>

      <label htmlFor="azimuth">
        {' '}
        Azimuth (deg)
        <input
          id="azimuth"
          className="form-azimuth"
          type="text"
          placeholder="180"
          name="azimuth"
          onChange={e => handleInputChange(e)}
        />
      </label>

      <label htmlFor="tilt">
        {' '}
        Tilt (deg)
        <input
          id="tilt"
          className="form-tilt"
          type="text"
          placeholder="25"
          name="tilt"
          onChange={e => handleInputChange(e)}
        />
      </label>

      <label htmlFor="eff_losses">
        {' '}
        Efficiency Losses (%)
        <input
          id="eff_losses"
          className="form-eff-losses"
          type="text"
          placeholder="13"
          name="eff_losses"
          onChange={e => handleInputChange(e)}
        />
      </label>

      <label htmlFor="rate">
        {' '}
        Rate ($/kWh)
        <input
          id="rate"
          className="form-rate"
          type="text"
          placeholder="0.12"
          name="rate"
          onChange={e => handleInputChange(e)}
        />
      </label>

      <Button
        onClick={() => {
          handleSubmit();
        }}
      >
        Calculate
      </Button>
    </div>
  </div>
);

InputForm.defaultProps = {
  handleSubmit: '',
  handleInputChange: '',
};

InputForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default InputForm;
