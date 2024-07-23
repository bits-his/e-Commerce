import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from "react-icons/io";

const DropdownMenu = ({ title, items, isActive, onToggle }) => {

  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? "active-btn" : "norm-btn")}
        onClick={onToggle}
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
