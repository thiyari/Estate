import React from "react";
function Checkbox({ name, value = false, updateValue = ()=>{} }) {

  // handle checkbox change
  const handleChange = () => {
    updateValue(!value, name);
  };
  
  return (
    <div className="form-check">
      <input 
      className="form-check-input"
      type="checkbox" 
      id={`${name}-checkbox`} 
      name={name} 
      checked={value} 
      onChange={handleChange} />
    </div>
  );
};

export default Checkbox;