import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface RequestDialogProps {
  onClose: () => void;
  isOpen: boolean;
  checkedResourceNames: string[];
}

interface Project {
  id: number;
  name: string;
}

interface Resource {
  name: string;
  status: string;
  allocatedProjects: Project[];
  pendingProjects: Project[];
}

const resourcesAllocated: Resource[] = [
  {
    name: "Resource1",
    status: "Active",
    allocatedProjects: [
      { id: 1, name: "A Project " },
      { id: 2, name: "B Project " },
      { id: 3, name: "C Project " },
    ],
    pendingProjects: [
      { id: 3, name: "Project C" },
      { id: 4, name: "Project D" },
      { id: 5, name: "Project B" },
    ],
  },
  {
    name: "Resource2",
    status: "Inactive",
    allocatedProjects: [
      { id: 5, name: "Project E" },
      { id: 6, name: "Project F" },
    ],
    pendingProjects: [
      { id: 7, name: "Project G" },
      { id: 8, name: "Project H" },
    ],
  },
];
interface AllocationDetails {
  allocatedDate: Date;
  releaseDate: Date;
  contributionPercentage: number;
}

interface DetailedResource extends Resource {
  details: AllocationDetails[];
}

const calculateContributionPercentage = (): number => {
  // This is just a placeholder, you should replace it with your actual calculation logic
  return Math.random() * 100;
};

const getResourcesWithDetails = (resources: Resource[]): DetailedResource[] => {
  return resources.map((resource) => {
    const details: AllocationDetails[] = resource.allocatedProjects.map((project) => {
      return {
        allocatedDate: new Date(), // Replace with the actual allocated date
        releaseDate: new Date(), // Replace with the actual release date
        contributionPercentage: calculateContributionPercentage(),
      };
    });

    return {
      ...resource,
      details,
    };
  });
};
type EditableDataItem = {
  project: string;
  allocateDate: string;
  releaseDate: string;
  percentage: string;
  editable: boolean;
  [key: string]: string | boolean;
};

const detailedResources: DetailedResource[] = getResourcesWithDetails(resourcesAllocated);

// Now you can access the details for each resource
detailedResources.forEach((resource) => {
  console.log(`Resource: ${resource.name}`);
  resource.details.forEach((detail, index) => {
    console.log(`  Project ${index + 1}:`);
    console.log(`    Allocated Date: ${detail.allocatedDate}`);
    console.log(`    Release Date: ${detail.releaseDate}`);
    console.log(`    Contribution Percentage: ${detail.contributionPercentage}%`);
  });
  console.log();
});


const RequestDialog: React.FC<RequestDialogProps> = ({ isOpen, onClose, checkedResourceNames }) => {
  const [selectedResource, setSelectedResource] = useState<DetailedResource | null>(null);

  // Filter resources based on checked resource names
  const filteredResources = resourcesAllocated.filter((resource) =>
    checkedResourceNames.includes(resource.name)
  );

    // State variables with useState
    const [editableData, setEditableData] = useState<EditableDataItem[]>([
      { project: '', allocateDate: '', releaseDate: '', percentage: '', editable: false },
    ]);
  const onResourceClick = (resource: Resource) => {
    setSelectedResource(getResourcesWithDetails([resource])[0]);
  };
  
  const handleInputChange = (index: number, field: string, value: string) => {
    const newData = [...editableData];
    newData[index][field] = value;
    setEditableData(newData);
  };
  
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newData = [...editableData];
    newData[index].editable = checked;
    setEditableData(newData);
  };
const getResourcesWithDetails = (resources: Resource[]): DetailedResource[] => {
  return resources.map((resource) => {
    const details: AllocationDetails[] = resource.allocatedProjects.map((project) => {
      // Generate sample dates
      const allocatedDate = new Date(); // Replace with the actual allocated date
      const releaseDate = new Date(); // Replace with the actual release date

      // Generate a random contribution percentage between 0 and 100
      const contributionPercentage = Math.random() * 100;

      return {
        allocatedDate,
        releaseDate,
        contributionPercentage,
      };
    });

    return {
      ...resource,
      details,
    };
  });
};

