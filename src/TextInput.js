import React from "react";

const TextInput = props => {
  return (
    <input
      type="text"
      className={`rtdp-input ${props.className}`}
      placeholder={props.hintText}
      value={props.value}
      onChange={props.onInputChange}
      name={props.name}
      maxLength={props.maxLength}
    />
  );
};

export default TextInput;
