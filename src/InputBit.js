import React from 'react';

const InputRub = (props) => {
  return (
    <label>Value in Bitcoins:
      <input 
        type="text" 
        onChange={props.handleChange} 
        value={props.value}
      />
    </label>
  );
}

export default InputRub;