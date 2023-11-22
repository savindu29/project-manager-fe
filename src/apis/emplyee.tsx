
import { getEmployeesOptions } from ".";
import axios, { AxiosResponse } from "axios";


type Person = {
    id:number,
    name: string,
    mobile: string,
    companyEmail: string,
    privateEmail: string,
    designation: string,
    specializedField: string
};


export const saveUser = async (user:Person) => {
    try {
        const url = "http://localhost:8000/api/v1/responsible-person/create";

        const result = await axios.post(url,user);
        return result.data;
    } catch (err) {
        throw err;
    }
};
type responseType ={
    count:number;
    data:Person[];
  
  }
type ApiResponse<T> = {
    data: T;
};

export const getAllEmployees = async (
    params: getEmployeesOptions
  ): Promise<ApiResponse<responseType>> => {
    try {
        let str = Object.entries(params)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
      const url = `http://localhost:8000/api/v1/responsible-person/search?${str}`;

     
      const result = await axios.get(url);
      
      const data= result.data; 
      
      return data;
    } catch (error) {
      throw error;
    }
  };