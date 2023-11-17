import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import ProjectCard from "../../components/project-card";
import { getAllProjects } from "../../apis/project-api";
import { getProjectsOptions } from "../../apis";
import CustomizedInputBase from "../../components/search";
import ProjectDetail from "./project-details";
import MiniDrawer from "../../layout";
import BlankPage from "../../components/black-page";
import { Link } from "react-router-dom";

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

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Specify the initial state as null
  const [projectId, setProjectId] = useState<number>(0); // Specify the initial state as null
  const [page, setPage] = useState(1); // Initialize the active page
  const pageSize = 3; // Specify the fixed page size
  const [dataCount, setDatacount] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params: getProjectsOptions = {
          searchtext: searchText,
          page,
          size: pageSize,
        };

        const response = await getAllProjects(params);
        console.log(response.data);
        setProjects(response.data.data);
        setDatacount(response.data.count);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [searchText, page, pageSize]); // Listen to page changes

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setProjectId(project.id);
  };
  const handleSearchChange = (event:any) => {
    setSearchText(event.target.value);
  };
  const handleFormSubmit = (event:any) => {
    event.preventDefault();
    // You can perform additional actions on form submission if needed
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage); // Update the active page when the page changes
  };
  return (
    <div className="flex ">
      <MiniDrawer />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-96 h-screen ">
          <div>
            <div className="pl-5 pr-10 py-6   flex items-center justify-center">
              <form className="flex items-center w-full" onSubmit={handleFormSubmit}>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="2.18"
                        ry="2.18"
                      />
                      <line x1="12" y1="2" x2="12" y2="22" />
                      <path d="M12 2v20" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-white border  text-gray-900 text-sm rounded-lg   block w-full pl-10 py-2.5 placeholder-gray-400 focus:outline-none  focus:border-blue-300"
                    placeholder="Search Project ..."
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border  hover:bg-blue-600  focus:outline-none "
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>

          <div className="h-auto ">
            <div className="w-96">
              <div className="mx-8 text-xs text-sky-500 underline hover:cursor-pointer">
                {dataCount} Results
              </div>

              <div className="overflow-hidden">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    cardDetails={project}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
              <div className="h-16 flex items-center justify-center absolute bottom-2 w-96">
                <Pagination
                  count={Math.ceil(dataCount / pageSize)}
                  page={page}
                  color="primary"
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full overflow-hidden">
          <div className=" w-full flex  justify-end items-end mt-2 px-12">
            {selectedProject && (
              <Link to={`/projects/update/${selectedProject.id}`}>
                <div className="text-semibold text-xs border px-4 py-2 rounded mr-4 hover:cursor-pointer">
                  Update this Project
                </div>
              </Link>
            )}
            <Link to="/projects/create-new">
              <div className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                Add new Project
              </div>
            </Link>
          </div>
          {selectedProject ? (
            <ProjectDetail projectId={selectedProject.id} />
          ) : (
            <BlankPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
