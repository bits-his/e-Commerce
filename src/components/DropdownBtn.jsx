import { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from "react-icons/io";

const DropdownMenu = ({ title, items, isActive, onToggle, links, baseLink }) => {
  const location = useLocation();
  const isDropdownActive = location.pathname.startsWith(baseLink);

  return (
    <>
      <NavLink
        className={({ isDropdownActive }) => (isActive ? "active-btn" : "norm-btn")}
        onClick={onToggle}
        to={baseLink}
      >
        {title}
        <IoIosArrowDroprightCircle className={`icon ${isActive ? 'rotated' : ''}`} />
      </NavLink>
      {isActive && (
        <div className="ps-3">
          {items.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => (isActive ? `active-btn mt-2` : `norm-btn mt-2`)}
              to={links[index]}
            >
              {item}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
