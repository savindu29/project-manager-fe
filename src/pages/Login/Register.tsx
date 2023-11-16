import React, { useState } from 'react';
import { RegisterSuccessDialog } from './popupregister';

const SignupPage: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show_Dialog, setShowDialog] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Login successful, setLoggedIn to true and redirect to "/"
        window.location.href = '/login';
      } else {
        // If the response status is not ok, log the error response
        const errorResponse = await response.json();
        console.error('Sign up failed:', errorResponse);
        // Show the popup indicating login failure
        setShowDialog(true);
      }

      // Continue with your sign-up logic for successful response
      setRegistered(true);
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during sign up:', error);
      setShowDialog(true);
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
              Sign up to Project Management System
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="mt-5 tracking-wide font-semibold bg-sky-600 text-gray-100 w-full py-4 rounded-lg hover-bg-sky-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={handleSignup}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full"
            style={{
              backgroundImage: `url('https://www.chicagoinstituteofbusiness.com/blog/project%20management.jpg')`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}
          ></div>
        </div>
      </div>
      <RegisterSuccessDialog open={show_Dialog} onClose={() => setShowDialog(false)}>
        Registartion successful plase login
      </RegisterSuccessDialog>
    </div>
  );
};

export default SignupPage;
