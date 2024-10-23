import React from 'react';
import Button from '../buttonComponent/Button';
import { useNavigate } from 'react-router-dom';
import './aboutUs.module.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const toNavigate = () => {
    navigate('/register');
  };

  return (
    <>
      <h1>About Us</h1>
      <p>
        Our calendar list is your ultimate tool for staying organized and on top of your schedule.
        Whether you're a busy professional, a student, or simply someone who wants to make the most
        of your time, our list offers a range of features to help you streamline your tasks and
        achieve your goals.
      </p>
      <Button onClick={toNavigate}>Sign Up</Button>
    </>
  );
};

export default AboutUs;
