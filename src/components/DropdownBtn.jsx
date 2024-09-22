import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const DropdownMenu = ({ title, items, isActive, onToggle, links, open, closeSheet }) => {
  return (
    <>
      <NavLink
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-base mt-2 
          ${open ? "navlink-items-2 text-dark" : "navlink-items"}
        `}
        onClick={onToggle}
      >
        {title}
        <ChevronRight className={`icon h-5 w-5 ml-auto ${isActive ? "rotated" : ""}`} /> 
      </NavLink>

      {isActive && (
        <div className="ps-3 text-base">
          {items.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center gap-3 rounded-lg navlink-items-2 px-3 py-2 transition-all text-dark mt-2`
                  : `flex items-center gap-3 rounded-lg navlink-items px-3 py-2 transition-all mt-2`
              }
              to={links[index]}
              onClick={closeSheet}
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
