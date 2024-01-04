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
import { useParams } from "react-router-dom";
import { getProject } from "../../apis/project-api";
import axios from "axios";

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

interface Resource {
  id: number;
  name: string;
  status: string;
  allocatedProjects: { id: number; name: string }[];
  pendingProjects: { id: number; name: string }[];
}
interface Project {
  id: number;
  name: string;
}

interface Employee {
  name: string;
  status: string;
  allocatedDate: string;
  releaseDate: string;
  percentage: number;
}

interface ResourcesManagerPageProps {
  projectDetails: any;
}

const ResourcesManagerPage: React.FC<ResourcesManagerPageProps> = ({ projectDetails }) => {
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [resourcesAllocated, setResourcesAllocated] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [checkedResourceIds, setCheckedResourceIds] = useState<number[]>([]);
  const [checkedResourceNames, setCheckedResourceNames] = useState<string[]>([]);
  const [projectProposedImpStartDate, setProposedImpStartDate] = useState<Date | null>(
    projectDetails?.piStartDate ? new Date(projectDetails.piStartDate) : null
  );
  const [projectProposedImpEndDate, setProposedImpEndDate] = useState<Date | null>(
    projectDetails?.piEndDate ? new Date(projectDetails.piEndDate) : null
  );
  const { id } = useParams();
  const [projectDetail, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRequestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const openRequestDialog = () => {
    setRequestDialogOpen(true);
  };

  const closeRequestDialog = () => {
    setRequestDialogOpen(false);
  };

  const toggleEmployeeDetails = (employee: Employee) => {
    setSelectedEmployee((prevSelectedEmployee) =>
      prevSelectedEmployee && prevSelectedEmployee.name === employee.name ? null : employee
    );
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleAddFilter = (newFilter: Filter) => {
    setFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  const handleCheckboxChange = (id: number, name: string) => {
    const isChecked = checkedResourceIds.includes(id);

    setCheckedResourceIds((prevIds) =>
      isChecked ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
    );

    setCheckedResourceNames((prevNames) =>
      isChecked ? prevNames.filter((prevName) => prevName !== name) : [...prevNames, name]
    );
  };

  const isRequestAllDisabled = checkedResourceIds.length === 0;

  const handleRequestAll = () => {
    openRequestDialog();
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (id) {
          const response = await getProject(parseInt(id));
          setProjectDetails(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
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

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSaveFilter = (filterData: FilterData) => {
    setProposedImpStartDate(filterData.dateFrom ? new Date(filterData.dateFrom) : null);
    setProposedImpEndDate(filterData.dateTo ? new Date(filterData.dateTo) : null);
    console.log('Received Filter Data in ResourceManagerPage:', filterData);
  };

  useEffect(() => {
    const fetchEmployeesData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employees/notAllocatedToProject?projectId=${projectDetails.id}`);
        setEmployeesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        selectedEmployee={selectedEmployee}
        toggleEmployeeDetails={toggleEmployeeDetails}
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
      resources={resourcesAllocated}
      onCheckboxChange={handleCheckboxChange}
      onRequestButtonClick={openRequestDialog}
    />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className={`rounded py-2 px-4 text-xs ${isRequestAllDisabled ? 'bg-gray-400 text-gray-700' : 'bg-violet-500 text-white'}`}
          onClick={handleRequestAll}
          disabled={isRequestAllDisabled}
        >
          Request All
        </button>
      </div>
      {isRequestDialogOpen &&  <RequestDialog isOpen={isRequestDialogOpen} onClose={closeRequestDialog} checkedResourceNames={checkedResourceNames} />}
    </div>
  );
}

export default ResourcesManagerPage;