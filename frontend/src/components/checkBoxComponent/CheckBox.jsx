import React from 'react';
import classes from './Checkbox.module.css';

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <label className={classes.label}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
