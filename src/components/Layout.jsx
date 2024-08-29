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
      <div className="hidden border-r bg-muted/40 md:block">
        <div
          className="flex h-full max-h-screen flex-col gap-2"
          style={{ overflowY: "auto" }}
        >
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Kasua</span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8 rounded-full"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive ? "<b>text-primary bg-muted" : "text-muted-foreground"
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
                        <Users className="h-4 w-4" /> Customer Management
                      </>
                    }
                    items={["All Customers", "Customer Reviews"]}
                    links={[
                      "/admin-dashboard/customer-mgmt/customers",
                      "/admin-dashboard/customer-mgmt/customer-reviews",
                    ]}
                    onToggle={() => handleToggle("Customer Mgmt")}
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
                        <UserPlus2 className="h-4 w-4" /> User Management
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

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Products{" "}
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button size="sm" className="w-full bg-destructive">
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
