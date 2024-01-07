import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ResourceDetailsPane from "./resource-details";

interface EmployeeDetailsProps {
  employeeId: number;
  onClose: () => void;
}

const EmployeeDetailsPopup: React.FC<EmployeeDetailsProps> = ({
  employeeId,
  onClose,
}) => {
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} className="fixed inset-0 h-screen w-screen flex items-center justify-end z-50">
    <div className=" flex items-center justify-end mr-20 ">
      <div className="bg-white shadow-lg p-4 w-[60rem] h-[40rem] relative">
        <button
          onClick={onClose}
          className="rounded-full p-2 absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Employee Details</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ResourceDetailsPane resourceId={employeeId} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmployeeDetailsPopup;
