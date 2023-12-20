import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniDrawer from '../../layout';

interface Project {
  id: string;
  projectName: string;
  impStatusList: string;
  priority: string;
  lessonsLearned: string;
  name: string;
}
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

  const [greeting, setGreeting] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [lessonsLearned, setLessonsLearned] = useState([]);

 const apiEndpoints = {
  ongoing: 'InprogressPropsalNames',
  won: 'PropsalWonNames',
  lost: 'PropsalLossNames',
  inprogress: 'InprogressPropsalNames',
  successful: 'SucessImplenetationNames',
  failed: 'ImplementationFailedNames',
};

type CardId = keyof typeof apiEndpoints;

const handleCardClick = (cardId: CardId) => {
  axios.get(`http://localhost:8000/api/v1/project/${apiEndpoints[cardId]}`)
    .then(response => {
  
      const projects = response.data.data;
      const selectedProjectData = projects.length > 0 ? projects[0] : null;

      setSelectedProject(selectedProjectData);
      setSelectedCard(cardId);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

  useEffect(() => {
    // Fetch data for Proposals' Statuses
    axios.get('http://localhost:8000/api/v1/project/proposalStats')
      .then(response => {
        //console.log('Proposal Stats:', response.data.data);
        setProposalStats(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching proposal data:', error);
      });
  
    // Fetch data for Implementation Statuses
    axios.get('http://localhost:8000/api/v1/project/implementationStats')
      .then(response => {
       // console.log('Implementation Stats:', response.data.data);
        setImplementationStats(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching implementation data:', error);
      });

               // Fetch data for Lessons Learned
    axios.get('http://localhost:8000/api/v1/project/lessonsLearned')
    .then(response => {
      console.log('Lessons Learned:', response.data.data);
      setLessonsLearned(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching lessons learned data:', error);
    });

       // Set greeting based on the time of day
       const currentHour = new Date().getHours();
       if (currentHour >= 0 && currentHour < 12) {
         setGreeting('Good Morning');
       } else if (currentHour >= 12 && currentHour < 18) {
         setGreeting('Good Afternoon');
       } else {
         setGreeting('Good Evening');
       }
       
  }, 
  []);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (selectedCard && !(event.target as HTMLElement).closest('.selected-card')) {
        setSelectedCard(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedCard]);
  
  const DetailedProjectView = () => {
    if (!selectedProject) {
      return null;
    }
  
    return (
      <div className="w-full p-4 mt-4 bg-white rounded-md shadow-md">
        <div className="text-center">
        <h2 className="text-xl font-bold">{selectedProject?.name}</h2>
        <p className="text-sm text-gray-500">Priority: {selectedProject.priority}</p>
       <p className="text-sm text-gray-500">ID: {selectedProject.id}</p>
        </div>
      </div>
    );
  };
return (
  <div className="flex h-screen pb-16">
    <MiniDrawer />
    <div className="flex-1">
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">Heading</h1>
  </div>
  <p className="text-lg ml-4">Proposal Statuses</p>
  <div className="flex flex-wrap">
    {/* Proposal Statuses */}
    <div
      className={`w-1/3 p-2 ${selectedCard === 'ongoing' ? 'bg-slate-200 shadow-lg' : ''}`}
      onClick={() => handleCardClick('ongoing')}
    >
      <div className="bg-slate-500 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">Ongoing </h2>
        <p className="text-lg">{proposalStats.propOnGoingCount}</p>
      </div>
    </div>
    <div
      className={`w-1/3 p-2 ${selectedCard === 'won' ? 'bg-sky-200 shadow-lg' : ''}`}
      onClick={() => handleCardClick('won')}
    >
      <div className="bg-sky-500 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">Won</h2>
        <p className="text-lg">{proposalStats.propWonCount}</p>
      </div>
    </div>
    <div
      className={`w-1/3 p-2 ${selectedCard === 'lost' ? 'bg-zinc-200 shadow-lg' : ''}`}
      onClick={() => handleCardClick('lost')}
    >
      <div className="bg-zinc-500 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">Lost</h2>
        <p className="text-lg">{proposalStats.propLostCount}</p>
      </div>
    </div>
  </div>
  <p className="text-lg ml-4">Implementation Statuses</p>
  <div className="flex flex-wrap">
    {/* Implementation Statuses */}
    <div
      className={`w-1/3 p-2 ${selectedCard === 'inprogress' ? 'bg-slate-200 shadow-lg' : ''}`}
      onClick={() => handleCardClick('inprogress')}
    >
      <div className="bg-slate-500 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">In Progress </h2>
        <p className="text-lg">{implementationStats.implementationInProgress}</p>
      </div>
    </div>
    <div
      className={`w-1/3 p-2 ${selectedCard === 'successful' ? 'bg-sky-200 shadow-lg' : ''}`}
      onClick={() => handleCardClick('successful')}
    >
      <div className="bg-sky-500 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">Successful</h2>
        <p className="text-lg">{implementationStats.implenetaionSucess}</p>
      </div>
    </div>
    <div
      className={`w-1/3 p-2 ${selectedCard === 'failed' ? 'bg-zinc-200 shadow-lg' : ''}`}
      onClick={() => handleCardClick('failed')}
    >
      <div className="bg-zinc-500 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-lg font-bold mb-2">Failed</h2>
        <p className="text-lg">{implementationStats.implementationFailed}</p>
      </div>
    </div>
  </div>
  {/* Render DetailedProjectView conditionally */}
  {selectedCard && (
     <div className="w-full p-4 mt-4 bg-white rounded-md shadow-md selected-card">
        

      <DetailedProjectView />
      </div>
  )}
          <br></br>
         <div className="w-full">
          <div>
            <h1 className="text-lg ml-1">Lesson Learned</h1>
            <div className="bg-white p-6 rounded shadow-md">
                              <ul>
                  {lessonsLearned && lessonsLearned.length > 0 && (
                    (() => {
                      const result = [];
                      for (let index = 0; index < lessonsLearned.length; index++) {
                        result.push(<li key={index}>{lessonsLearned[index]}</li>);
                      }
                      return result;
                    })()
                  )}
                </ul>
            </div>
            </div>
          </div>
</div>
</div>
);
};

export default Dashboard;