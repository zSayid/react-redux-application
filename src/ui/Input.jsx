import { useState } from "react";
import "./Input.css";

const Input = ({ 
  label, 
  type = "text", 
  state, 
  setState, 
  // required = false, 
  className = "" 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = Boolean(state);
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`input-container ${className}`}>
      <input
        id={inputId}
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        // required={required}
        className="input-field"
      />
      <label
        htmlFor={inputId}
        className={`input-label ${isFocused || hasValue ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
