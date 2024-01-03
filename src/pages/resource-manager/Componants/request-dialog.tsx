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
interface EditableDataItem {
  project: string;
  allocateDate: string;
  releaseDate: string;
  percentage: number; // Change the type to number
  editable: boolean;
  [key: string]: string | boolean | number;
}


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
      { project: '', allocateDate: '', releaseDate: '', percentage: 50, editable: false },
    ]);
  const onResourceClick = (resource: Resource) => {
    setSelectedResource(getResourcesWithDetails([resource])[0]);
  };
  
  const handleInputChange = (index: number, field: string, value: string|number) => {
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
    <div className={`fixed ${isOpen ? 'block' : 'hidden'} top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-end items-center py-6 pl-20 pr-4 z-50`}>
      
      <div className="bg-white p-6 rounded-md h-full w-5/6 relative overflow-y-scroll">
      <div className="rounded-t-lg text-black text-2xl  py-2 px-4"> 
Current project detilas 
  </div>
        <button
          onClick={onClose}
          className="rounded py-1 px-3 absolute right-4 top-4"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="flex mt-6">
          {/* Left Column (1/3 of the window) */}
          <div className="w-1/4 h-full overflow-y-auto">
          
  {filteredResources.map((resource) => (
    <div
      key={resource.name}
      className="border-b pb-1 text-sm pt-2 cursor-pointer"
      onClick={() => onResourceClick(resource)}
    >
      <span className="">{resource.name}</span>
    </div>
  ))}
</div>


  {/* Right Details Pane (2/3 of the window) */}
  
 
  <div className="w-3/4 h-full bg-white px-6 rounded-md ml-4  "> 
     <div>
     {selectedResource
              ? ` ${selectedResource.name}`
              : ''}
     </div>
      {selectedResource && (
        <>
        <div className="mb-6 mt-4 ">
          <div className=" mb-2 text-xs py-1 px-2 bg-green-600 text-white rounded w-56 text-center">
            {selectedResource
              ? `Existing Project Allocations`
              : ''}
          </div>
          <table className="min-w-full table-auto ">
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
        <td className="border-b p-2 ">{selectedResource.allocatedProjects[projectIndex]?.name}</td>
        <td className="border-b p-2">{detail.allocatedDate.toLocaleDateString()}</td>
        <td className="border-b p-2">{detail.releaseDate.toLocaleDateString()}</td>
        <td className="border-b p-2">{selectedResource.status}</td>
        <td className="border-b p-2">{detail.contributionPercentage.toFixed(2)}%</td>
      </tr>
    ))}
  </tbody>
</table>

</div>

  {/*  Editable Table */}
  <div className="  mb-2 text-xs py-1 px-2 bg-purple-600 text-white rounded w-56 text-center">
            {selectedResource
              ? ` Request To Current Project  `
              : ''}
          </div>
<table className="min-w-full table-auto">
  <thead className="">
  <tr className="text-zinc-400 font-normal text-left my-0 py-1">
      
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
        
        <td className="border-b p-0.5 ">
          <input
          className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300 "
            type="date"
            style={{ width: '176px' }}
            value={data.allocateDate}
            onChange={(e) => handleInputChange(index, 'allocateDate', e.target.value)}
          />
        </td>
        <td className="border-b p-2 ">
          <input
          className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300 "
            type="date"
            style={{ width: '176px' }}
            value={data.releaseDate}
            onChange={(e) => handleInputChange(index, 'releaseDate', e.target.value)}
          />
        </td>
        <td className="border-b p-2 ">
        <input
  className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300"
  type="number"
  placeholder="Request %"
  style={{ width: '130px' }}
  value={Math.min(100, Math.max(0, data.percentage))}
  onChange={(e) => handleInputChange(index, 'percentage', Math.min(100, Math.max(0, Number(e.target.value))))}


/>

        </td>
        <td className="border-b p-2  ">
        <input
  className="ml-6"
  type="checkbox"
  checked={data.editable}
  
  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
  style={{ transform: "scale(1.5)" }}
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
    className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300 w-1/2"
 
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
      className="p-2 text-xs px-3 bg-purple-600 text-white rounded-md " 
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
