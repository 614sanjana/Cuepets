import React, { useState } from "react";
import "./Sign.css";

const SignUpSignIn = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <p>
            {isSignUp
              ? "Create an account to start managing your pet's health effortlessly."
              : "Welcome back! Sign in to access your pet's health records."}
          </p>
        </div>

        <form className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your full name" required />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm your password" required />
            </div>
          )}

          <button type="submit" className="auth-button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              className="toggle-button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpSignIn;
