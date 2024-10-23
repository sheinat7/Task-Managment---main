import React, { useState } from 'react';
import './form.module.css';
import Button from '../buttonComponent/Button';

const Form = ({ fields, onSubmit, children }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <label key={index} htmlFor={field.name}>
          {field.label}
          <input
            type={field.type}
            name={field.name}
            placeholder={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
          />
        </label>
      ))}
      <Button type="submit">{children}</Button>
    </form>
  );
};

export default Form;
