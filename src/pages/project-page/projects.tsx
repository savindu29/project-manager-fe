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

// Add import for spinner
import { CircularProgress } from "@mui/material";

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
  const [searchText, setSearchText] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectId, setProjectId] = useState<number>(0);
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const [dataCount, setDatacount] = useState<number>(0);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchProjects = async () => {
    try {
      const params: getProjectsOptions = {
        searchtext: searchText,
        page,
        size: pageSize,
      };

      const response = await getAllProjects(params);

      if (response && response.data) {
        setProjects(response.data.data);
        setDatacount(response.data.count);


        // If there are projects and no project is currently selected, select the first one
        if (response.data.data.length > 0 && !selectedProject) {
          handleCardClick(response.data.data[0]);
        }

        if (response.data.data.length > 0) {
          const firstProject = response.data.data[0];
          setSelectedProject(firstProject);
          setProjectId(firstProject.id);
        }
       

      } else {
        setDatacount(0);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching projects
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [searchText, page, pageSize]);

  const handleCardClick = (project: Project) => {
    setLoading(true);

    setTimeout(() => {
      setSelectedProject(project);
      setProjectId(project.id);
      setLoading(false);
    }, 300); // 0.5-second delay
  };

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <div className="flex">
      <MiniDrawer />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-96 h-screen">
          <div className="">
            <div className="pl-5 pr-6 py-6 flex items-center justify-center">
              <form
                className="flex items-center w-full drop-shadow-lg"
                onSubmit={handleFormSubmit}
              >
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-700" 
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-white border text-gray-900 text-sm rounded-lg block w-full pl-10 py-2.5 placeholder-gray-400 focus:outline-none focus:border-blue-300"
                    placeholder="Search Project ..."
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="h-auto">
            <div className="w-[22rem]">
              <div className="mx-8 text-xs text-sky-500 underline hover:cursor-pointer">
                {dataCount} Results
              </div>
              <div className="flex justify-center">
                <div className="overflow-hidden">
                  {dataCount > 0 ? (
                    projects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        cardDetails={project}
                        onCardClick={handleCardClick}
                      />
                    ))
                  ) : (
                    <p>Loading ...</p>
                  )}
                </div>
              </div>

              <div className="h-16 flex items-center justify-center absolute bottom-0 w-96">
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
          <div className="w-full flex justify-end items-end mt-2 px-12">
            {selectedProject && (
              <Link to={`/projects/update/${selectedProject.id}`}>
                <div className="text-semibold text-xs border px-4 py-2 rounded mr-4 hover:cursor-pointer">
                  Update this Project
                </div>
              </Link>
            )}
            <Link to="/projects/new">
              <div className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                Add New Project
              </div>
            </Link>
          </div>
          {loading ? (
            // Display a spinner while loading
            <div className="flex items-center justify-center h-full">
              <BlankPage/>
            </div>
          ) : selectedProject ? (
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
