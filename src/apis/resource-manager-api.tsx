// api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProjectStatusData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/specification/specificationAreas`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSpecificationByArea = async (area: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/specification/specificationByArea/${area}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchResourceDetails = async (resourceId: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/project/resources-projects/${resourceId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/projectReosurces/ResourceList`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEmployeesData = async (projectId: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/admin/employees/notAllocatedToProject?projectId=${projectId}`);
      console.log('API Response:', response.data);
      const employeesDataFromAPI = response.data.data;
      const mappedEmployeesData = employeesDataFromAPI.map((employeeData: { id: any; name: any; allocatedProjects: any; pendingProjects: any; }) => ({
        id: employeeData.id,
        name: employeeData.name,
        allocatedProjects: employeeData.allocatedProjects || [],
        pendingProjects: employeeData.pendingProjects || [],
      }));
  
      return mappedEmployeesData;
    } catch (error) {
      throw error;
    }
  };