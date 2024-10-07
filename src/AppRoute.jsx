import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NoLayout from "./components/NoLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/seller_Dashboard/Product";
import Registration from "./pages/Registration";
import NotFound from "./components/NotFound";
import Productmgnt from "./pages/seller_Dashboard/product-mgnt/product";
import AddProductPage from "./pages/seller_Dashboard/product-mgnt/addproduct";
import Customers from "./pages/admin_dashboard/Customers/Customers";
import Storeprofile from "./pages/seller_Dashboard/storemanagement/StoreProfile";
import Sellerdashboard from "./pages/seller_Dashboard/seller-dashboard/sellerdashboard";
import AdminDashboard from "./pages/admin_dashboard/AdminDashboard";
import Inventory from "./pages/admin_dashboard/Inventory";
import TotalOrders from "./pages/seller_Dashboard/orders/TotalOrders";
import Pending_vendor from "./pages/admin_dashboard/vendors/Pending_vendors";
import Vendors from "./pages/admin_dashboard/vendors/Vendors";
import Category from "./pages/seller_Dashboard/product-mgnt/Category";
import AllOrders from "./pages/admin_dashboard/AllOrders";
import VendorView from "./pages/admin_dashboard/vendors/VendorView";
import OrderView from "./pages/OrderView";
import VendorOrderView from "./pages/seller_Dashboard/orders/VendorOrderView";
import Protect from "./Protect";

export default function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NoLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>

          <Route element={<Protect element={Layout} />}>
            <Route path="/admin-dashboard">
              <Route index element={<AdminDashboard />} />
              <Route path="customer-mgmt">
                <Route path="customers" element={<Customers />} />
                <Route path="customer-reviews" element={<Product />} />
              </Route>
              <Route path="vendor-mgmt">
                <Route path="vendor">
                  <Route index element={<Vendors />} />
                  <Route path="vendor-view" element={<VendorView />} />
                </Route>
                <Route path="pending-vendor" element={<Pending_vendor />} />
              </Route>
              <Route path="orders">
                <Route index element={<AllOrders />} />
                <Route path="orders-view" element={<OrderView />} />
              </Route>
              <Route path="reports">
                <Route path="sales" element={<Product />} />
                <Route path="product-performance" element={<Product />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="traffic" element={<Product />} />
              </Route>
              <Route path="user-mgmt">
                <Route path="all" element={<Product />} />
                <Route path="admin" element={<Product />} />
                <Route path="logs" element={<Product />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="/seller-dashboard">
              <Route index element={<Sellerdashboard />} />
              {/* <Route path="orders/pending" element={<PendingOrders />} />
          <Route path="orders/approved" element={<ApprovedOrders />} /> */}
              {/* <Route path="orders/total" element={<TotalOrders />} /> */}
              <Route path="orders/total">
                <Route index element={<TotalOrders />} />
                <Route path="orders-view" element={<VendorOrderView />} />
              </Route>

              <Route path="product-mgmt">
                <Route path="product">
                  <Route index element={<Productmgnt />} />
                  <Route path="addproduct" element={<AddProductPage />} />
                </Route>
              </Route>

              <Route path="category">
                <Route index element={<Category />} />
                <Route path="sub-category" element={<AddProductPage />} />
              </Route>

              <Route path="storeprofile" element={<Storeprofile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
