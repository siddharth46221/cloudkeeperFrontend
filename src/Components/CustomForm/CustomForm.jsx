import { useState, useEffect } from "react";
import { InputElement } from "./InputElement";

export const CustomForm = ({
  fields,
  onSubmit,
  formStyle = "",
  onFieldChange = "",
  fieldStyle = "",
  labelStyle = "",
  inputStyle = "",
  children,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach((f) => (initialData[f.name] = f.defaultValue || ""));
    return initialData;
  });

  const validateField = (value, validations) => {
    if (!validations) return true;

    const { rules } = validations;
    if (rules?.required && !value) return false;
    if (rules?.maxlength && value.length > rules.maxlength) return false;
    if (rules?.pattern && !rules.pattern.test(value)) return false;

    return true;
  };

  useEffect(() => {
    const valid = fields.every((field) => {
      if (field.disabled) return true;
      return validateField(formData[field.name], field.validations);
    });
    setIsFormValid(valid);
  }, [formData, fields]);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });

    if (name === "role" && onFieldChange) {
      onFieldChange(name, e.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={submit} className="flex flex-col">
      <div className={`${formStyle}`}>
        {fields.map((field, i) => (
          <InputElement
            key={i}
            field={field}
            handleChange={handleChange}
            fieldStyle={fieldStyle}
            formData={formData}
            inputStyle={inputStyle}
            labelStyle={labelStyle}
          />
        ))}
      </div>
      <div>
        {typeof children === "function" ? children(isFormValid) : children}
      </div>
    </form>
  );
};
