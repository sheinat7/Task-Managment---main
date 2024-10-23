import React, { useState } from 'react';
import Form from '../../components/formComponent/Form';
import axiosInstance from '../../api/axiosInstance'; // Axios instance

const Registration = () => {
  const fields = [
    { name: 'username', type: 'text', label: 'User name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: true },
    { name: 'dateofbirth', type: 'date', label: 'Date of Birth:', required: true },
  ];

  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    console.log('Form data submitted:', formData); // הוסף שורה זו
    try {
      const response = await axiosInstance.post('/register', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form fields={fields} onSubmit={handleSubmit}>
        Register
      </Form>
    </div>
  );
};

export default Registration;
