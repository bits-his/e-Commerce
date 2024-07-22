import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DropdownBtn from "../components/DropdownBtn"
import "./sidenav.css";

const Sidebar = () => {

  return (
    <div className="side-nav bg-dark">
      <Nav className="d-flex flex-column h-full w-100 px-3">
        <div className="d-flex flex-column nav-container">
          <div className="d-flex justify-content-center">
            <div className="brand-logo"></div>
          </div>
          
          <DropdownBtn
            title="Dashboard"
            items={["Overview", "Sales Analytics", "Recent Orders", "Revenue Reports", "Traffic Insights"]}
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

          {/* Link to sellers route */}

          <DropdownBtn
            title="Store Management"
            items={["Store profile", "Payment method"]}
          />

          <DropdownBtn
            title="Product Management"
            items={["Product", "Payment method"]}
          />

        </div>
      </Nav>
      <div className="logout-main">
        <div className="logout-container">
          <NavLink className="logout">
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
