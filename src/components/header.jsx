import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa'; // Importing icons from react-icons
import "../Styles/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
       
      </div>
      <div className="header-icons d-flex bg-dark">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button"><FaSearch /></button>
        </div>
        <button className="notification-button">
          <FaBell />
          <span className="notification-badge"></span>
        </button>
      </div>
    </div>
  );
}

export default Header;
