import React from 'react';

const InputForm = ({handleSubmit, handleInputChange}) => (
  <div className="inputs">
    <div className="input-form">
        <input className="form-address" type="text" placeholder="Address" name="address"
          onChange={e=> handleInputChange(e)}>
        </input>

        <input className="form-syscap" type="text" placeholder="System Capacity" name="sysCap"
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

export default InputForm;