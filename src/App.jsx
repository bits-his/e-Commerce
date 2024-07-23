import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NoLayout from './components/NoLayout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Product from './pages/seller_Dashboard/Product'
import Registration from './pages/Registration';
import Orders from './components/orders/orders'
import NotFound from './components/NotFound'



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
            </Route> 
            <Route path="/seller-dashboard" >
              <Route index element={<Profile />}/>
              <Route path='product-mgmt' >
                <Route path='product' element={<Product />}/>
              </Route>
            </Route> 
            <Route path="/orders" element={<Orders />} /> 
            <Route path='*' element={<NotFound />}/>
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;