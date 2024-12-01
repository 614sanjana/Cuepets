import * as React from "react";
import { Link ,useNavigate } from "react-router-dom"; 
import baseURL from "../API/ApiConfig";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AppNavbar from "./AppNavbar";
import "../App.css";
import FetchRecord from "./FetchRecord";
import Image from "./Image";


export default function Dashboard({ }) {
  return (
    <div className="text-9xl grid h-screen">
    <AppNavbar/>
        <h1 className="flex justify-center items-center " >DashBoard</h1>
        <div className="text-lg">
          <Image/>
        </div>
    <Footer/>
    </div>
  );
}
