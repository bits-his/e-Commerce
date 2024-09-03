import { useState } from "react";
import DropdownBtn from "../components/DropdownBtn";
import { Link, NavLink, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleLogout = () => {
    toast.error("Working on logout");
  };

  return (
    <div className="sidenav-container hidden border-r bg-dark md:block">
      <div
        className="flex h-full max-h-screen flex-col gap-2"
      >
        <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
          <Link
            className="flex items-center gap-2 text-white justify-center font-semibold"
            to={
              pathname.startsWith("/admin-dashboard")
                ? "/admin-dashboard"
                : "/seller-dashboard"
            }
          >
            <Package2 className="h-8 w-8" />
            <span className="">Kasua</span>
          </Link>
        </div>

        <div className="flex-1 mt-3">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin-dashboard" ||
                pathname === "/seller-dashboard"
                  ? "text-primary bg-muted/90"
                  : "bg-white text-dark"
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
                      <LineChart className="h-4 w-4" /> Reports
                    </>
                  }
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
                <DropdownBtn
                  title={
                    <>
                      <Store className="h-4 w-4" /> Store
                    </>
                  }
                  items={["Store profile"]}
                  links={[
                    "/seller-dashboard/storemangement/storeprofile",
                    "/seller-dashboard/storemangement/storepayment",
                    "/seller-dashboard/storemangement/ordermanagement",
                  ]}
                  onToggle={() => handleToggle("Store Management")}
                  isActive={activeDropdown === "Store Management"}
                  open={pathname.includes("/storemangement")}
                />

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
                <DropdownBtn
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
                />
                <DropdownBtn
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
                />
              </>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            size="sm"
            className="w-full bg-destructive hover:bg-destructive/50"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
