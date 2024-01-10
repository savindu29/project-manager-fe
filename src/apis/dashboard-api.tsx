import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProjectData = async (endpoint: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/project/${endpoint}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProposalStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/project/proposalStats`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchImplementationStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/project/implementationStats`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLessonsLearned = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/project/lessonsLearned`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
