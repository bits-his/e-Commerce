import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NoLayout from './components/NoLayout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Product from './pages/seller_Dashboard/Product'
import Registration from './pages/Registration';
import NotFound from './components/NotFound'
import Productmgnt from './pages/prodoct-mgnt/product'
import AddProductPage from './pages/prodoct-mgnt/addproduct'
import Customers from './pages/admin_dashboard/Customers'
import Storemanagement from './pages/seller_Dashboard/storemanagement/storemgrt'

const App = ()=>{

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NoLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/admin-dashboard" >
              <Route index element={<Profile />}/>
              <Route path='customer-mgmt' >
                <Route path='customers' element={<Customers />}/>
                <Route path='customer-reviews' element={<Product />}/>
              </Route>
              <Route path='reports' >
                <Route path='sales' element={<Product />}/>
                <Route path='product-performance' element={<Product />}/>
                <Route path='inventory' element={<Product />}/>
                <Route path='traffic' element={<Product />}/>
              </Route>
              <Route path='user-mgmt' >
                <Route path='admin' element={<Product />}/>
                <Route path='logs' element={<Product />}/>
              </Route>
            </Route> 
            <Route path="/seller-dashboard" >
              <Route index element={<Profile />}/>
              
              <Route path='product-mgmt' >
                <Route path='product'>
                  <Route index element={<Productmgnt />}/>
                  <Route path="addproduct" element={<AddProductPage />} />
                </Route>  
              </Route>
              <Route path='storemangement'>
                <Route index element={<Storemanagement />}/>
              </Route>
            </Route> 
            <Route path='*' element={<NotFound />}/>
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;