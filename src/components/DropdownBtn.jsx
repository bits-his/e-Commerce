import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const DropdownMenu = ({ title, items, isActive, onToggle, links, open }) => {
  return (
    <>
      <NavLink
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary mt-2
          ${open ? "bg-muted/90 text-primary" : "text-dark-foreground bg-white"}
        `}
        onClick={onToggle}
      >
        {title}
        <ChevronRight className={`icon h-5 w-5 ml-auto ${isActive ? "rotated" : ""}`} /> 
      </NavLink>

      {isActive && (
        <div className="ps-3">
          {items.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center gap-3 rounded-lg bg-muted/90 px-3 py-2 text-primary transition-all hover:text-primary mt-2`
                  : `flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-dark-foreground transition-all hover:text-primary mt-2`
              }
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
