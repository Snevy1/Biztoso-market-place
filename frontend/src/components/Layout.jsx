// src/components/Layout.jsx
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Content from "./common/Content";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout() {
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col w-full">
      {/* Header/Navbar */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow text-gray-800 dark:text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}