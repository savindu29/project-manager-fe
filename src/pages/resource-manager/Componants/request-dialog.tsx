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
  dateFrom:Date |null;
  dateTo:Date | null;
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  isOpen,
  onClose,
  checkedResources,
  dateFrom,
  dateTo,
  resources,
}) => {





  function formatDate(date: Date|null): string {
    if(date !== null){
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
    }else{
      return "";
    }
  }




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
              <div>
              <ResourceDetailsPane resourceId={selectedResourceId} />
              <EditableTable allocateDate={formatDate(dateFrom)} releaseDate={formatDate(dateTo)} employeeId={1} editable={true}/>
              </div>
            )}

           

          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDialog;