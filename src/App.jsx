import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NoLayout from './components/NoLayout'
import Login from './pages/Login'
import Dashboard from './pages/admin_dashboard/AdminDashboard'
import UserDashboard from './pages/user_Dashboard/user_Dashboard'
import Orders from './components/orders/orders'
import Profile from './components/profile/profile'



const App = ()=>{

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<NoLayout />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/admin-dashboard" element={<Dashboard />} /> 
            <Route path="/user-dashboard" element={<UserDashboard />} /> 
            <Route path="/orders" element={<Orders/>} /> 
            <Route path="/profile" element={<Profile/>} /> 


            
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;