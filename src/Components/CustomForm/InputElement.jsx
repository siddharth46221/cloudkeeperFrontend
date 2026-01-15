import React, { useState } from "react";

export const InputElement = ({
  field,
  formData,
  handleChange,
  fieldStyle,
  labelStyle,
  inputStyle,
}) => {
  const [error, setError] = useState("");
  const disabled = field.disabled;

  function handleError(e) {
    if (!field.validations) {
      setError("");
      return;
    }
    const { rules, messages } = field.validations;
    if (rules.required && !e.target.value) {
      setError(messages.required);
      return;
    } else if (rules.maxlength && e.target.value.length > rules.maxlength) {
      setError(messages.maxlength);
      return;
    } else if (rules.pattern && !e.target.value.match(rules.pattern)) {
      setError(messages.pattern);
      return;
    }
    setError("");
  }
  return (
    <div className={`${fieldStyle}`}>
      <label className={`${labelStyle}`}>{field.label}</label>

      {field.type === "textarea" ? (
        <textarea
          placeholder={field.placeholder}
          value={formData[field.name]}
          className={`${inputStyle} `}
          onChange={(e) => {
            handleError(e);
            handleChange(e, field.name);
          }}
        ></textarea>
      ) : field.type === "select" ? (
        <select
          value={formData[field.name]}
          className={`${inputStyle} `}
          onChange={(e) => {
            handleError(e);
            handleChange(e, field.name);
          }}
        >
          {field.options.map((op, index) => (
            <option key={index} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name]}
          className={`${inputStyle} ${
            error ? "border-red-500 focus:outline-red-500" : ""
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          onChange={(e) => {
            handleError(e);
            handleChange(e, field.name);
          }}
          disabled={disabled}
        />
      )}
      {error && <p className="text-red-500 text-[13px] mt-1">{error}</p>}
    </div>
  );
};
