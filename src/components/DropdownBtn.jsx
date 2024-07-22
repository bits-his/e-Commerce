import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from "react-icons/io";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? "active-btn" : "norm-btn")}
        onClick={handleDropdownClick}
      >
        {title}
        <IoIosArrowDroprightCircle className={`icon ${isOpen ? 'rotated' : ''}`} />
      </NavLink>
      {isOpen && (
        <div className="ps-3">
          {items.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => (isActive ? `active-btn mt-3` : `norm-btn mt-3`)}
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
