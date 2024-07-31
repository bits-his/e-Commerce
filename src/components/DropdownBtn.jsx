import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from "react-icons/io";

const DropdownMenu = ({ title, items, isActive, onToggle, links }) => {

  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? "active-btn" : "norm-btn")}
        onClick={onToggle}
      >
        <div className="d-flex align-items-center justify-content-between">
          {title}
          <IoIosArrowDroprightCircle className={`icon ${isActive ? 'rotated' : ''}`} />
        </div>
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
