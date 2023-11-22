import React, { useEffect, useState } from 'react';
import { DialogDefault } from './popupLogin';
import { useAuth } from './useAuth'; 

const LoginPage: React.FC = () => {
<<<<<<< HEAD
  const [loggedIn, setLoggedIn] = useState(false);
=======
  const { login } = useAuth(); 
>>>>>>> 97921c0df3474175926f11e87ddba095154d68f5
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false); // Added state for error dialog

  const handleLogin = async () => {
    try {
      // Basic input validation
      if (!username || !password) {
        // Show the popup for empty fields
        setShowErrorDialog(true);
        return;
      }

      // Log the entered username to the console
      console.log('Username entered:', username);

      const response = await fetch('http://localhost:8000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Log the result to the console
        console.warn('Token:', result.token);

<<<<<<< HEAD
        // Store the token in local storage
        localStorage.setItem('loginToken', result.token);
=======
      login(result.token);

      window.location.href = '/dashboard';
    } else {
      // If the response status is not ok, log the error response
      const errorResponse = await response.json();
      console.error('Login failed:', errorResponse);
>>>>>>> 97921c0df3474175926f11e87ddba095154d68f5

        // Set loggedIn to true for successful login
        setLoggedIn(true);
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

  useEffect(() => {
    if (loggedIn) {
      // Redirect to "/projects" without using useHistory
      window.location.href = '/projects';
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
           <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round">
  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
  <circle cx="8.5" cy="7" r="4" />
  <path d="M20 8v6M23 11h-6" />
</svg>

                                <span className="ml-3">
                                    Sign In
                                </span>
                            </button>    <br></br>
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
<<<<<<< HEAD
=======
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
>>>>>>> 97921c0df3474175926f11e87ddba095154d68f5
    </div>
  );
};

export default LoginPage;