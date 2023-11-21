import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MiniDrawer from '../../../layout';
import UpdateProjectForm from './update-form';
import { getProject } from '../../../apis/project-api';

const UpdateProject = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Check if projectId is defined before making the API call
        if (projectId) {
          const response = await getProject(parseInt(projectId));
          setProjectDetails(response.data);
          console.log(response.data)
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [projectId]);

  return (
    <div>
      <div className='flex'>
        <MiniDrawer />
        <div className='px-12 py-2 w-full '>
          <div className='justify-end fixed z-10 shadow right-8'>
            <Link to="/projects">
              <div className="bg-sky-400 text-semibold  text-white px-4 py-2 rounded hover:cursor-pointer">
                Go Back
              </div>
            </Link>
          </div>
          <UpdateProjectForm projectDetails ={projectDetails}/>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
