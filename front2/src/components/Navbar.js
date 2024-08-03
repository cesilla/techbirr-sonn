import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li className="kible">
            <Link to="/kibla"></Link>
          </li>
          <li>
            <Link to="/quran" className="quran"></Link>
          </li>
          <li className="center">
            <Link to="/dhikr" className="center-icon"></Link>
          </li>
          <li>
            <Link to="/names-of-allah" className="allah"></Link>
          </li>
          <li>
            <Link to="/calendar" className="calendar"></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
