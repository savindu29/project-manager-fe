import {getProjectsOptions} from ".";
import axios from "axios";
import {APP_API_BASE_URL} from '../apis/index'

type Project = {
    id: number;
    projectName: string;
    code: string;
    priority: string;
    currentStatus: string;
    todo: string;
    latestStatusHistoryDate: string;
    backgroundColorClass: string;
};

type responseType = {
    count: number;
    data: Project[];

}

type ApiResponse<T> = {
    data: T;
};


export const getAllProjects = async (
    params: getProjectsOptions
): Promise<ApiResponse<responseType>> => {
    try {
        let str = Object.entries(params)
            .map(([key, val]) => `${key}=${val}`)
            .join('&');
        const url = `${APP_API_BASE_URL}/api/v1/project/search?${str}`;


        const result = await axios.get(url);

        const data = result.data;

        return data;
    } catch (error) {
        throw error;
    }
};
export const getProject = async (id: number) => {
    try {
        const url = `${APP_API_BASE_URL}/api/v1/project/${id}`;

        const result = await axios.get(url);
        return result.data;
    } catch (err) {
        throw err;
    }
};


export const updateProject = async (id: number, updatedData: any) => {
    try {
        const url = `${APP_API_BASE_URL}/api/v1/project/${id}`;
        const result = await axios.put(url, updatedData); // Assuming you're using a PUT request for updates
        return result.data;
    } catch (error: any) {
        console.error("error update: ", error.message)
        throw error;
    }
};


<<<<<<< HEAD
//----UPDATE PROJECT----
//todo
export const updateTodo = async (projectId: any, todoData: any) => {
    const API_BASE_URL = 'http://localhost:8000/api/v1';
  const url = `${API_BASE_URL}/todo/update?projectId=${projectId}`;

  try {
    const response = await axios.put(url, todoData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; 
  }
};


//cost
export const updateProjectCost = async (projectId: number, data: any) => {
  try {
    const apiUrl = 'http://localhost:8000/api/v1/cost/update';
    const response = await fetch(`${apiUrl}?projectId=${projectId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Data saved successfully');
    } else {
      console.error('Failed to save data');
    }
  } catch (error) {
    console.error('Error during API call', error);
  }
};

//grant client
export const updateIntermediateClient = (projectId: any, data: any) => {
    return fetch(`http://localhost:8000/api/v1/intermediateClient/update?projectId=${projectId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      throw error; 
    });
  };


//clarificationDiscussionDetails
export const updateClarificationDiscussionDetails = async (
  projectId: number,
  clarificationDiscussionDetails: string
): Promise<void> => {
  try {
    const updatedData = {
      clarificationDiscussionDetails,
    };

    await axios.put(
      `http://localhost:8000/api/v1/project/update?projectId=${projectId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error updating clarificationDiscussionDetails:', error);
  
    // Log the response content if available
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data);
    }
  }
};

// Update lessonsLearned in updateLessonsLearned function
export const updateLessonsLearned = async (
  projectId: number,
  lessonsLearned: string
): Promise<void> => {
  try {
      const updatedData = {
          lessonsLearned,
      };

      await axios.put(
          `http://localhost:8000/api/v1/project/update?projectId=${projectId}`,
          updatedData,
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
  } catch (error) {
      console.error('Error updating lessonsLearned:', error);

      // Log the response content if available
      if (axios.isAxiosError(error)) {
          console.error('Response:', error.response?.data);
      }
  }
};
=======
export const getStatusHistory = async (id: number) => {
    try {
        const url = `${APP_API_BASE_URL}/api/v1/statusHistory/list?projectId=${id}`;

        const result = await axios.get(url);
        return result.data;
    } catch (err) {
        throw err;
    }
};
>>>>>>> origin/main
