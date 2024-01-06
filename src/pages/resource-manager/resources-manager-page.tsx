import {
  CheckCircleIcon,
  StopCircleIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

import RequestDialog from "./Componants/request-dialog";
import React from "react";
import WorkPerecentageCurrent from "./Componants/work-perecentage-current";
import { Button } from '@mui/material';
import Filter from "./Componants/search-filter";
import SearchFilter from "./Componants/search-filter";
import EmployeeTable from "./Componants/current-resources";
import ResourceTable from "./Componants/potential-resource-table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getProject } from "../../apis/project-api";

export interface SearchFilterProps {
  projectDetail: any;
  onSaveFilter: (filterData: any) => void;
}

interface FilterData {
  dateFrom?: string;
  dateTo?: string;
  selectedValues?: number[];
  availability?: number;
  // Add other properties as needed
}
 
type Filter = {
  column: string;
  operator: string;
  value: string;
};

interface Employee {
  id:number;
  name: string;
  status: string;
  allocated_date: string;
  released_date: string;
  percentage: number;
}

interface Project {
  id: number;
  name: string;
}

interface Resource {
  id:number;
  name: string;
  status: string;
  allocatedProjects: Project[];
  pendingProjects: Project[];
}




export function ResourcesManagerPage({
  projectDetails,
}: {
  projectDetails: any;
}) {
  // const [isRequestDialogOpen, setRequestDialogOpen] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  // const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/projectReosurces/ResourceList");
        console.log(response)
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } 
    };

    fetchEmployees();
  }, []);




  

  const [employeesData, setEmployeesData] = useState<Employee[]>([]);

  const [employees, setEmployees] = useState<any[]>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);



  const [potentialResources, setPotentialResources] = useState<Resource[]>([]);



  
 

  const [projectProposedImpStartDate, setProposedImpStartDate] = useState(
    projectDetails?.piStartDate ? new Date(projectDetails.piStartDate) : null
  );
  const [projectProposedImpEndDate, setProposedImpEndDate] = useState(
    projectDetails?.piEndDate ? new Date(projectDetails.piEndDate) : null
  );
  
  const { id } = useParams();
  const [projectDetail, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);


 












  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("out : ",id)
        if (id) {
          console.log("in : ",id)
          const response = await getProject(parseInt(id));
          setProjectDetails(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);

  useEffect(() => {
    if (projectDetails) {
        setProposedImpStartDate(projectDetails.piStartDate ? new Date(projectDetails.piStartDate) : null);
        setProposedImpEndDate(projectDetails.piEndDate ? new Date(projectDetails.piEndDate) : null);
    }

}, [projectDetails]);

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleSaveFilter = (filterData:FilterData) => {
    // Do something with the filter data, such as sending it to the server or updating state
    setProposedImpStartDate(filterData.dateFrom ? new Date(filterData.dateFrom) : null);
    setProposedImpEndDate(filterData.dateTo ? new Date(filterData.dateTo) : null);
    console.log('Received Filter Data in ResourceManagerPage:', filterData);
    
  };
  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/admin/employees/notAllocatedToProject?projectId=${projectDetails.id}`);
        console.log('API Response:', response.data);

        // Assuming the API response structure is as mentioned
        const employeesDataFromAPI = response.data.data;

        // Map the API response to the state variable
        const mappedEmployeesData = employeesDataFromAPI.map((employeeData: any) => ({
          id:employeeData.id,
          name: employeeData.name,
          allocatedProjects: employeeData.allocatedProjects || [],
          pendingProjects: employeeData.pendingProjects || [],
        }));

        setEmployeesData(mappedEmployeesData);

        // Set potential resources separately
        setPotentialResources(mappedEmployeesData);
      } catch (error) {
        console.error('Error fetching data:', error as string);
      }
    };

    if (projectDetails && projectDetails.id) {
      fetchEmployeesData();
    }
  }, [projectDetails]);


  return (
    <div className="px-12 mb-12">
      <div className="h-20 w-full flex items-center ">
        <div className="w-1/2">
          <p className="text-xl font-semibold">
            Resource allocation for test project
          </p>
        </div>
        <div className="w-1/2 flex">
          <div className="flex border border-zinc-300 rounded-md items-center w-full mr-20">
            <input
              type="search"
              name="resourceSearch"
              id="resourceSearch"
              placeholder="Search Resource here"
              className="appearance-none  px-4 py-2 text-gray-700 leading-tight outline-none rounded-md w-full text-sm"
            />

            <div>
              
            <SearchFilter projectDetail={projectDetail} onSaveFilter={handleSaveFilter} />

            
              <div>
                {filters.map((filter, index) => (
                  <div key={index}>
                    <p>
                      {filter.column} {filter.operator} {filter.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button className="bg-zinc-200  rounded-md p-1 mr-1 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 mx-2 text-zinc-500 " />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-6">
        <div className=" bg-green-700 flex text-white rounded py-1 px-2 w-48 justify-center items-center text-sm">
          <CheckCircleIcon className="h-4 w-4 mr-2" /> Current Resources
        </div>
      </div>
      <div className="mt-6  ">
        <div className="">
        <EmployeeTable
        employees={employees}

      />
         
        </div>
      </div>
      <div className="mt-12 flex">
        <div className=" bg-violet-600 flex text-white rounded py-1 px-2 w-48 justify-center items-center text-sm">
          <StopCircleIcon className="h-4 w-4 mr-2" /> Potential Resources
        </div>
        <div className="py-1 px-3 bg-zinc-200 rounded ml-12 flex text-xs flex items-center">
          <div>
            Date from :
            <input
              type="date"
              name="proposedImplementStartDate"
              id="proposedImplementStartDate"
              className="px-1 py-1 ml-2 hover:outline-none "
              onChange={(e) =>
                setProposedImpStartDate(new Date(e.target.value))
              }
              value={
                projectProposedImpStartDate
                  ? formatDate(projectProposedImpStartDate)
                  : ""
              }/>
          </div>
          <div className="ml-6">
            Date To :
            <input
              type="date"
              name="proposedImplementEndDate"
              id="proposedImplementEndDate"
              className="px-1 py-1 ml-2 hover:outline-none "
              onChange={(e) => setProposedImpEndDate(new Date(e.target.value))}
              value={
                projectProposedImpEndDate
                  ? formatDate(projectProposedImpEndDate)
                  : ""
              } />
          </div>
        </div>
      </div>
      <div className="mt-6  ">
        <div className="">

          <ResourceTable
              resources={potentialResources}
          />
        </div>
      </div>
      
    </div>
  );
}