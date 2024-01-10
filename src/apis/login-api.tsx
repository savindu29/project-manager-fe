import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const submitAccountRequest = async (name: any, email: any, position: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user-requests`, {
        displayName: name,
        email: email,
        position: position,
      });
  
      if (response.status === 200) {
        console.log('Account request successful!');
        return true;
      } else {
        const errorResponse = await response.data;
        console.error('Account request failed:', errorResponse);
        return false;
      }
    } catch (error) {
      console.error('Error during Account request:', error);
      return false;
    }
  };
  

export const sendVerificationCode = async (email: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/password/reset-request?email=${email}`);

    if (response.data.code === 200) {
      return true;
    } else {
      console.error('Verification code sending failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error during verification code sending:', error);
    return false;
  }
};


export const setNewPassword = async (verificationCode: string, newPassword: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/password/reset?resetCode=${verificationCode}&newPassword=${newPassword}`
      );
  
      if (response.data === "Password reset successful.") {
        return true;
      } else {
        console.error('Setting new password failed:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error('Error during setting new password:', error);
      return false;
    }
  };
  

export const loginUser = async (username: any, password: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/signin`, {
      email: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};
