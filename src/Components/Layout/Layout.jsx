import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-20 text-center min-h-96 mb-7">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
