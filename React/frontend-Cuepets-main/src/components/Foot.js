import React from "react";
import "./Footer.css";

const Foot = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="subscribe">
          <h3>Subscribe to updates</h3>
          <p>Stay informed about our latest pet care tips.</p>
        </div>
        <div className="subscribe-form">
          <input
            type="email"
            placeholder="Your email here"
            className="email-input"
          />
          <button className="join-button">Join</button>
        </div>
      </div>

      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-section">
          <h2 className="footer-logo">Logo</h2>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Adoption Info</li>
            <li>Health Records</li>
            <li>Vaccination Log</li>
            <li>Pet Care</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>Blog Articles</li>
            <li>FAQs</li>
            <li>Community Events</li>
            <li>Support Us</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>Facebook Page</li>
            <li>Instagram Feed</li>
            <li>Twitter Updates</li>
            <li>YouTube Channel</li>
            <li>LinkedIn Profile</li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>Accessibility Info</li>
            <li>User Agreement</li>
            <li>Cookie Policy</li>
            <li>Data Protection</li>
            <li>Feedback Form</li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li>Join Our Community</li>
            <li>Stay In Touch</li>
            <li>Get Involved</li>
            <li>Volunteer Opportunities</li>
            <li>Pet Adoption Events</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Cue Pets. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Settings</a>
        </div>
        <div className="social-icons">
          <a href="#" title="Website">🌐</a>
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="Twitter">🐦</a>
          <a href="#" title="YouTube">🎥</a>
          <a href="#" title="LinkedIn">🔗</a>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
