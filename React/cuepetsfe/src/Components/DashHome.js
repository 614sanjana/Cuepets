import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Record from "./Records";
import BlogManage from "./BlogManage";
import AppointmentScheduler from "./AppointmentForm";
import AdoptOrRehome from "./Adopt";

export default function DashHome() {
  const ownerID = localStorage.getItem("ownerID");
  const [currentComponent, setCurrentComponent] = useState('home');

  const handleLinkClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  if (!ownerID) {
    alert("Login First !!");
    return <Navigate to="/login" />;  // Redirect to login page if not logged in
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar onLinkClick={handleLinkClick} />
      <div className="flex-grow mt-2 p-4">
        {/* Main content rendered below the navbar */}
        {currentComponent === 'home' && <div>Home Content</div>}
        {currentComponent === 'petrecord' && <Record />}
        {currentComponent === 'article' && <BlogManage />}
        {currentComponent === 'appointment' && <AppointmentScheduler />}
        {currentComponent === 'petadopt' && <AdoptOrRehome/>}
        {currentComponent === 'dashboard' && <Dashboard/>}
      </div>
      <Footer />
    </div>
  );
}
