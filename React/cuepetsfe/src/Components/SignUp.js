import * as React from "react";
import { Link ,useNavigate } from "react-router-dom"; 
import axios from "axios";
import api from "../API/ApiConfig"

export default function SignUp({ setAuthState, setUser }) {
  const [userPhone, setPhone] = React.useState();
  const [userName, setUsername] = React.useState();
  const [userEmail, setEmail] = React.useState()
  const [userPassword, setPassword] = React.useState();
  const [confirmpassword, setConfirmPassword] = React.useState();
  const navigate = useNavigate();

    
  
    const handleSignUp = (e) => {

         // Validation
     if (!userPhone || !userName || !userEmail || !userPassword || !confirmpassword) {
        alert("Please fill in all the fields.");
        return;
      }
  
      if (userPassword !== confirmpassword) {
        alert("Passwords do not match.");
        return;
      }

        e.preventDefault();
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
    };


  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-4/5 max-w-3xl px-6 py-8 mt-6 ml-10 md:px-10 md:py-12 bg-white rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl md:text-4xl font-semibold text-center">Sign Up</h1>
        <form className="mt-6">
          <div className="flex flex-col gap-5"> {/* Increased gap to avoid overlap */}
            {/* Phone */}
            <div>
              <label className="text-lg font-semibold">Phone</label> {/* Increased label font size */}
              <input
                value={userPhone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-lg bg-transparent"
                placeholder="Enter your Registered Phone Number"
              />
            </div>
            {/* Email */}
            <div>
              <label className="text-lg font-semibold">Email</label> {/* Increased label font size */}
              <input
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-lg bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            {/* Username */}
            <div>
              <label className="text-lg font-semibold">Username</label> {/* Increased label font size */}
              <input
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-lg bg-transparent"
                placeholder="Enter your username"
              />
            </div>
            {/* Password */}
            <div>
              <label className="text-lg font-semibold">Password</label> {/* Increased label font size */}
              <input
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-lg bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            {/* Confirm Password */}
            <div>
              <label className="text-lg font-semibold">Confirm Password</label> {/* Increased label font size */}
              <input
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-lg bg-transparent"
                placeholder="Confirm your password"
                type="password"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="mt-4 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 text-lg font-medium" htmlFor="remember">
                Remember me
              </label>
            </div>
           
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-3">
            <button className="py-3 w-full bg-violet-500 text-white font-bold text-base rounded-md transition-transform active:scale-95 hover:scale-105" onClick={handleSignUp}>
              Submit
            </button>
            <button className="py-3 w-full border border-gray-300 text-gray-700 font-semibold text-base rounded-md flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-transform active:scale-95 hover:scale-105">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                  fill="#EA4335"
                />
                <path
                  d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                  fill="#34A853"
                />
                <path
                  d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                  fill="#4A90E2"
                />
                <path
                  d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                  fill="#FBBC05"
                />
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-center items-center">
            <p className="text-lg font-medium">Already a user?</p>
            <Link to="/signin" className="ml-2 text-lg font-medium text-violet-500">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
