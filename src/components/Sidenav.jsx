import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Container,
} from 'reactstrap';
import { FaHome, FaTachometerAlt, FaTable, FaBox, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import './sidenav.css'; // Assuming you create a CSS file named Sidebar.css for styling

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <Container className="sidebar-content">
        <Navbar color="" dark expand="md" className="sidebar-navbar">
          <NavbarBrand href="/" className="sidebar-brand">
            <span className="sidebar-brand-text">Sidebar</span>
          </NavbarBrand>
        </Navbar>
        <hr className="sidebar-divider" />
        <Nav vertical pills className="flex-column sidebar-nav">
          <NavItem>
            <NavLink tag={Link} to="/" activeClassName="active" className="sidebar-link">
              <FaHome className="sidebar-icon" />
              <span className="sidebar-text">Home</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/dashboard" activeClassName="active" className="sidebar-link">
              <FaTachometerAlt className="sidebar-icon" />
              <span className="sidebar-text">Dashboard</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/orders" activeClassName="active" className="sidebar-link">
              <FaTable className="sidebar-icon" />
              <span className="sidebar-text">Orders</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/products" activeClassName="active" className="sidebar-link">
              <FaBox className="sidebar-icon" />
              <span className="sidebar-text">Products</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/customers" activeClassName="active" className="sidebar-link">
              <FaUsers className="sidebar-icon" />
              <span className="sidebar-text">Customers</span>
            </NavLink>
          </NavItem>
        </Nav>
        <hr className="sidebar-divider" />
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="sidebar-dropdown-toggle">
            <img src="https://github.com/mdo.png" alt="" className="sidebar-avatar" />
            <strong className="sidebar-username">mdo</strong>
          </DropdownToggle>
          <DropdownMenu dark className="sidebar-dropdown-menu">
            <DropdownItem href="#" className="sidebar-dropdown-item">New project...</DropdownItem>
            <DropdownItem href="#" className="sidebar-dropdown-item">Settings</DropdownItem>
            <DropdownItem href="#" className="sidebar-dropdown-item">Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#" className="sidebar-dropdown-item">Sign out</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Container>
    </div>
  );
};

export default Sidebar;
