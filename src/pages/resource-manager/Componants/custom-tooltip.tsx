// CustomTooltip.tsx
import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';

interface CustomTooltipProps {
  title: string;
  children: ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className={`text-sm bg-white drop-shadow-md text-black  rounded p-2 w-[12rem] absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
      >
        {title}
      </div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    </div>
  );
};

CustomTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomTooltip;
