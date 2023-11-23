// Import necessary modules
import React, { useState } from 'react';
import { DialogDefault } from './popupLogin';
import { useAuth } from './useAuth'; 
import { useNavigate } from 'react-router-dom';
// Create a variable to store the email globally
let globalEmail: string | null = null;

// Your component
const LoginPage: React.FC = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleLogin = async () => {
    try {
      // Basic input validation
      if (!username || !password) {
        // Show the popup for empty fields
        setShowErrorDialog(true);
        return;
      }

      const response = await fetch('http://localhost:8000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Log the result to the console
        console.warn("Token:", result.token);

        // // Store the email globally
        // globalEmail = username;
        localStorage.setItem('userEmail', username);

        // Log the email to the console
        console.log("Email:", globalEmail);

        // Store the token in local storage
        localStorage.setItem('loginToken', result.token);

        login(result.token);

      window.location.href = '/';
    } else {
      // If the response status is not ok, log the error response
      const errorResponse = await response.json();
      console.error('Login failed:', errorResponse);

        // Show the popup indicating login failure
        setShowErrorDialog(true);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);

      // Show the popup for network errors or other exceptions
      setShowErrorDialog(true);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-1 flex flex-col items-center"> 
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcGnVuY8VrtkzrFMILfX1nVkTqSSo_iFbhE9hRmrQS4oazGYHalTK9jPp0n3Lw0TKJWvw&usqp=CAU"
              className="w-48 mx-auto"
              style={{ margin: '-50px 0' }}
              alt="Logo"
            />
            <h1 className="text-xl xl:text-2xl font-extrabold text-center"> 
            <br></br>  Sign In for the Project Management System
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text" placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password" placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
     <button
  className="mt-5 tracking-wide font-semibold bg-sky-600 text-gray-100 w-full py-4 rounded-lg hover-bg-sky-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
  onClick={handleLogin}
>
  {/* Replace the existing SVG with your provided SVG code */}
  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
  </svg>
  <span className="ml-3">
    Sign In
  </span>
</button>

                <br></br>
                <button
                  className="mx-auto mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
                  onClick={() => {
                    // Handle the click event for the small button (redirect to sign-up page)
                    window.location.href = "/register";
                  }}
                >
                  Don't have an account? <span className="underline text-sky-600">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full"
            style={{ 
              backgroundImage: `url('https://www.chicagoinstituteofbusiness.com/blog/project%20management.jpg')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}
          ></div>
        </div>
      </div>
      <DialogDefault open={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
        Please check your email and password 
      </DialogDefault>
    </div>
  );
};

export default LoginPage;
export { globalEmail };