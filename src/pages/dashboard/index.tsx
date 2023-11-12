// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniDrawer from '../../layout';
import { Pie } from 'react-chartjs-3'; // Update the import

interface Project {
  status: string;
  proposalStatus:string;
  priority: string;

}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/project/list');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalOngoingProjects = projects.filter(project => project.status === 'ongoing').length;
  const totalCompletedProjects = projects.filter(project => project.status === 'completed').length;
  const totalFailedProjects = projects.filter(project => project.status === 'failed').length;

  // Assuming you have a 'proposalStatus' field in your API response
  const totalPendingProposals = projects.filter(proposal => proposal.proposalStatus === 'pending').length;
  const totalAcceptedProposals = projects.filter(proposal => proposal.proposalStatus === 'accepted').length;
  const totalRejectedProposals = projects.filter(proposal => proposal.proposalStatus === 'rejected').length;

    // Calculate priorities count
    const prioritiesCount = projects.reduce((acc, project) => {
      acc[project.priority] = (acc[project.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
    // Convert priorities count to Chart.js data format
    const pieChartData = {
      labels: Object.keys(prioritiesCount),
      datasets: [
        {
          data: Object.values(prioritiesCount),
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 205, 86, 0.6)'],
          hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(255, 205, 86, 0.8)'],
        },
      ],
    };

  return (
    <div className="flex h-screen pb-16">
      <MiniDrawer />

      <div className="flex-1">
        <div className="p-4">
          <h2 className="text-3xl font-bold">Welcome to Project Dashboard</h2>
        </div>
        <p className="text-lg ml-4">Project Progress</p>
        <div className="flex flex-wrap">
          {/* Project Progress Cards */}
          <div className="w-1/3 p-2">
            <div className="bg-slate-500 p-4 rounded-lg shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Ongoing Projects</h2>
              <p className="text-xl">{totalOngoingProjects}</p>
            </div>
          </div>

          <div className="w-1/3 p-2">
            <div className="bg-sky-500 p-4 rounded-lg shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Completed Projects</h2>
              <p className="text-xl">{totalCompletedProjects}</p>
            </div>
          </div>

          <div className="w-1/3 p-2">
            <div className="bg-zinc-500 p-4 rounded-lg shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Failed Projects</h2>
              <p className="text-xl">{totalFailedProjects}</p>
            </div>
          </div>

          {/* <div className="flex flex-wrap">
                <p className="text-lg">Proposal Progress</p>
          <div className="w-1/3 p-2">
            <div className="bg-slate-500 p-4 rounded-lg shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Ongoing Proposals</h2>
              <p className="text-xl">{totalPendingProposals}</p>
            </div>
          </div>

          <div className="w-1/3 p-2">
            <div className="bg-sky-500 p-4 rounded-lg shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Accepted Proposals</h2>
              <p className="text-xl">{totalAcceptedProposals}</p>
            </div>
          </div>

          <div className="w-1/3 p-2">
            <div className="bg-zinc-500 p-4 rounded-lg shadow-lg text-white">
              <h2 className="text-lg font-bold mb-2">Rejected Proposals</h2>
              <p className="text-xl">{totalRejectedProposals}</p>
            </div>
          </div>
        </div> */}

                {/* Pie Chart */}
                <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Projects' Priorities</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
