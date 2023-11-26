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


export const getStatusHistory = async (id: number) => {
    try {
        const url = `${APP_API_BASE_URL}/api/v1/statusHistory/list?projectId=${id}`;

        const result = await axios.get(url);
        return result.data;
    } catch (err) {
        throw err;
    }
};
