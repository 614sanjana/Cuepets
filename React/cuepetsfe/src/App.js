import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import AddPetForm from "./Components/AddPet";
import PetBlog from "./Components/blogpost";
import ManagePets from "./Components/ManagePet";
import BlogManage from "./Components/BlogManage";
import Adopt from "./Components/Adopt";
import Record from "./Components/Records";
import Rehome from "./Components/Rehome";


function App() {
  return (
    <div className="App">
      <Router basename="/CuePets">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-pet" element={<AddPetForm />} />
          <Route path="/blog-post" element={<PetBlog/>}/>
          <Route path="/manage-pets" element={<ManagePets/>}/>
          <Route path="/blog-manage" element={<BlogManage/>}/>
          <Route path="/adopt" element={<Adopt/>}/>
          <Route path="/pet-records" element={<Record/>}/>
          <Route path="/rehome" element={<Rehome/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
