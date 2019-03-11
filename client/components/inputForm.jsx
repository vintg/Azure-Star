import React from 'react';

const inputForm = ({handleSubmit, handleInputChange}) => (
  <div className="inputs">
    <div className="inputForm">
        <input className="form-latitude" type="text" placeholder="latitude" name="lat"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-longitude" type="text" placeholder="longitude" name="lon"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-sysCap" type="text" placeholder="System Capacity" name="sysCap"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-azimuth" type="text" placeholder="Azimuth" name="azimuth"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-tilt" type="text" placeholder="Tilt" name="tilt"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-array" type="text" placeholder="Array Type" name="array_type"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-module" type="text" placeholder="Module Type" name="module_type"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-eff-losses"  placeholder="Efficiency Losses" name="eff_losses"
          onChange={e=> handleInputChange(e)}>
        </input>

        <button className="form-submit"
          onClick={()=>{handleSubmit()}}>Calculate
        </button>
    </div>
  </div>
);

export default inputForm;