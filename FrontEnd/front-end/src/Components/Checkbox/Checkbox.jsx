import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked, value }) => {
  return (
    <div className="form-check">
        <input
        className="form-check-input"
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
        value={value}
        />
    </div>
  );
};

export default Checkbox;