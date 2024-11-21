import * as React from "react";
import { Link ,useNavigate } from "react-router-dom"; 
import axios from "axios";
import baseURL from "../API/ApiConfig";
export default function SignIn({ setAuthState, setUser }) {
  const [userPhone, setPhone] = React.useState("");
  const [userPass, setPassword] = React.useState("");

  const navigate = useNavigate();

    const handleSignIn = (e) => {
        console.log("Inide came");
        console.log(userPhone);
        console.log(userPass);
        
        e.preventDefault();
        axios.post("http://localhost:8080/api/v1/auth/signIn",{userPhone,userPass})
            .then(result => {
                if (result.status === 200) {
                    navigate("/dashboard");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {

                } else {
                    console.log(err);
                }
            });
    };


  return (
    <div className="text-9xl">
        <h1>DASHBOARD</h1>
    </div>
  );
}
