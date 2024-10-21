import {React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/home";
import Login from "./Components/login";
import SignUp from "./Components/signup";
import { Navbar } from "./Components/navbar";
// import ProtectedRoute from "./Components/ProtectedRoute";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      axios.get('http://localhost:3001/user', { withCredentials: true })
          .then(response => {
              if (response.data.user) {
                  setIsLoggedIn(true);
              } else {
                  setIsLoggedIn(false);
              }
          })
          .catch(() => setIsLoggedIn(false));
  }, []);

  return (
      <div>
          <BrowserRouter>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                  <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;