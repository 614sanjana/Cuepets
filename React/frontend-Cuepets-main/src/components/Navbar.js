import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Hamburger Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-text-top"
          />
        </Link>

        <div className="cuepets-name ms-4">
        CUEPETS
      </div>


        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Services Dropdown */}
            <li className="nav-item dropdown ms-4">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item" to="/pet-adoption">
                    Pet Adoption
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/vaccination-logs">
                    Vaccination Logs
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/medical-records">
                    Medical Records
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/blog">
                    Blog Post
                  </Link>
                </li>
              </ul>
            </li>
            {/* About */}
            <li className="nav-item ms-4">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Chatbot Button */}
          <Link className="btn btn-chatbot ms-auto" to="/chatbot">
            Cuebot
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;