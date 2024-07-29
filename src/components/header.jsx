import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa'; // Importing icons from react-icons
import "../Styles/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-icons d-flex bg-dark">
        <button className="notification-button">
          <FaBell />
          <span className="notification-badge"></span>
        </button>
      </div>
    </div>
  );
}

export default Header;
