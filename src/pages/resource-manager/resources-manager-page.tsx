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




type Filter = {
  column: string;
  operator: string;
  value: string;
};

interface Employee {
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



const resourcesAllocated: Resource[] = [
  {id:1,
    name: "Resource1",
    status: "Active",
    allocatedProjects: [
      { id: 1, name: "A Project " },
      { id: 2, name: "B Project " },
      { id: 3, name: "C Project " },
    ],
    pendingProjects: [
      { id: 3, name: "Project C" },
      { id: 4, name: "Project D" },
      { id: 5, name: "Project B" },
    ],
  },
  {id:2,
    name: "Resource2",
    status: "Inactive",
    allocatedProjects: [
      { id: 5, name: "Project E" },
      { id: 6, name: "Project F" },
    ],
    pendingProjects: [
      { id: 7, name: "Project G" },
      { id: 8, name: "Project H" },
    ],
  },
  // Add more resource entities as needed
];

export function ResourcesManagerPage() {
  const [isRequestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

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


  const openRequestDialog = () => {
    setRequestDialogOpen(true);
  };

  const closeRequestDialog = () => {
    setRequestDialogOpen(false);
  };

  const toggleEmployeeDetails = (employee: Employee) => {
    if (selectedEmployee && selectedEmployee.name === employee.name) {
      // If the same employee is clicked again, hide the details
      setSelectedEmployee(null);
    } else {
      // Show the details of the clicked employee
      setSelectedEmployee(employee);
    }
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleAddFilter = (newFilter: Filter) => {
    setFilters([...filters, newFilter]);
  };

  const [checkedResourceIds, setCheckedResourceIds] = useState<number[]>([]);
  const [checkedResourceNames, setCheckedResourceNames] = useState<string[]>([]);

  const handleCheckboxChange = (id: number, name: string) => {
    // If the resource is already checked, uncheck it
    if (checkedResourceIds.includes(id)) {
      setCheckedResourceIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      setCheckedResourceNames((prevNames) => prevNames.filter((prevName) => prevName !== name));
    } else {
      // If the resource is not checked, check it
      setCheckedResourceIds((prevIds) => [...prevIds, id]);
      setCheckedResourceNames((prevNames) => [...prevNames, name]);
    }
  };

  const isRequestAllDisabled = checkedResourceIds.length === 0;



  const handleRequestAll = () => {
    
    // Use the IDs as needed, for example, redirect to a new page
    openRequestDialog();
  };


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
              
              <SearchFilter/>

            
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
            Date from
            <input
              type="date"
              className="px-1 py-1 ml-2 hover:outline-none pointer-events-none"
            />
          </div>
          <div className="ml-6">
            Date To :
            <input type="date" className="px-1 py-1 ml-2 hover:outline-none " />
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