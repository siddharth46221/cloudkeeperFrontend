import { useState } from "react"
import { InputElement } from "./InputElement";



export const CustomForm = ({
  fields, 
  onSubmit,
  buttonText,
  formStyle = "",
  fieldStyle = "",
  labelStyle = "",
  inputStyle = "",
  buttonStyle = ""
}) => {

  const [formData, setFormData] = useState(() =>{
    const initialData = {};
    fields.forEach((f) => (initialData[f.name] = f.defaultValue || ""));
    return initialData;
  });

  const handleChange = (e, name) =>{
         setFormData({...formData, [name]: e.target.value})
  };

  const submit= (e) => {
    e.preventDefault();
    onSubmit(formData);
  }

   return (
    <form
       onSubmit={submit}
       className= {`${formStyle}`}
    >

      {fields.map((field,i) => (
        <InputElement key={i} field={field} handleChange={handleChange} fieldStyle={fieldStyle} formData={formData} inputStyle={inputStyle} labelStyle={labelStyle} />
      ))}
      <button
      type="submit"
      className={`${buttonStyle}`}
      >
      {buttonText}
      </button>

    </form>
  )
}
