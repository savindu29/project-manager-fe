
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniDrawer from '../../layout';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {APP_API_BASE_URL} from '../../apis/index'
interface Project {
  impStatusList: string;
  priority: string;
  lessonsLearned: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_API_BASE_URL}/api/v1/project/list`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData();
  }, []);

  const totalOngoingProjects = projects.filter(project => project.impStatusList === 'status"').length;
  const totalCompletedProjects = projects.filter(project => project.impStatusList === 'completed').length;
  const totalFailedProjects = projects.filter(project => project.impStatusList  === 'failed').length;
 // Extracting project priority data
 const priorityCounts: Record<string, number> = {};
 projects.forEach(project => {
   priorityCounts[project.priority] = (priorityCounts[project.priority] || 0) + 1;
 });

 // Data format for recharts
 const chartData = Object.keys(priorityCounts).map(key => ({
   name: key,
   value: priorityCounts[key],
 }));

 const COLORS = ['#FF6384', '#36A2EB', '#FFCE56']; // You can customize the colors

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

      <div className="ml-4"><br></br>
      <p className="text-lg ml-4">Project Progress</p>
        <PieChart width={400} height={400}>
          <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8" dataKey={''}          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
                  {/* Lessons Learned */}
          <div>
            <p className="text-lg mb-2">Lessons Learned</p>
            <ul>
              {projects.map((project, index) => (
                <li key={index}>{project.lessonsLearned}</li>
              ))}
            </ul>
          </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
