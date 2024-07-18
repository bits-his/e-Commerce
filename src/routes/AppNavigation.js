import React from "react";
import { useRoutes } from "react-router-dom";
import  Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
export default function AppNavigation() {
  let pages = useRoutes([
    { path: "/", element: <Navbar/> },
    { path: "/layout", element: <Layout/> },
    {path: "/footer", element: <Footer/> },
  
  ]);

  return pages;
}
