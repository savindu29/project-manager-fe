
import React, { useState, useEffect } from 'react';

const LoginPage: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
 
    setLoggedIn(true);
  };

  useEffect(() => {
    
    if (loggedIn) {
 
    }
  }, [loggedIn]);

  return (
                <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                            <div className="mt-1 flex flex-col items-center"> 
                            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcGnVuY8VrtkzrFMILfX1nVkTqSSo_iFbhE9hRmrQS4oazGYHalTK9jPp0n3Lw0TKJWvw&usqp=CAU"
            className="w-48 mx-auto"
            style={{ margin: '-50px 0' }} />
            <h1 className="text-xl xl:text-2xl font-extrabold text-center"> 
            Sign up to Project Management System
            </h1>
                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="text" placeholder="Username" /> 
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="password" placeholder="Password" />
                                                        <button
            className="mt-5 tracking-wide font-semibold bg-sky-600 text-gray-100 w-full py-4 rounded-lg hover-bg-sky-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            onClick={handleLogin}
          >
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">
                                    Sign Up
                                </span>
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
    </div>
  );
};

export default LoginPage;
