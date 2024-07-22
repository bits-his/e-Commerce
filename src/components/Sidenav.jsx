import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DropdownBtn from "../components/DropdownBtn";
import "./sidenav.css";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggle = (dropdownName) => {
    setActiveDropdown((prevActive) =>
      prevActive === dropdownName ? null : dropdownName
    );
  };

  return (
    <div className="side-nav bg-dark">
      <Nav className="d-flex flex-column h-full w-100 px-3">
        <div className="d-flex flex-column nav-container">
          <div className="d-flex justify-content-center">
            <div className="brand-logo"></div>
          </div>

          <div className="nav-list">
            <DropdownBtn
              title="Dashboard"
              items={[
                "Overview",
                "Sales Analytics",
                "Recent Orders",
                "Revenue Reports",
                "Traffic Insights",
              ]}
              onToggle={() => handleToggle("Dashboard")}
              isActive={activeDropdown === "Dashboard"}
            />
            <DropdownBtn
              title="Customer Management"
              items={[
                "All Customers",
                "Customer Details",
                "Customer Groups",
                "Customer Reviews",
              ]}
              onToggle={() => handleToggle("Customer Management")}
              isActive={activeDropdown === "Customer Management"}
            />
            <DropdownBtn
              title="Reports"
              items={[
                "Sales Reports",
                "Product Performance",
                "Customer Insights",
                "Inventory Reports",
                "Traffic & Conversion",
              ]}
              onToggle={() => handleToggle("Reports")}
              isActive={activeDropdown === "Reports"}
            />
            <DropdownBtn
              title="User Management"
              items={["Admin Users", "Roles & Permissions", "Activity Logs"]}
              onToggle={() => handleToggle("User Management")}
              isActive={activeDropdown === "User Management"}
            />

            {/* Link to sellers route */}

            <DropdownBtn
              title="Store Management"
              items={["Store profile", "Payment method"]}
              onToggle={() => handleToggle("Store Management")}
              isActive={activeDropdown === "Store Management"}
            />

            <DropdownBtn
              title="Product Management"
              items={["Product", "Payment method"]}
              onToggle={() => handleToggle("Product Management")}
              isActive={activeDropdown === "Product Management"}
            />
          </div>
        </div>
      </Nav>
      <div className="logout-main bg-dark">
        <div className="logout-container">
          <NavLink className="logout">Logout</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
