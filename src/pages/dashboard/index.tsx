// Dashboard.js
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
        setProposalStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching proposal data:', error);
      });

    // Fetch data for Implementation Statuses
    axios.get('http://localhost:8000/api/v1/project/ImplementationStats')
      .then(response => {
        setImplementationStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching implementation data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
        <MiniDrawer />
      <div className="flex flex-wrap justify-between">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-2">Welcome to Dashboard</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Proposals' Statuses</h2>
            <div className="grid grid-cols-2 gap-2">
              {/* Card for Ongoing Proposals */}
              <div className="bg-blue-200 p-2 rounded">
                <h3 className="text-md font-bold mb-1">Ongoing</h3>
                <p className="text-lg">{proposalStats.propOnGoingCount}</p>
              </div>
  
              {/* Card for Lost Proposals */}
              <div className="bg-red-200 p-2 rounded">
                <h3 className="text-md font-bold mb-1">Lost</h3>
                <p className="text-lg">{proposalStats.propLostCount}</p>
              </div>
  
              {/* Card for Won Proposals */}
              <div className="bg-green-200 p-2 rounded">
                <h3 className="text-md font-bold mb-1">Won</h3>
                <p className="text-lg">{proposalStats.propWonCount}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-2 text-white">ss</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Implementation Statuses</h2>
            <div className="grid grid-cols-2 gap-2">
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
  
              {/* Card for Implementations In Progress */}
              <div className="bg-yellow-200 p-2 rounded">
                <h3 className="text-md font-bold mb-1">In Progress</h3>
                <p className="text-lg">{implementationStats.implementationInProgress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
