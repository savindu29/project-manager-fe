import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Resource } from "./potential-resource-table";
import ResourceDetailsPane from "./selected-resource-details-table";
import EditableTable from "./send-request-box";

interface RequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  checkedResources: { [key: number]: boolean };
  resources: Resource[];
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  isOpen,
  onClose,
  checkedResources,
  resources,
}) => {
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);

  const handleResourceClick = (resourceId: number) => {
    setSelectedResourceId(resourceId);
  };

  return (
    <div className={`fixed ${isOpen ? "block" : "hidden"} top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-end items-center py-6 pl-20 pr-4 z-50`}>
      <div className="bg-white p-6 rounded-md h-full w-5/6 relative overflow-y-scroll">
        <div className="rounded-t-lg text-black text-2xl py-2 px-4">
          Current project details
        </div>
        <button onClick={onClose} className="rounded py-1 px-3 absolute right-4 top-4">
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="flex mt-6">
          {/* Left Column (1/3 of the window) */}
          <div className="w-1/4 h-full overflow-y-auto">
            {Object.keys(checkedResources).map((resourceId, index) => (
              <div
                key={index}
                className={`border-b pb-1 text-sm pt-2 cursor-pointer ${parseInt(resourceId, 10) === selectedResourceId ? 'text-black' : 'text-zinc-500'}`}
                onClick={() => handleResourceClick(parseInt(resourceId, 10))}
              >
                {`ID: ${resourceId}, Name: ${resources.find(resource => resource.id === parseInt(resourceId, 10))?.name || 'N/A'}`}
              </div>
            ))}
          </div>

          {/* Right Details Pane (2/3 of the window) */}
          <div className="w-3/4 h-full bg-white px-6 rounded-md ml-4  ">
            {selectedResourceId !== null && (
              <ResourceDetailsPane resourceId={selectedResourceId} />
            )}

            <EditableTable allocateDate={"2023/12/31"} releaseDate={"2024/03/29"} employeeId={0} editable={true}/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDialog;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ResourceDetailsPane from './selected-resource-details-table'; 
// import EditableTable from './send-request-box'; 

// interface ProjectAllocation {
//   fromDate: string;
//   toDate: string;
//   project: string;
//   approved: boolean;
// }

// interface Resource {
//   name: string;
//   status: string;
//   allocatedProjects: ProjectAllocation[];
//   pendingProjects: ProjectAllocation[];
// }

// interface AllocationDetails {
//   allocatedDate: Date;
//   releaseDate: Date;
//   contributionPercentage: number;
// }

// interface DetailedResource extends Resource {
//   resourceId: number; // Add this line to include resourceId property
//   details: AllocationDetails[];
// }


// interface EditableDataItem {
//   allocateDate: string;
//   releaseDate: string;
//   percentage: number;
//   editable: boolean;
// }

// interface RequestDialogProps {
//   onClose: () => void;
//   isOpen: boolean;
//   checkedResourceNames: string[];
// }


// const RequestDialog: React.FC<RequestDialogProps> = ({ isOpen, onClose, checkedResourceNames }) => {
//   const [selectedResource, setSelectedResource] = useState<DetailedResource | null>(null);

//   const [editableData, setEditableData] = useState<EditableDataItem[]>([
//     { allocateDate: '', releaseDate: '', percentage: 50, editable: false },
    
//   ]);

//   useEffect(() => {
//     // Fetch resource details and set selected resource
//     // Use your actual API endpoint and logic here
//     const fetchResourceDetails = async () => {
//       try {
//         // Fetch resource details based on the first checked resource name
//         const response = await axios.get<DetailedResource>(
//           `http://localhost:8000/api/v1/project/resources-projects/${checkedResourceNames[0]}`
//         );
//         setSelectedResource(response.data);
//       } catch (error) {
//         console.error('Error fetching resource details:', error);
//       }
//     };

//     fetchResourceDetails();
//   }, [checkedResourceNames]);

//   return (
//     <div className={`flex ${isOpen ? 'block' : 'hidden'} h-full`}>
//       {/* Left Column (1/3 of the window) */}
//       <div className="w-1/3 p-4 bg-gray-200">
//         {/* Render resources based on checked resource names */}
//         {checkedResourceNames.map((resourceName) => (
//           <div key={resourceName} onClick={() => setSelectedResource(null)}>
//             {resourceName}
//           </div>
//         ))}
//       </div>

//       {/* Right Details Pane (2/3 of the window) */}
//       <div className="w-2/3 p-4 bg-gray-300">
//         {/* Check if a resource is selected */}
//         {selectedResource && (
//           <>
//             {/* Render ResourceDetailsPane */}
//            {/* Render ResourceDetailsPane */}
//            <ResourceDetailsPane resourceId={selectedResource.resourceId} />

//            {/* Editable Table */}
// <EditableTable
//               editableData={editableData}
//               setEditableData={setEditableData} headers={[]}/>
//   </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RequestDialog;
