import React, { useState } from 'react';
import { APP_API_BASE_URL } from '../../apis';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('email'); // 'email', 'adminEmailSent'
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const ADMIN_EMAIL_ENDPOINT = `${APP_API_BASE_URL}/api/v1/admin/recover-password`;


  const handleSendEmailToAdmin = async () => {
    try {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // API for indicating user request to the admin
      const response = await fetch(ADMIN_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        setStage('adminEmailSent');
      } else {
        const errorResponse = await response.json();
        console.error('Sending email to admin failed:', errorResponse);
        setError('Failed to send email to admin. Please try again.');
      }
    } catch (error) {
      console.error('Error during sending email to admin:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-1 flex flex-col items-center">
            {stage === 'email' && (
              <>
                <h1 className="text-2xl font-extrabold text-center">
                  Forgot Your Password?
                </h1>
                <p className="mt-3 text-gray-600 text-center">
                  No worries, we've got you covered. Enter your email address, and we'll let the admin know you need assistance.
                </p>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-blue-500 text-white w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
                      onClick={handleSendEmailToAdmin}
                    >
                      Send Request to Admin
                    </button>
                  </div>
                </div>
              </>
            )}

            {stage === 'adminEmailSent' && (
              <>
                <h1 className="text-2xl font-extrabold text-center">
                  Request Sent to Admin
                </h1>
                <p className="mt-3 text-gray-600 text-center">
                  Your request has been sent to the admin. They will assist you in recovering your password.
                </p>
              </>
            )}

            {error && (
              <p className="text-red-500 mt-3">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
