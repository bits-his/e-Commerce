import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DropdownBtn from "../components/DropdownBtn"
import "./sidenav.css";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggle = (dropdownName) => {
    setActiveDropdown((prevActive) => (prevActive === dropdownName ? null : dropdownName));
  };

  return (
    <div className="side-nav bg-dark">
      <Nav className="d-flex flex-column h-full w-100 px-3">
        <div className="d-flex justify-content-between align-items-center">
          <span></span>
          <span></span>
        </div>
        <div className="d-flex flex-column nav-container">
          <DropdownBtn
            title="Dashboard"
            items={["Overview", "Sales Analytics", "Recent Orders", "Revenue Reports", "Traffic Insights"]}
            onToggle={() => handleToggle("Dashboard")}
            isActive={activeDropdown === "Dashboard"}
          />
          <DropdownBtn
            title="Product Management"
            items={["All Customers", "Customer Details", "Customer Groups", "Customer Reviews"]}
            
          />
          <DropdownBtn
            title="Reports"
            items={["Sales Reports", "Product Performance", "Customer Insights", "Inventory Reports", "Traffic & Conversion"]}
          />
          <DropdownBtn
            title="User Management"
            items={["Admin Users", "Roles & Permissions", "Activity Logs"]}
          />

          <DropdownBtn  
            title="User Management"
            items={["Admin Users", "Roles & Permissions", "Activity Logs"]}
          />
        </div>
      </Nav>
      <div className="logout">
        <NavLink>
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
