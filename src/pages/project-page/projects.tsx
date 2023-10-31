import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import ProjectCard from "../../components/project-card";
import { getAllProjects} from "../../apis/project-api";
import { getProjectsOptions } from "../../apis";
import CustomizedInputBase from "../../components/search";
import ProjectDetail from "../../components/project-detail";
import MiniDrawer from "../../layout";
import BlankPage from "../../components/black-page";

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
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Specify the initial state as null
  const [projectId, setProjectId] = useState<number>(0); // Specify the initial state as null
  const [page, setPage] = useState(1); // Initialize the active page
  const pageSize = 3; // Specify the fixed page size
  const [dataCount,setDatacount] = useState<number>(0) ;
  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params: getProjectsOptions = {
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
  }, [page]); // Listen to page changes


  const handleCardClick = (project: Project) => {
   
    setSelectedProject(project);
    setProjectId(project.id)
    
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage); // Update the active page when the page changes
  };
  return (
    <div className="flex ">
      <MiniDrawer />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-96 h-screen ">
          <div>
            <div className="pl-5 pr-10 py-6   flex items-center justify-center">
              <CustomizedInputBase />
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

        <div className="w-full h-full">
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
