import { getProjectsOptions } from ".";
import axios from "axios";

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

type responseType ={
  count:number;
  data:Project[];

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
      const url = `http://localhost:8000/api/v1/project/list?${str}`;

     
      const result = await axios.get(url);
      
      const data= result.data; 
      
      return data;
    } catch (error) {
      throw error;
    }
  };
  export const getProject = async (id: number) => {
    try {
      const url = `http://localhost:8000/api/v1/project/${id}`;
  
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      throw err;
    }
  };

  export const updateProject = async (id: number, updatedData: any) => {
    try {
      const url = `http://localhost:8000/api/v1/project/${id}`;
      const result = await axios.put(url, updatedData); // Assuming you're using a PUT request for updates
      return result.data;
    } catch (err) {
      throw err;
    }
  };

  
  