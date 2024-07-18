import React from "react";
import Footer from "../components/Footer";
import AppNavigation from "./AppNavigation";
import Navbar from "../components/Navbar";


export default function AppIndex() {
  return (
    <div>
      <Navbar />
      <AppNavigation />
      <Footer />
    </div>
  );
}
