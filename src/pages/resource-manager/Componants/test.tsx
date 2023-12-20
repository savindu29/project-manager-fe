// SimplePage.tsx
import React, { useState } from 'react';
import MiniDrawer from '../../../layout';
import NameWindow from './NameWindow';

const SimplePage: React.FC = () => {
  const [isNameWindowOpen, setIsNameWindowOpen] = useState(false);

  const handleButtonClick = () => {
    // Disable the button click when NameWindow is open
    if (!isNameWindowOpen) {
      setIsNameWindowOpen(true);
    }
  };

  const closeNameWindow = () => {
    setIsNameWindowOpen(false);
  };

  return (
    <div>
    <div className="flex h-screen overflow-hidden">
      <MiniDrawer />

      {/* Main content area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="flex justify-end p-8">
          {/* Conditionally render the button based on the state */}
          {!isNameWindowOpen && (
            <div className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded cursor-pointer">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleButtonClick}
              >
                Click me
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Your other content goes here */}
        </div>

        {/* Conditionally render the NameWindow component based on the state */}
        
      </main>
      
    </div>
    {isNameWindowOpen && <NameWindow onClose={closeNameWindow} headerText={''} />}
    </div>
  );
};

export default SimplePage;
