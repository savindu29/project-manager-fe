import {
  CheckCircleIcon,
  StopCircleIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import SearchFilter from "./Componants/search-filter";

import ResourceSkillSTable from "./Componants/resource-skill-table";

export interface SearchFilterProps {
  projectDetail: any;
  onSaveFilter: (filterData: any) => void;
}

export interface FilterData {
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

export interface Skill {
  specification: string;
  level: string;
}

export interface ResourceSkill {
  id: number;
  name: string;
  skills: Skill[];
}

export function ResourcesManagePage({
  projectDetails,
}: {
  projectDetails: any;
}) {
  const [resourceSkills, setResourceSkills] = useState<ResourceSkill[]>([]);
  const requestBody = {
    specifications: [],
    specificationLevels: [],
  };
  useEffect(() => {
    const fetchEmployeesBySkill = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/employees/employees-by-skill",
          requestBody
        );

        console.log(response.data);

        setResourceSkills(response.data.data);
      } catch (error) {
        console.error("Error fetching employees by skill:", error);
      }
    };

    fetchEmployeesBySkill();
  }, [projectDetails]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);

  const [projectProposedImpStartDate, setProposedImpStartDate] = useState(
    projectDetails?.piStartDate ? new Date(projectDetails.piStartDate) : null
  );
  const [projectProposedImpEndDate, setProposedImpEndDate] = useState(
    projectDetails?.piEndDate ? new Date(projectDetails.piEndDate) : null
  );

  const { id } = useParams();
  const [projectDetail, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleSaveFilter = (filterData: FilterData) => {};

  return (
    <div className="px-12 mb-12">
      <div className="h-20 w-full flex items-center ">
        <div className="w-1/2">
          <p className="text-xl font-semibold">Resources</p>
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
              <SearchFilter
                projectDetail={projectDetail}
                onSaveFilter={handleSaveFilter}
              />

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

      <div className='justify-end fixed z-10 shadow left mt-1.5'>
            <Link to="">
              <div className="bg-black  text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                Add new Employee
              </div>
            </Link>
          </div>
      
      <div className="mt-14  ">
        <div className="">
          <ResourceSkillSTable resourceSkills={resourceSkills}  />
        </div>
      </div>
    </div>
  );
}
