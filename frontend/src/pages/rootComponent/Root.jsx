import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/headerComponent/Header';
import Footer from '../../components/footerComponent/Footer';
import classes from './root.module.css';

const root = () => {
  return (
    <>
      <Header />
      <main className={classes.content}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default root;
