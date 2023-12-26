import React, { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
 
} from "@heroicons/react/20/solid";
import {
  PlusIcon,
  TrashIcon,
  BackspaceIcon
} from "@heroicons/react/24/outline";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Slider,
} from "@mui/material";
import { Transition } from "@headlessui/react";
import DropDown from "../../../components/drop-down";

interface Option {
  id: number;
  name: string;
}
interface Framework {
  id: number;
  name: string;
}

const options: Option[] = [
  { id: 1, name: "Area" },
  { id: 2, name: "Framework" },
  { id: 3, name: "Duration" },
  { id: 4, name: "Availability" },
];
interface DevelopmentField {
  id: number;
  name: string;
  frameworks: Framework[];
}

const developmentFields: DevelopmentField[] = [
  {
    id: 1,
    name: "Backend Development",
    frameworks: [
      { id: 1, name: "Spring" },
      { id: 2, name: "Flask" },
      { id: 3, name: ".NET" },
      { id: 4, name: "Express.js" },
      { id: 5, name: "Django" },
      { id: 6, name: "Ruby on Rails" },
      { id: 7, name: "Laravel" },
      { id: 8, name: "Node.js" },
      // Add more backend frameworks as needed
    ],
  },
  {
    id: 2,
    name: "Frontend Development",
    frameworks: [
      { id: 9, name: "React" },
      { id: 10, name: "Angular" },
      { id: 11, name: "Vue.js" },
      { id: 12, name: "Ember.js" },
      { id: 13, name: "Backbone.js" },
      { id: 14, name: "Svelte" },
      { id: 15, name: "jQuery" },
      // Add more frontend frameworks as needed
    ],
  },

  {
    id: 3,
    name: "DevOps",
    frameworks: [
      { id: 16, name: "Docker" },
      { id: 17, name: "Kubernetes" },
      { id: 18, name: "Jenkins" },
      { id: 19, name: "Ansible" },
      { id: 20, name: "Terraform" },
      // Add more DevOps frameworks as needed
    ],
  },
  {
    id: 4,
    name: "Database Administration",
    frameworks: [
      { id: 21, name: "MySQL" },
      { id: 22, name: "PostgreSQL" },
      { id: 23, name: "MongoDB" },
      { id: 24, name: "Microsoft SQL Server" },
      { id: 25, name: "Oracle Database" },
      // Add more database frameworks as needed
    ],
  },
  {
    id: 5,
    name: "Cloud Computing",
    frameworks: [
      { id: 26, name: "Amazon Web Services (AWS)" },
      { id: 27, name: "Microsoft Azure" },
      { id: 28, name: "Google Cloud Platform (GCP)" },
      { id: 29, name: "IBM Cloud" },
      { id: 30, name: "Alibaba Cloud" },
      // Add more cloud computing frameworks as needed
    ],
  },
  {
    id: 6,
    name: "Mobile Application Development",
    frameworks: [
      { id: 31, name: "React Native" },
      { id: 32, name: "Flutter" },
      { id: 33, name: "Xamarin" },
      { id: 34, name: "Swift" },
      { id: 35, name: "Kotlin" },
      // Add more mobile frameworks as needed
    ],
  },

  {
    id: 7,
    name: "UI/UX Design",
    frameworks: [
      { id: 36, name: "Adobe XD" },
      { id: 37, name: "Sketch" },
      { id: 38, name: "Figma" },
      { id: 39, name: "InVision" },
      { id: 40, name: "Zeplin" },
      // Add more UI/UX design tools as needed
    ],
  },
  {
    id: 8,
    name: "Quality Assurance (QA)",
    frameworks: [
      { id: 41, name: "Selenium" },
      { id: 42, name: "JUnit" },
      { id: 43, name: "TestNG" },
      { id: 44, name: "Cypress" },
      { id: 45, name: "Appium" },
      // Add more QA frameworks as needed
    ],
  },
  {
    id: 9,
    name: "Project Management",
    frameworks: [
      { id: 46, name: "Jira" },
      { id: 47, name: "Trello" },
      { id: 48, name: "Asana" },
      { id: 49, name: "Microsoft Project" },
      { id: 50, name: "Basecamp" },
      // Add more project management tools as needed
    ],
  },
  {
    id: 10,
    name: "Business Analysis",
    frameworks: [
      { id: 51, name: "Lucidchart" },
      { id: 52, name: "Balsamiq" },
      { id: 53, name: "Axure RP" },
      { id: 54, name: "Microsoft Visio" },
      { id: 55, name: "Draw.io" },
      // Add more business analysis tools as needed
    ],
  },
  {
    id: 11,
    name: "Artificial Intelligence (AI)",
    frameworks: [
      { id: 56, name: "TensorFlow" },
      { id: 57, name: "PyTorch" },
      { id: 58, name: "Scikit-learn" },
      { id: 59, name: "Keras" },
      { id: 60, name: "OpenCV" },
      // Add more AI frameworks as needed
    ],
  },

  {
    id: 12,
    name: "Data Science",
    frameworks: [
      { id: 61, name: "R" },
      { id: 62, name: "Python (with Pandas, NumPy, SciPy)" },
      { id: 63, name: "Jupyter Notebooks" },
      { id: 64, name: "Apache Spark" },
      { id: 65, name: "Tableau" },
      // Add more data science tools as needed
    ],
  },
  {
    id: 13,
    name: "Cybersecurity",
    frameworks: [
      { id: 66, name: "Metasploit" },
      { id: 67, name: "Wireshark" },
      { id: 68, name: "Nmap" },
      { id: 69, name: "Burp Suite" },
      { id: 70, name: "OpenVAS" },
      // Add more cybersecurity tools as needed
    ],
  },
  {
    id: 14,
    name: "Blockchain Development",
    frameworks: [
      { id: 71, name: "Ethereum" },
      { id: 72, name: "Hyperledger Fabric" },
      { id: 73, name: "Ripple" },
      { id: 74, name: "Corda" },
      { id: 75, name: "EOS.IO" },
      // Add more blockchain frameworks as needed
    ],
  },
  {
    id: 15,
    name: "Game Development",
    frameworks: [
      { id: 76, name: "Unity" },
      { id: 77, name: "Unreal Engine" },
      { id: 78, name: "Godot" },
      { id: 79, name: "Cocos2d" },
      { id: 80, name: "Phaser" },
      // Add more game development frameworks as needed
    ],
  },
  {
    id: 16,
    name: "Embedded Systems",
    frameworks: [
      { id: 81, name: "Arduino" },
      { id: 82, name: "Raspberry Pi" },
      { id: 83, name: "Mbed" },
      { id: 84, name: "PlatformIO" },
      { id: 85, name: "FreeRTOS" },
      // Add more embedded systems frameworks as needed
    ],
  },
  {
    id: 17,
    name: "Network Programming",
    frameworks: [
      { id: 86, name: "Scapy" },
      { id: 87, name: "Twisted" },
      { id: 88, name: "Netty" },
      { id: 89, name: "Socket.IO" },
      { id: 90, name: "libpcap" },
      // Add more network programming frameworks as needed
    ],
  },
  // Add more development fields as needed
];

