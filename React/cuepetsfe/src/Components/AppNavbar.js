import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faPaw,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../App.css";

function AppNavbar({onLinkClick}) {
  const [nav, setNav] = useState(false);
  const ownerID = localStorage.getItem('ownerID');
  const [ownerName, setOwnerName] = useState(null); // State for storing owner's name

  const navigate = useNavigate();

  // Fetch owner name from the backend
  const fetchOwnerName = async (ownerID) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/getUserName/${ownerID}`);
      setOwnerName(response.data); // Set the fetched owner name
    } catch (error) {
      console.error("Error fetching owner name:", error);
    }
  };

  // Call fetchOwnerName when the component mounts
  useEffect(() => {
    if (ownerID) {
      fetchOwnerName(ownerID);
    }
  }, [ownerID]);

  const handleRedirect = () => {
    localStorage.clear();
    navigate("/"); // Redirect to the sign-in page
  };

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <div className="navbar-section text-2xl font-extrabold flex justify-between items-center p-4">
      <h1 className="text-4xl navbar-title">
        <Link to="/">
          CuePets <FontAwesomeIcon icon={faPaw} className="paw-icon" />
        </Link>
      </h1>

      {/* Desktop Navbar Links */}
      <ul className="navbar-items  md:flex space-x-8">
        <li  onClick={() => onLinkClick('home')}>
          <Link to="#home" className="navbar-links">Home</Link>
        </li>
        <li  onClick={() => onLinkClick('petrecord')}>
          <a href="#petrecord" className="navbar-links">Pet Record</a>
        </li>
        <li  onClick={() => onLinkClick('article')}>
          <a href="#article" className="navbar-links">Article</a>
        </li>
        <li  onClick={() => onLinkClick('appointment')}>
          <a href="#appointment" className="navbar-links">Appointment</a>
        </li >
        <li  onClick={() => onLinkClick('petadopt')}>
          <a href="#petadopt" className="navbar-links">Pet Adopt</a>
        </li>
        <li  onClick={() => onLinkClick('dashboard')}>
          <a href="#dashboard" className="navbar-links">Dashboard</a>
        </li>
      </ul>

      {/* User Info and Log Out Button */}
      <div className="navbar-user-info flex items-center space-x-4">
        {ownerName && (
          <span className="owner-name text-sm text-gray-700">Welcome, {ownerName}</span>
        )}
        <button
          className="navbar-btn bg-gray-200 hover:bg-gray-300 p-2 rounded"
          type="button"
          onClick={handleRedirect}
        >
          <FontAwesomeIcon icon={faSignInAlt} /> Log Out
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className={`mobile-navbar ${nav ? "open-nav" : "hidden"} md:hidden`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links space-y-4">
          <li>
            <Link onClick={openNav} to="/">Home</Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">Services</a>
          </li>
          <li>
            <a onClick={openNav} href="#about">About</a>
          </li>
          <li>
            <a onClick={openNav} href="#article">Article</a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">Doctors</a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="mobile-nav md:hidden">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default AppNavbar;
