import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import DropdownBtn from "../components/DropdownBtn";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Menu,
  ShoppingCart,
  Users,
  UserPlus2,
  Store,
  CircleUser,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "../Styles/Header.css";
import toast from "react-hot-toast";
import { globalColor } from "@/utils/Helper";
import { Spinner } from "reactstrap";

function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const handleToggle = (dropdownName) => {
    setActiveDropdown((prevActive) =>
      prevActive === dropdownName ? null : dropdownName
    );
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.clear("@@token");
    navigate("/");
    toast("Goodbye!", {
      icon: "👏",
    });
    setLoading(false);
  };

  return (
    <header
      className="sticky top-0 z-50 flex h-14 items-center gap-4 border-0 px-4 lg:h-[60px] lg:px-6"
      style={{ backgroundColor: "#542b2b" }}
    >
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden border-0"
            style={{ backgroundColor: "#a52a2a", color: "#f2eadb" }}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col"
          style={{ backgroundColor: "#542b2b" }}
        >
          <nav className="grid gap-2 text-lg font-medium mt-4">
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
              onClick={closeSheet}
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
                  closeSheet={closeSheet}
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
                  ]}
                  onToggle={() => handleToggle("vendor Management")}
                  isActive={activeDropdown === "vendor Management"}
                  open={pathname.includes("/vendor-mgmt")}
                  baseLink="/vendor-mgmt"
                  closeSheet={closeSheet}
                />
                <NavLink
                  className={`flex items-center gap-3 text-base rounded-lg px-3 py-2 transition-all mt-2 ${
                    pathname === "/admin-dashboard/orders"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/admin-dashboard/orders"}
                  onClick={closeSheet}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </NavLink>
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
                  closeSheet={closeSheet}
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
                  closeSheet={closeSheet}
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
                  closeSheet={closeSheet}
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
                  closeSheet={closeSheet}
                />
                {/* adding subcategory */}

                <NavLink
                  className={`flex items-center gap-3 rounded-lg text-base px-3 py-2 transition-all mt-2 ${
                    pathname === "/seller-dashboard/category"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/seller-dashboard/category"}
                  onClick={closeSheet}
                >
                  <NotebookPen className="h-4 w-4" />
                  Category
                </NavLink>

                {/* categories adding button */}
                <NavLink
                  className={`flex items-center gap-3 rounded-lg text-base px-3 py-2 transition-all mt-2 ${
                    pathname === "/seller-dashboard/orders/total"
                      ? "navlink-items-2 text-dark"
                      : "navlink-items"
                  }`}
                  to={"/seller-dashboard/orders/total"}
                  onClick={closeSheet}
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
                  closeSheet={closeSheet}
                  // open={pathname.includes("/product-mgmt")}
                />
              </>
            )}
          </nav>
          <div className="mt-auto">
            <Button
              size="sm"
              className="w-full bg-destructive hover:bg-destructive/50 text-base"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? <Spinner className="w-4 h-4" /> : <>Logout</>}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background ps-4 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div> */}
        </form>
      </div>
      <div className="space-x-2">
        <button
          size="icon"
          className="rounded-full p-1"
          style={{
            backgroundColor: globalColor.grpcolor1,
            color: globalColor.grpcolor3,
          }}
        >
          <Bell className="h-4 w-4" />
        </button>

        <DropdownMenu className="ml-auto">
          <DropdownMenuTrigger asChild>
            <button
              className="rounded-full p-2"
              style={{
                backgroundColor: globalColor.grpcolor1,
                color: globalColor.grpcolor3,
              }}
            >
              <CircleUser className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
