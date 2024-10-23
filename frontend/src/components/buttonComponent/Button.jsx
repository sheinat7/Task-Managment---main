import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.module.css';

const Button = ({ type = 'button', onClick, submitForm, cancelAction, redirectTo, children }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (submitForm) {
      event.preventDefault();
      submitForm();
    }
    if (cancelAction) {
      cancelAction();
    }
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <button type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
