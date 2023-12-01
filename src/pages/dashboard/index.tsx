import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniDrawer from '../../layout';

const Dashboard = () => {
  const [proposalStats, setProposalStats] = useState({
    propOnGoingCount: 0,
    propLostCount: 0,
    propWonCount: 0,
  });

  const [implementationStats, setImplementationStats] = useState({
    implenetaionSucess: 0,
    implementationFailed: 0,
    implementationInProgress: 0,
  });

  useEffect(() => {
    // Fetch data for Proposals' Statuses
    axios.get('http://localhost:8000/api/v1/project/proposalStats')
      .then(response => {
        console.log('Proposal Stats:', response.data.data);
        setProposalStats(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching proposal data:', error);
      });
  
    // Fetch data for Implementation Statuses
    axios.get('http://localhost:8000/api/v1/project/implementationStats')
      .then(response => {
        console.log('Implementation Stats:', response.data.data);
        setImplementationStats(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching implementation data:', error);
      });
  }, []);
  
//      <MiniDrawer />
return (
  <div className="container mx-auto mt-8">
 
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="w-full">
          {/* Proposal Status */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to Dashboard</h1>
            <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-2">Proposal Statuses</h1>
              <div className="grid grid-cols-2 gap-2">
                {/* Card for Ongoing Proposals */}
                <div className="bg-blue-200 p-2 rounded">
                  <h3 className="text-md font-bold mb-1">Ongoing</h3>
                  <p className="text-lg">{proposalStats.propOnGoingCount}</p>
                </div>
  
                {/* Card for Won Proposals */}
                <div className="bg-green-200 p-2 rounded">
                  <h3 className="text-md font-bold mb-1">Won</h3>
                  <p className="text-lg">{proposalStats.propWonCount}</p>
                </div>
  
                {/* Card for Lost Proposals */}
                <div className="bg-red-200 p-2 rounded">
                  <h3 className="text-md font-bold mb-1">Lost</h3>
                  <p className="text-lg">{proposalStats.propLostCount}</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Implementation Status */}
          <div>
            <h1 className="text-2xl font-bold mb-2">Implementation Statuses</h1>
            <div className="bg-white p-6 rounded shadow-md">
              <div className="grid grid-cols-2 gap-2">
                {/* Card for Implementations In Progress */}
                <div className="bg-yellow-200 p-2 rounded">
                  <h3 className="text-md font-bold mb-1">In Progress</h3>
                  <p className="text-lg">{implementationStats.implementationInProgress}</p>
                </div>
  
                {/* Card for Successful Implementations */}
                <div className="bg-green-200 p-2 rounded">
                  <h3 className="text-md font-bold mb-1">Successful</h3>
                  <p className="text-lg">{implementationStats.implenetaionSucess}</p>
                </div>
  
                {/* Card for Failed Implementations */}
                <div className="bg-red-200 p-2 rounded">
                  <h3 className="text-md font-bold mb-1">Failed</h3>
                  <p className="text-lg">{implementationStats.implementationFailed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Column */}
        <div className="w-full">
          {/* To-Do Tasks */}
          <div>
          <h1 className="text-2xl font-bold mb-2">Lesson Learned</h1>
            <div className="bg-white p-6 rounded shadow-md">
              {/* Add your beautiful rendering of to-do tasks here */}
            </div>
          </div>
        </div>
      </div>

  </div>
);

  
};

export default Dashboard;


