import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.module.css';

const Header = () => {
  const navList = [
    { name: 'Home', path: '/' },
    { name: 'New task', path: '/nt' },
  ];
  return (
    <header>
      <nav>
        <ul>
          {navList.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
