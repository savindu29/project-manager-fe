import React, { useState } from 'react';
import { RegisterSuccessDialog } from './popupregister';
import { RegisterFailedDialog } from './popupFailedRegister';

const SignupPage: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show_Dialog, setShowDialog] = useState(false);
  const [show_Dialog1, setShowDialog1] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
  if (!name || !email || !password) {
    setError('Please fill in all fields');
    setShowDialog1(true);
    return false;
  }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            setShowDialog1(true);
            return false;
        }

        setError('');
        return true;
    };

    const handleSignup = async () => {
        try {
            if (!validateInputs()) {
                setShowDialog1(true);
                return; // Don't proceed with the signup if validation fails
            }

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
                // Signup successful, show the popup
                setShowDialog(true);
                // You can redirect the user to the login page after showing the popup
                // window.location.href = '/login';

      // Continue with your sign-up logic for successful response
      setRegistered(true);
    } else {
      // If the response status is not ok, log the error response
      const errorResponse = await response.json();
      console.error('Sign up failed:', errorResponse);
      // You can handle the error in some way or display a different popup
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error during sign up:', error);
    // You can display a popup for network errors as well
  }
};


  useEffect(() => {
    if (registered) {
      // Redirect to "/login" or any other page after successful sign up
      window.location.href = "/login";
    }
  }, [registered]);

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
             <br></br> Sign up to Project Management System
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
  {/* Replace the existing SVG with your provided SVG code */}
  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
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
            {/* Add the RegisterSuccessDialog component */}
            {show_Dialog && (
                <RegisterSuccessDialog
                    open={show_Dialog}
                    onClose={() => setShowDialog(false)}
                />
            )}
            {show_Dialog1 && (
                <RegisterFailedDialog
                    open={show_Dialog1}
                    onClose={() => setShowDialog1(false)}
                />
            )}
        </div>
    );
};

export default SignupPage;