const detailedResources: DetailedResource[] = getResourcesWithDetails(resourcesAllocated);

  return (
    <div className={`fixed ${isOpen ? 'block' : 'hidden'} top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-end items-center py-10 pl-20 pr-4 z-50`}>
      <div className="bg-white p-6 rounded-md h-full w-5/6 relative">
        <button
          onClick={onClose}
          className="rounded py-1 px-3 absolute right-4 top-4"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="flex">
          {/* Left Column (1/3 of the window) */}
          <div className="w-1/3 h-full overflow-y-auto">
          <div className="rounded-t-lg text-black text-2xl font-semibold py-2 px-4 mb-4"> 
Current project detilas 
  </div>
  {filteredResources.map((resource) => (
    <div
      key={resource.name}
      className="h-24 w-full flex items-center cursor-pointer bg-zinc-200 hover:bg-zinc-300 p-4 mb-2 rounded-md"
      onClick={() => onResourceClick(resource)}
    >
      <span className="text-lg font-semibold">{resource.name}</span>
    </div>
  ))}
</div>


  {/* Right Details Pane (2/3 of the window) */}
  <div className="w-2/3 h-full bg-white p-6 rounded-md ml-4 mt-8"> 
      <button onClick={onClose} className="rounded py-1 px-3 absolute right-4 top-4">
        <XMarkIcon className="h-6 w-6" />
      </button>
      {selectedResource && (
        <>
          <h2 className="text-lg font-semibold mb-4">
            {selectedResource
              ? ` ${selectedResource.name}'s Details`
              : 'Resource Name'}
          </h2>
          <table className="min-w-full table-auto">
  <thead className="">
    <tr className="text-zinc-400 font-normal text-left">
      <th className="p-2 font-normal text-sm">Project</th>
      <th className="p-2 font-normal text-sm">Allocated Date</th>
      <th className="p-2 font-normal text-sm">Release Date</th>
      <th className="p-2 font-normal text-sm">Status</th>
      <th className="p-2 font-normal text-sm">Percentage</th>
    </tr>
  </thead>
  <tbody className="border-y border-gray-300 text-sm">
    {selectedResource && selectedResource.details.map((detail, projectIndex) => (
      <tr key={projectIndex}>
        <td className="border-b p-2 font-semibold">{selectedResource.allocatedProjects[projectIndex]?.name}</td>
        <td className="border-b p-2">{detail.allocatedDate.toLocaleDateString()}</td>
        <td className="border-b p-2">{detail.releaseDate.toLocaleDateString()}</td>
        <td className="border-b p-2">{selectedResource.status}</td>
        <td className="border-b p-2">{detail.contributionPercentage.toFixed(2)}%</td>
      </tr>
    ))}
  </tbody>
</table>
<br></br>

  {/*  Editable Table */}
<table className="min-w-full table-auto">
  <thead className="">
  <tr className="text-zinc-400 font-normal text-left my-0 py-1">
      <th className="p-2 font-normal text-sm">Project</th>
      <th className="p-2 font-normal text-sm">Allocate Date</th>
      <th className="p-2 font-normal text-sm">Release Date</th>
      <th className="p-2 font-normal text-sm">Percentage</th>
      <th className="p-2 font-normal text-sm">Select</th>
    </tr>
  </thead>
  <tbody className="border-y border-gray-300 text-sm">
    {/* Render editable rows */}
    {editableData.map((data, index) => (
      <tr key={index}>
        <td className="border-b p-2 font-semibold">
          <input
            type="text"
            style={{ width: '102px' }} 
            value={data.project}
            onChange={(e) => handleInputChange(index, 'project', e.target.value)}
          />
        </td>
        <td className="border-b p-0.5 font-semibold">
          <input
            type="date"
            style={{ width: '176px' }}
            value={data.allocateDate}
            onChange={(e) => handleInputChange(index, 'allocateDate', e.target.value)}
          />
        </td>
        <td className="border-b p-2 font-semibold">
          <input
            type="date"
            style={{ width: '176px' }}
            value={data.releaseDate}
            onChange={(e) => handleInputChange(index, 'releaseDate', e.target.value)}
          />
        </td>
        <td className="border-b p-2 font-semibold">
          <input
            type="number"
            style={{ width: '130px' }}
            value={data.percentage}
            onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
          />
        </td>
        <td className="border-b p-2 font-semibold">
          <input
            type="checkbox"
            checked={data.editable}
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>
<div className="mt-4 flex flex-col"> 
  <label htmlFor="role" className="block text-sm font-normal text-zinc-400">Role:</label>
  <select
    id="role"
    className="w-64 p-2 border border-gray-300 rounded-md"
 
  >
    {/* Add options for roles */}
    <option value="role1">Role 1</option>
    <option value="role2">Role 2</option>
    
  </select>

  <label htmlFor="note" className="block mt-4 text-sm font-normal text-zinc-400">Note:</label>
<div className="flex items-end"> 
  <div className="flex-grow pr-2">
    <textarea
      id="note"
      className="w-full p-2 border border-gray-300 rounded-md"
      // Add onChange or value props 
    />
  </div>

  <div className="flex-none ml-4 mb-2"> 
    <button
      className="p-2 px-3 bg-blue-500 text-white rounded-md text-sm" 
      //   onClick={handleSendRequest} // Add the function to handle the button click
    >
      Send Request
    </button>
  </div>
</div>

</div>
    </>
  )}
</div>

        </div>
      </div>
    </div>
 );
};

export default RequestDialog;
