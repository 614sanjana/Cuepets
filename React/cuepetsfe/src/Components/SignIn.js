import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../API/ApiConfig";
import { GoogleLogin } from '@react-oauth/google';

// Importing the cat image with correct path
import signinCat from "../Assets/signinCat.jpg";

export default function SignIn({ setAuthState, setUser }) {
  const [userPhone, setPhone] = React.useState("");
  const [userPass, setPassword] = React.useState("");
  const [errorsMessage, setErrorMessage] = React.useState("");
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  const navigate = useNavigate();

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowForgotPassword(false);

    if (!userPhone || !userPass) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    api
      .post("/auth/signIn", { userPhone, userPass })
      .then((result) => {
        if (result.status === 200) {
          const { ownerID, userName } = result.data;
          localStorage.setItem("ownerID", ownerID);
          localStorage.setItem("userName", userName);
          alert("Login Successful !!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setErrorMessage("User Doesn't Exist !!");
        } else if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid Credentials Try Forgot Password");
          setShowForgotPassword(true);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden w-full sm:w-[800px]">
        {/* Left Section - Cat Image */}
        <div className="w-1/2 hidden sm:block">
          <img
            src={signinCat}
            alt="Sign In Cat"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Section - Sign In Form */}
        <div className="w-full sm:w-1/2 px-6 py-10 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold text-center mb-8">Sign In</h1>
          <form onSubmit={handleSignIn} className="w-full max-w-md">
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-lg font-medium">Phone</label>
                <input
                  value={userPhone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 text-base"
                  placeholder="Enter your Registered Phone Number"
                />
              </div>
              <div>
                <label className="text-lg font-medium">Password</label>
                <input
                  value={userPass}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 text-base"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>

            {errorsMessage && (
              <div className="text-red-500 text-center my-4">{errorsMessage}</div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label className="ml-2 text-base font-medium" htmlFor="remember">
                  Remember me
                </label>
              </div>
              {showForgotPassword && (
                <button className="text-base font-medium text-blue-600">
                  Forgot password
                </button>
              )}
            </div>

            <button
              type="submit"
              className="py-3 w-full mt-6 bg-[#1A8EFD] text-white text-lg font-bold rounded-md transition-transform active:scale-95 hover:scale-105"
            >
              Submit
            </button>

            <div className="mt-4">
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="py-3 w-full mt-4 border border-gray-300 text-gray-700 font-medium text-lg rounded-md flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-transform active:scale-95 hover:scale-105"
                  >
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
                )}
                buttonText="Sign in with Google"
                onSuccess={responseMessage}
                onFailure={errorMessage}
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-base font-medium">Don't have an account?</p>
              <button className="ml-2 text-blue-600 font-semibold">
                <Link to="/signUp">Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
