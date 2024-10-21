import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function NavLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BottomNavigation />
    </>
  );
}
