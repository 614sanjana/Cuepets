import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../API/ApiConfig";
import { GoogleLogin } from '@react-oauth/google';

export default function SignIn({ setAuthState, setUser }) {
  const [userPhone, setPhone] = React.useState("");
  const [userPass, setPassword] = React.useState("");
  const [errorsMessage, setErrorMessage] = React.useState(""); // Error state for error messages
  const [showForgotPassword, setShowForgotPassword] = React.useState(false); // State to control visibility of the Forgot Password link

  const navigate = useNavigate();

  const responseMessage = (response) => {
      console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  const handleRedirect = () => {
    navigate("/"); // Redirect to the AboutPage component
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before submitting
    setShowForgotPassword(false); // Hide "Forgot Password" by default before any error

    // Validations
    if (!userPhone || !userPass) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    // Post request to backend for sign in
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
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <div className="flex items-center">
        <p className="ml-10 mt-4 font-bold text-2xl">Go Back</p>
        <button
          type="button"
          onClick={handleRedirect}
          className="text-white mt-5 ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 13"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            <span className="sr-only">Icon description</span>
        </button>
      </div>

      <div className="w-4/5 max-w-3xl px-6 py-80 mt-10 ml-10 md:px-10 md:py-12 bg-white rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl md:text-4xl font-semibold text-center pb-10 flex justify-center items-center">
          Sign In
        </h1>
        <form className="mt-6" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-5">
            {/* Phone */}
            <div>
              <label className="text-xl font-semibold">Phone</label>
              <input
                value={userPhone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 text-lg bg-transparent"
                placeholder="Enter your Registered Phone Number"
              />
            </div>

            {/* Password */}
            <div className="pb-10">
              <label className="text-xl font-semibold">Password</label>
              <input
                value={userPass}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 text-lg bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorsMessage && (
            <div className="text-red-500 text-center mb-4">{errorsMessage}</div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="mt-4 flex justify-between items-center pb-10">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 text-lg font-medium" htmlFor="remember">
                Remember me
              </label>
            </div>
            {showForgotPassword && ( // Show only if invalid credentials occurred
              <button className="text-lg font-medium text-violet-500">
                Forgot password
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-3 pb-10">
            <button
              type="submit"
              className="py-3 w-full bg-violet-500 text-lg text-white font-bold rounded-md transition-transform active:scale-95 hover:scale-105"
            >
              Submit
            </button>
            <div>
            <GoogleLogin
    render={renderProps => (
      <button onClick={renderProps.onClick} className="py-3 w-full border border-gray-300 text-gray-700 font-semibold text-lg rounded-md flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-transform active:scale-95 hover:scale-105" >
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
            <div className="pb-2"></div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-center items-center mb-50">
            <p className="text-lg font-medium">Don't have an account?</p>
            <button className="ml-2 text-violet-500 font-semibold">
              <Link to="/signUp">Sign Up</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
