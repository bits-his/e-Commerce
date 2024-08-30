import { useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import DropdownBtn from "../components/DropdownBtn";
import SideNav from "./Sidenav";
import Header from "./header";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Layout() {
  const location = useLocation();
  const { pathname } = location;
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggle = (dropdownName) => {
    setActiveDropdown((prevActive) =>
      prevActive === dropdownName ? null : dropdownName
    );
  };

  const handleLogout = () => {
    toast.success("User logged out successfully");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-dark md:block">
        <div
          className="flex h-full max-h-screen flex-col gap-2"
          style={{ overflowY: "auto" }}
        >
          <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 text-white font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Kasua</span>
            </Link>
          </div>

          <div className="flex-1 mt-3">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive
                      ? "<b>text-primary bg-muted/90"
                      : "bg-white text-muted-foreground"
                  }`
                }
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
                    open={pathname.includes("/storemangement") ? "open" : "closed"}
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
                  />
                </>
              )}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button size="sm" className="w-full bg-destructive hover:bg-destructive/50">
              Logout
            </Button>
          </div>
        </div>
      </div>
      {/* <SideNav /> */}
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
