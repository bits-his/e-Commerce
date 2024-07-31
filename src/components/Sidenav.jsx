import { useState } from "react";
import { Nav } from "react-bootstrap";
import DropdownBtn from "../components/DropdownBtn";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faChartLine, faCogs, faSignOutAlt,faStore } from '@fortawesome/free-solid-svg-icons';

import "./sidenav.css";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { pathname } = location;

  const handleToggle = (dropdownName) => {
    setActiveDropdown((prevActive) =>
      prevActive === dropdownName ? null : dropdownName
    );
  };

  const getClassName = () => {
    return (pathname === "/admin-dashboard" || pathname === "/seller-dashboard") ? "active-btn" : "norm-btn";
  };

  const handleLogout = () => {
    toast.success('User logged out successfully');
  }

  return (
    <div className="navs">
      <div className="side-nav bg-dark">
        <Nav className="d-flex position-relative flex-column h-full w-100 px-3">
          <div className="d-flex flex-column nav-container">
            <div className="d-flex justify-content-center">
              <div className="brand-logo">
                {/* Logo here */}
              </div>
            </div>

            <div className="nav-list">
              <NavLink
                className={getClassName}
                to={
                  pathname.startsWith("/admin-dashboard") ? "/admin-dashboard" : "/seller-dashboard"
                }
              >
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-2" style={{}} /> 
                  <b>Dashboard</b>
                </div>
              </NavLink>

              {pathname.startsWith("/admin-dashboard") && (
                <>
                  <DropdownBtn
                    title={<><FontAwesomeIcon icon={faUser} className="me-2"/> Customer Management</>}
                    items={["All Customers", "Customer Reviews"]}
                    links={[
                      "/admin-dashboard/customer-mgmt/customers",
                      "/admin-dashboard/customer-mgmt/customer-reviews",
                    ]}
                    onToggle={() => handleToggle("Customer Management")}
                    isActive={activeDropdown === "Customer Management"}
                    baseLink="/customer-mgmt"
                  />
                  <DropdownBtn
                    title={<><FontAwesomeIcon icon={faChartLine} className="me-2" /> Reports</>}
                    items={[
                      "Sales",
                      "Product Performance",
                      "Inventory",
                      "Traffic & Conversion",
                    ]}
                    links={[
                      "/admin-dashboard/reports/sales",
                      "/admin-dashboard/reports/product-performance",
                      "/admin-dashboard/reports/inventory",
                      "/admin-dashboard/reports/traffic",
                    ]}
                    onToggle={() => handleToggle("Reports")}
                    isActive={activeDropdown === "Reports"}
                    baseLink="/reports"
                  />
                  <DropdownBtn
                    title={<><FontAwesomeIcon icon={faCogs} className="me-2" /> User Management</>}
                    items={["All", "profile", "Activity Logs"]}
                    links={[
                      "/admin-dashboard/user-mgmt/all",
                      "/admin-dashboard/user-mgmt/profile",
                    "/admin-dashboard/user-mgmt/logs",
                   
                  ]}
                  onToggle={() => handleToggle("User Management")}
                  isActive={activeDropdown === "User Management"}
                  baseLink="/user-mgmt"
                />
              </>
            )}

            {/* Link to sellers route */}

              {pathname.startsWith("/seller-dashboard") && (
                <>
                  <DropdownBtn
                    title={<><FontAwesomeIcon icon={faStore} className="me-2" /> Store Management</>}
                    items={["Store profile", "Payment method","Order management"]}
                    links={["/seller-dashboard/storemangement/storeprofile", "/seller-dashboard/storemangement/storepayment","/seller-dashboard/storemangement/ordermanagement"]}
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
          <NavLink className="logout" to="/" onClick={handleLogout}>Logout</NavLink>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
