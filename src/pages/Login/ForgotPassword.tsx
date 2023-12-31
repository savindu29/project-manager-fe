import React, { ChangeEvent, useState } from 'react';
import { APP_API_BASE_URL } from '../../apis';
import axios from 'axios';

const ForgotPasswordPage2: React.FC = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [stage, setStage] = useState('email'); 
  const [error, setError] = useState('');
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [isSendingVerificationCode, setIsSendingVerificationCode] = useState(false);
  const [password, setPassword] = useState('');
  const [isStrongPassword, setIsStrongPassword] = useState(false);

  const checkPasswordStrength = (password: string) => {
    // Define password strength criteria
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if password meets all criteria
    const isStrong =
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar;

    setIsStrongPassword(isStrong);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSendVerificationCode = async () => {
    setIsSendingVerificationCode(true);
    try {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }
    let url = `${APP_API_BASE_URL}/api/password/reset-request?email=${email}`
    const response = await axios.post(url)
      console.log(response);
      if (response.data.code==200) {
     
        setStage('verification');
      } else {
        console.error('Verification code sending failed:');
        setError('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error during verification code sending:', error);
      setError('Error during verification code sending.Please try again.');
    }
  };

  const handleSetNewPassword = async () => {
    setIsSettingPassword(true);
    try {
      const response = await axios.post(
        `${APP_API_BASE_URL}/api/password/reset?resetCode=${verificationCode}&newPassword=${newPassword}`
      );
      console.log('Response:', response);
  
      if (response.data === "Password reset successful.") {
        setStage('passwordSetSuccessfully');
        window.location.href = "/login";
      } else {
        console.error('Setting new password failed:');
  
        if (response.data && (response.data.code === 401 || response.data.code === 500)) {
          setError('Verification code does not match. Please check and try again.');
        } else if (response.data && response.data.code === 400) {
          setError('Weak password. Please enter a stronger password.');
        } else {
          setError('Failed to set a new password. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Error during setting new password:', error);
  
      if (error.response) {
        console.error('Response from server:', error.response);
      }
  
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
                  No worries, we've got you covered. Enter your email address, and we'll send you a verification code.
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
                      onClick={handleSendVerificationCode}
                      disabled={isSendingVerificationCode || isSettingPassword}
                    >
                      Send Verification Code
                    </button>
                  </div>
                </div>
              </>
            )}
            {(stage === 'verification' || stage === 'newPassword') && (
              <>
                <h1 className="text-2xl font-extrabold text-center">
                  Verify Code and Set New Password
                </h1>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Verification Code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                   <input
        className="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          checkPasswordStrength(e.target.value);
        }}
      />

      {/* Password strength indicator */}
      <div>
        Password Strength: {isStrongPassword ? 'Strong' : 'Weak'}
      </div>

      {/* Your existing button for setting a new password */}
      <button
        className="mt-5 tracking-wide font-semibold bg-blue-500 text-white w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none"
        onClick={() => {
          if (stage === 'verification' || stage === 'newPassword') {
            handleSetNewPassword();
          }
        }}
        disabled={isSendingVerificationCode || isSettingPassword}
      >
        {stage === 'verification' ? 'Recover Account' : 'Set New Password'}
      </button>


                  </div>
                </div>
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

export default ForgotPasswordPage2; 