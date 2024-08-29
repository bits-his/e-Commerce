import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { ChevronRight } from "lucide-react";

const DropdownMenu = ({ title, items, isActive, onToggle, links }) => {

  return (
    <>
      <NavLink
        className={({ isActive }) => (isActive ? "active-btn" : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary")}
        onClick={onToggle}
      >
        {title}
        <ChevronRight className={`icon h-4 w-4 ${isActive ? 'rotated' : ''}`} />
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
