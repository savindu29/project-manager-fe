import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Resource } from "./potential-resource-table";

interface RequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  checkedResources: Resource[];
}

const RequestDialog: React.FC<RequestDialogProps> = ({
  isOpen,
  onClose,
  checkedResources,
}) => {
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
          <div className="w-1/4 p-4">
            <div className="text-lg font-bold mb-4">Selected Resources:</div>
            <ul>
              {checkedResources.map((resource, index) => (
                <li key={index}>{resource.name}</li>
              ))}
            </ul>
          </div>
          {/* Right Details Pane (2/3 of the window) */}
          
        </div>
      </div>
    </div>
  );
};

export default RequestDialog;
