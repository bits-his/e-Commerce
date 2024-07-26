import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import DropdownBtn from "../components/DropdownBtn";
import "./sidenav.css";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { pathname } = location;

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
          
          <NavLink
            className={({ isActive }) => (isActive ? "active-btn" : "norm-btn")}
            to={pathname === '/admin-dashboard' ? '/admin-dashboard' : '/seller-dashboard'}
          >
            Dashboard
          </NavLink>
          {(pathname.startsWith('/admin-dashboard')) && (
            <>
              <DropdownBtn
                title="Customer Management"
                items={[
                  "All Customers",
                  "Customer Reviews",
                ]}
                links={["/admin-dashboard/customer-mgmt/customers", "/admin-dashboard/customer-mgmt/customer-reviews"]}
                onToggle={() => handleToggle("Customer Management")}
                isActive={activeDropdown === "Customer Management"}
              />
              <DropdownBtn
                title="Reports"
                items={[
                  "Sales Reports",
                  "Product Performance",
                  "Inventory Reports",
                  "Traffic & Conversion",
                ]}
                links={["/admin-dashboard/reports/sales", "/admin-dashboard/reports/product-performance", "/admin-dashboard/reports/inventory", "/admin-dashboard/reports/traffic"]}
                onToggle={() => handleToggle("Reports")}
                isActive={activeDropdown === "Reports"}
              />
              <DropdownBtn
                title="User Management"
                items={["Admin Users", "Activity Logs"]}
                links={["/admin-dashboard/user-mgmt/admin", "/admin-dashboard/user-mgmt/logs"]}
                onToggle={() => handleToggle("User Management")}
                isActive={activeDropdown === "User Management"}
              />
            </>
          )}

            {/* Link to sellers route */}

            {(pathname.startsWith('/seller-dashboard')) && (
            <>
              <DropdownBtn
                title="Store Management"
                items={["Store profile", "Payment method"]}
                links={[""]}
                onToggle={() => handleToggle("Store Management")}
                isActive={activeDropdown === "Store Management"}
              />

              <DropdownBtn
                title="Product Management"
                items={["Product", "Payment method"]}
                links={["/seller-dashboard/product-mgmt/product", ""]}
                onToggle={() => handleToggle("Product Management")}
                isActive={activeDropdown === "Product Management"}
              />
            </>
            )}
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
