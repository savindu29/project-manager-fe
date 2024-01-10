import React, { useEffect, useState } from 'react';
import { RegisterSuccessDialog } from './popupregister';
import { RegisterFailedDialog } from './popupFailedRegister';
import { APP_API_BASE_URL } from '../../apis';
import { submitAccountRequest } from '../../apis/login-api';

const AccRequest: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [show_Dialog, setShowDialog] = useState(false);
  const [show_Dialog1, setShowDialog1] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
  if (!name || !email || !position) {
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

    const accRequest = async () => {
      try {
        if (!validateInputs()) {
          setShowDialog1(true);
          return;
        }
        const isSuccess = await submitAccountRequest(name, email, position);
    
        if (isSuccess) {
          console.log('Account request successful!');
          setShowDialog(true);
        } else {
          console.error('Account request failed');
        }
      } catch (error) {
        console.error('Error during Account request:', error);
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
             <br></br> Request a Account 
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
                  type="Position"
                  placeholder="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
    <button
  className="mt-5 tracking-wide font-semibold bg-sky-600 text-gray-100 w-full py-4 rounded-lg hover-bg-sky-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
  onClick={accRequest}
>
  <span className="ml-3">Send</span>
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

export default AccRequest;