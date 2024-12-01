import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "./Sign.css";
import api from "../API/ApiConfig";

const SignUpSignIn = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [userName, setFullName] = useState("");
  const [userPhone, setPhone] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const userPass=userPassword;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorsMessage, setErrorMessage] = React.useState(""); // Error state for error messages
  const [showForgotPassword, setShowForgotPassword] = React.useState(false); // State to control visibility of the Forgot Password link

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setPasswordMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(userPassword === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (!passwordMatch) {
        alert("Passwords do not match.");
        return;
      }

      api.post("/auth/signUp", {userPhone,userName,userEmail,userPassword})
      .then(result => {
          alert("User Added !!");
          if (result.status === 200) {
              navigate("/dashboard");
          }
      })
      .catch(err => {
          if (err.response && err.response.status === 400) {
              console.log(err);
          }
      });
    } else {
      api.post("/auth/signIn", { userPhone, userPass })
      .then((result) => {
        if (result.status === 200) {
            alert("Login Successful !!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setErrorMessage("User Doesn't Exist !!");
        } else if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid Credentials Try Forgot Password");
          setShowForgotPassword(true); // Show the "Forgot Password" link if credentials are invalid
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
    }
  };

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

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
          </div>
             <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
            </>
          )}

          

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={userPhone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={userPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                required
                style={{
                  borderColor: passwordMatch ? "green" : "red",
                }}
              />
              {!passwordMatch && (
                <p className="error-message" style={{ color: "red" }}>
                  Passwords do not match.
                </p>
              )}
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
              onClick={() => {
                setIsSignUp(!isSignUp);
                setPassword("");
                setConfirmPassword("");
                setPasswordMatch(true);
              }}
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
