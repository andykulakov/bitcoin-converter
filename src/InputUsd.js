import React from 'react';

const InputEur = (props) => {
  return (
    <label>Value in USD:
      <input 
        type="text" 
        onChange={props.handleChange} 
        value={props.value}
      />
    </label>
  );
}

export default InputEur;