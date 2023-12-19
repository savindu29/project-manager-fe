import React, { useState } from 'react';
interface NameWindowProps {
    onClose: () => void;
    headerText: string;
  }
  
  const NameWindow: React.FC<NameWindowProps> = ({ onClose, headerText }) => {
    const [formData, setFormData] = useState({
      projectName: '',
      status: '',
      allocateDate: '',
      releaseDate: '',
      percentage: '',
      dateFrom: '',
      dateTo: '',
      role: '',
      notes: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSendRequest = () => {
      // Perform necessary actions when "Send Request" button is clicked
      console.log('Sending request:', formData);
    };
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center overflow-hidden">
        {/* Window Layout */}
        <div className="bg-white w-full sm:w-3/4 md:w-5/6 lg:w-11/12 xl:w-3/4 h-full sm:h-5/6 md:h-5/6 lg:h-5/6 xl:h-5/6 p-16 md:p-20 lg:p-24 xl:p-28 mt-8 mb-8 ml-80 mr-4 rounded-lg">
  
          {/* Close button in the right top corner */}
          <div className="text-right">
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={onClose}
            >
              Close
            </button>
          </div>
  
          {/* Header */}
          <div className="text-2xl font-bold mb-4">{headerText}</div>
    {/* Page Division */}
    <div className="flex">
      {/* Left Section */}
      <div className="w-full md:w-2/3 overflow-y-auto pr-4">
        {/* Table in Left Section */}
        <table className="w-full border-collapse">
          {/* Table Headers */}
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Project Names</th>
              <th className="p-2">Status</th>
              <th className="p-2">Allocate Date</th>
              <th className="p-2">Release Date</th>
              <th className="p-2">Percentage</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Render table rows with actual data */}
          </tbody>
        </table>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 p-4">
        {/* Information in Right Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date From</label>
          <div className="flex items-center">
            <input
              type="text"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {/* CalendarIcon placeholder */}
            <span className="ml-2"></span>
          </div>
        </div>

        {/* Repeat the above structure for other fields in the Right Section */}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date From</label>
          <div className="flex items-center">
            <input
              type="text"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {/* CalendarIcon placeholder */}
            <span className="ml-2"></span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date From</label>
          <div className="flex items-center">
            <input
              type="text"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {/* CalendarIcon placeholder */}
            <span className="ml-2"></span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Date From</label>
          <div className="flex items-center">
            <input
              type="text"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {/* CalendarIcon placeholder */}
            <span className="ml-2"></span>
          </div>
        </div>

        {/* Button in Right Section */}
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleSendRequest}
        >
          Send Request
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default NameWindow;
