import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./Components/LoginForm";
import Design from "./Components/Design";
import Register from "./Components/Register";
function App() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <Register />
      </div>
      </div>
  );
}

export default App;