const FilterButton = () => {
  const [filters, setFilters] = useState<Array<{ option: Option | null, developmentField: DevelopmentField | null }>>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleOptionChange = (option: Option | null, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index].option = option;
    setFilters(updatedFilters);
  };

  const handleDevelopmentFieldChange = (developmentField: Option | DevelopmentField | null, index: number) => {
    const updatedFilters = [...filters];
    if (developmentField && "frameworks" in developmentField) {
      updatedFilters[index].developmentField = developmentField as DevelopmentField;
    } else {
      updatedFilters[index].developmentField = null;
    }
    setFilters(updatedFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { option: null, developmentField: null }]);
  };

  const cleanFilters = () => {
    setFilters([]);
  };
  const handleRemoveFilter = (index: number) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  return (
    <div>
      <button className="bg-zinc-200 rounded-md px-3 text-xs py-1.5 mr-1 flex items-center" onClick={openPopup}>
        <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
        Filter
      </button>

      {isPopupOpen && (
        <div className="absolute top-20 bg-white drop-shadow-xl right-10 p-4 w-[64rem] ">
          <div className="filter-popup relative w-full">
            <div className="filter-popup-header">
              <span>Filter Options</span>
              <button className="absolute right-0" onClick={closePopup}>
                <XMarkIcon className="w-4 h-4 mr-2" />
              </button>
              <button className="absolute right-10 top-5 text-xs bg-zinc-100 py-1 px-2 rounded-xl mt-2 flex items-center">
                <BackspaceIcon className="w-4 h-4 mr-2" onClick={cleanFilters} />
                Reset
              </button>
            </div>

            <div className="filter-popup-content  mt-3">
              {filters.map((filter, index) => (
                <div key={index} className="flex w-full relative pr-12 mb-2">
                  {/* filter */}
                  <div className="w-1/3 p-2">
                    <label className="text-sm font-medium leading-6 text-gray-900">Option</label>
                    <DropDown
                      data={options}
                      dropdownFor={`Filter Options ${index + 1}`}
                      onSelect={(option) => handleOptionChange(option, index)}
                      defaultSelectedId={filter.option?.id}
                    />
                  </div>
                  {filter.option && filter.option.id === 1 && (
                    <div className="w-1/3 p-2">
                      <label className="text-sm font-medium leading-6 text-gray-900">Area</label>
                      <DropDown
                        data={developmentFields}
                        dropdownFor={`Select ${filter.option.name} Development Field`}
                        onSelect={(developmentField) => handleDevelopmentFieldChange(developmentField, index)}
                        defaultSelectedId={filter.developmentField?.id}
                      />
                    </div>
                  )}
                  {filter.option && filter.option.id === 2 && (
                    <div className="w-1/3 p-2">
                      <label className="text-sm font-medium leading-6 text-gray-900">Framework</label>
                      {filter.developmentField && (
                        <DropDown
                          data={filter.developmentField.frameworks}
                          dropdownFor={`Select ${filter.option.name} Development Field`}
                          onSelect={(option) => handleOptionChange(option, index)}
                          defaultSelectedId={filter.developmentField?.id}
                        />
                      )}
                    </div>
                  )}
                  {filter.option && filter.option.id === 3 && (
                    <div className="w-2/3 p-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                            Date From
                          </label>
                          <div className="mt-2">
                            <input
                              placeholder="Date from"
                              type="date"
                              name="dateFrom"
                              id="dateFrom"
                              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                            Date To
                          </label>
                          <div className="mt-2">
                            <input
                              placeholder="Date to"
                              type="date"
                              name="dateTo"
                              id="dateTo"
                              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {filter.option && filter.option.id === 4 && (
                    <div className="w-2/3 p-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                            Set Minimum Availability
                          </label>
                          <div className="mt-2">
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" step={10} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button className="absolute right-0 bottom-4">
                    <TrashIcon className="w-5 h-5" onClick={() => handleRemoveFilter(index)} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="text-xs bg-zinc-100 py-1 px-2 rounded-xl mt-2 flex items-center" onClick={addFilter}>
            <PlusIcon className="w-4 h-4 mr-1" /> Add Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButton;