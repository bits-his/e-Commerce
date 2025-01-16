import { useState } from "react";
import DropdownBtn from "../components/DropdownBtn";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  UserPlus2,
  Store,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "./sidenav.css";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/action/authAction";
import kasuwalogo from '../assets/KASUWAMALL cut.png'

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = (dropdownName) => {
    setActiveDropdown((prevActive) =>
      prevActive === dropdownName ? null : dropdownName
    );
  };

  const handleLogout = () => {
    setLoading(true);
    dispatch(logout());
    navigate("/");
    toast("Goodbye!", {
      icon: "👏",
    });
    setLoading(false);
  };

  return (
    <div className="sidenav-container hidden border-r md:block" style={{backgroundColor: ""}}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-15 items-center px-4 lg:h-[70px] lg:px-6">
          <Link
            className="d-flex justify-content-center align-items-center text-white pt-2 px-5 font-semibold" 
            to={
              pathname.startsWith("/admin-dashboard")
                ? "/admin-dashboard"
                : "/seller-dashboard"
            }
            style={{width: '100%', height:"70px"}}
          >
            {/* <Package2 className="h-8 w-8" /> */}
            <img src={kasuwalogo} alt="Kasuwa logo" style={{
              height: "100%",
              width: "100%",
              // borderRadius: "50%",
              // objectFit: "cover"
            }}/>
            {/* <span style={{fontWeight: "800"}} className="text-lg">KASUWA MALL</span> */}
          </Link>
        </div>
        <hr />

        <div className="flex-1 mt-3">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all ${
                pathname === "/admin-dashboard" ||
                pathname === "/seller-dashboard"
                  ? " navlink-items-2 text-dark"
                  : "navlink-items"
              }`}
              to={
                pathname.startsWith("/admin-dashboard")
                  ? "/admin-dashboard"
                  : "/seller-dashboard"
              }
            >
              <Home className="h-4 w-4" />
              Dashboard
            </NavLink>

            {pathname.startsWith("/admin-dashboard") && (
              <>
                <DropdownBtn
                  title={
                    <>
                      <Users className="h-4 w-4" /> Customers
                    </>
                  }
                  items={["All Customers", "Customer Reviews"]}
                  links={[
                    "/admin-dashboard/customer-mgmt/customers",
                    "/admin-dashboard/customer-mgmt/customer-reviews",
                  ]}
                  onToggle={() => handleToggle("Customer Management")}
                  isActive={activeDropdown === "Customer Management"}
                  open={pathname.includes("/customer-mgmt")}
                  baseLink="/customer-mgmt"
                />
                <DropdownBtn
                  title={
                    <>
                      <Users className="h-4 w-4" /> Vendors
                    </>
                  }
                  items={["All Vendors", "Pending Vendors"]}
                  links={[
                    "/admin-dashboard/vendor-mgmt/vendor",
                    "/admin-dashboard/vendor-mgmt/pending-vendor",
                    "/admin-dashboard/vendor-mgmt/vendor-view",
                  ]}
                  onToggle={() => handleToggle("vendor Management")}
                  isActive={activeDropdown === "vendor Management"}
                  open={pathname.includes("/vendor-mgmt")}
                  baseLink="/vendor-mgmt"
                />
                <NavLink
                  className={`flex items-center gap-3 text-base rounded-lg px-3 py-2 transition-all mt-2 ${
                    pathname === "/admin-dashboard/orders"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/admin-dashboard/orders"}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </NavLink>
                {/* adding subcategory */}

                <NavLink
                  className={`flex items-center gap-3 rounded-lg text-base px-3 py-2 transition-all mt-2 ${
                    pathname === "/admin-dashboard/category"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/admin-dashboard/category"}
                >
                  <NotebookPen className="h-4 w-4" />
                  Category
                </NavLink>

                <NavLink 
                  className={`flex items-center gap-3 rounded-lg text-base px-3 py-2 transition-all mt-2 ${
                    pathname === "/admin-dashboard/delivery-management"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/admin-dashboard/delivery-management"}
                >
                  <Store className="h-4 w-4" />
                  Delivery Management
                </NavLink>

                <DropdownBtn
                  title={
                    <>
                      <LineChart className="h-4 w-4" /> Reports
                    </>
                  }
                  items={[
                    "Reports",
                    "Sales",
                    "Inventory",
                    "Traffic & Conversion",
                  ]}
                  links={[
                    "/admin-dashboard/reports/sales",
                    "/admin-dashboard/reports/product-performance",
                    "/admin-dashboard/reports/inventory",
                    "/admin-dashboard/reports/trafficHome",
                  ]}
                  onToggle={() => handleToggle("Reports")}
                  isActive={activeDropdown === "Reports"}
                  open={pathname.includes("/reports")}
                  baseLink="/reports"
                />
                <DropdownBtn
                  title={
                    <>
                      <UserPlus2 className="h-4 w-4" /> Users
                    </>
                  }
                  items={["All", "profile", "Activity Logs"]}
                  links={[
                    "/admin-dashboard/user-mgmt/all",
                    "/admin-dashboard/user-mgmt/profile",
                    "/admin-dashboard/user-mgmt/logs",
                  ]}
                  onToggle={() => handleToggle("User Management")}
                  isActive={activeDropdown === "User Management"}
                  open={pathname.includes("/user-mgmt")}
                  baseLink="/user-mgmt"
                />
              </>
            )}

            {pathname.startsWith("/seller-dashboard") && (
              <>
                <NavLink
                  className={`flex items-center gap-3 text-base rounded-lg px-3 py-2 transition-all mt-2 ${
                    pathname === "/seller-dashboard/storeprofile"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/seller-dashboard/storeprofile"}
                >
                  <Store className="h-4 w-4" />
                  Store
                </NavLink>

                <DropdownBtn
                  title={
                    <>
                      <Package className="h-4 w-4" /> Products
                    </>
                  }
                  items={["Product"]}
                  links={["/seller-dashboard/product-mgmt/product", ""]}
                  onToggle={() => handleToggle("Product Management")}
                  isActive={activeDropdown === "Product Management"}
                  open={pathname.includes("/product-mgmt")}
                />
                

                {/* categories adding button */}
                <NavLink
                  className={`flex items-center gap-3 rounded-lg text-base px-3 py-2 transition-all mt-2 ${
                    pathname === "/seller-dashboard/orders/total"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/seller-dashboard/orders/total"}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </NavLink>

                {/* <DropdownBtn
                  title={
                    <>
                      <ShoppingCart className="h-4 w-4" /> Orders
                    </>
                  }
                  items={["Total order", "Aproved order", "Pending order"]}
                  links={[
                    "/seller-dashboard/orders/total",
                    "/seller-dashboard/orders/approved",
                    "/seller-dashboard/orders/pending",
                  ]}
                  onToggle={() => handleToggle("Order management")}
                  isActive={activeDropdown === "Order management"}
                  open={pathname.includes("/orders")}
                /> */}
                {/* <DropdownBtn
                  title={
                    <>
                      <Bell className="h-4 w-4" /> Notifications
                    </>
                  }
                  items={["order notifiction", "app notification"]}
                  links={[
                    "/seller-dashboard/product-mgmt/order-notifiction",
                    "",
                  ]}
                  onToggle={() => handleToggle("Order notifiction")}
                  isActive={activeDropdown === "Order notifiction"}
                  // open={pathname.includes("/product-mgmt")}
                /> */}
              </>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            size="sm"
            className="w-full bg-destructive hover:bg-destructive/50 text-base"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? <Spinner className="w-4 h-4" /> : <>Logout</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
