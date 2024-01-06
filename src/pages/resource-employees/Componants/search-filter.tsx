import React, { useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  PlusIcon,
  TrashIcon,
  BackspaceIcon,
} from "@heroicons/react/24/outline";
import DropDown from "../../../components/drop-down";
import axios from "axios";
import { APP_API_BASE_URL } from "../../../apis";
import { Slider } from "@mui/material";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { SearchFilterProps } from "../resource-employees-page";

interface Option {
  id: number;
  name: string;
}
interface Area {
  id: number;
  name: string;
}
export interface Framework {
  id: number;
  name: string;
}
const options: Option[] = [
  { id: 1, name: "Area" },
  { id: 2, name: "Duration" },
  { id: 3, name: "Availability" },
];
// ... (previous imports)

const SearchFilter: React.FC<SearchFilterProps> = ({ projectDetail, onSaveFilter }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<Option | null>(null);
  const [selectArea, setSelectArea] = useState<Area | null>(null);

  const [availability, setAvailability] = useState<number>(50);
  const [areas, setAreas] = useState([]);
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [durationEditMode, setDurationEditMode] = useState(false);
  const [areaEditMode, setAreaEditMode] = useState(false);
  const [availabilityEditMode, setAvailabilityEditMode] = useState(false);
  const handleDurationCheckboxChange = () => {
    setDurationEditMode(!durationEditMode);
  };

  const handleAreaCheckboxChange = () => {
    setAreaEditMode(!areaEditMode);
  };

  const handleAvailabilityCheckboxChange = () => {
    setAvailabilityEditMode(!availabilityEditMode);
  };

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    // Fetch project status data
    axios
      .get(`${APP_API_BASE_URL}/api/v1/specification/specificationAreas`)
      .then((response) => setAreas(response.data.data))
      .catch((error) =>
        console.error("Error fetching project status data:", error)
      );
  }, []);

  const onSelectOption = (selectedOption: Option | null) => {
    setFilterOption(selectedOption);
  };

  const onSelectArea = async (selectedOption: Area | null) => {
    setSelectArea(selectedOption);

    if (selectedOption) {
      const area = selectedOption.id;
      try {
        const response = await axios.get(
          `${APP_API_BASE_URL}/api/v1/specification/specificationByArea/${area}`
        );
        setFrameworks(response.data.data);
        setSelectedValues([]);
      } catch (error) {
        console.error("Error fetching development field data:", error);
      }
    }
  };

  const handleSelectionChange = (selectedItems: number[]) => {
    setSelectedValues(selectedItems);
  };

  const save = () => {
    let filterData = {};

    if (durationEditMode) {
      filterData = {
        ...filterData,
        dateFrom: projectProposedImpStartDate
          ? formatDate(projectProposedImpStartDate)
          : null,
        dateTo: projectProposedImpEndDate
          ? formatDate(projectProposedImpEndDate)
          : null,
      };
    }

    if (areaEditMode) {
      filterData = {
        ...filterData,
        selectedValues: selectedValues,
      };
    }

    if (availabilityEditMode) {
      filterData = {
        ...filterData,
        availability: availability,
      };
    }

    // console.log("Filter Data:", filterData);
    onSaveFilter(filterData);
  };

  const [projectProposedImpStartDate, setProposedImpStartDate] = useState(
    projectDetail?.piStartDate ? new Date(projectDetail.piStartDate) : null
  );
  const [projectProposedImpEndDate, setProposedImpEndDate] = useState(
    projectDetail?.piEndDate ? new Date(projectDetail.piEndDate) : null
  );

  useEffect(() => {
    if (projectDetail) {
      setProposedImpStartDate(
        projectDetail.piStartDate ? new Date(projectDetail.piStartDate) : null
      );
      setProposedImpEndDate(
        projectDetail.piEndDate ? new Date(projectDetail.piEndDate) : null
      );
    }
  }, [projectDetail]);

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
 
  return (
    <div>
      <button
        className="bg-zinc-200 rounded-md px-3 text-xs py-1.5 mr-1 flex items-center"
        onClick={openPopup}
      >
        <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2" />
        Filter
      </button>

      {isPopupOpen && (
        <>
          <div className="overlay" onClick={closePopup}></div>
          <div className="absolute top-20 bg-zinc-100 drop-shadow-xl right-10 p-4 w-[64rem] z-50">
            <div className="filter-popup relative w-full">
              <div className="filter-popup-header">
                <span>Filter Options</span>
                <button className="absolute right-0" onClick={closePopup}>
                  <XMarkIcon className="w-4 h-4 mr-2" />
                </button>
              </div>

              <div className="filter-popup-content mt-3">
                <div className=" w-full ">
                  <div
                    className={`relative pr-12 py-2 flex bg-white ${
                      durationEditMode ? "bg-white" : "bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center ">
                    <input
  type="checkbox"
  className="mt-8 w-full  py-1.5 mx-4 "
  onChange={handleDurationCheckboxChange}
  checked={durationEditMode}
/>

                    </div>
                    <div className="w-1/3 p-2">
                      <div className="block mt-8 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6">
                        Duration
                      </div>
                    </div>

                    <div className="w-2/3 p-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Date From
                          </label>
                          <div className="mt-2">
                            <input
                              placeholder="Date from"
                              type="date"
                              name="proposedImplementStartDate"
                              id="proposedImplementStartDate"
                              onChange={(e) =>
                                setProposedImpStartDate(
                                  new Date(e.target.value)
                                )
                              }
                              value={
                                projectProposedImpStartDate
                                  ? formatDate(projectProposedImpStartDate)
                                  : ""
                              }
                              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                              disabled={!durationEditMode}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Date To
                          </label>
                          <div className="mt-2">
                            <input
                              placeholder="Date to"
                              type="date"
                              name="proposedImplementEndDate"
                              id="proposedImplementEndDate"
                              onChange={(e) => setProposedImpEndDate(new Date(e.target.value))}
                              value={
                                projectProposedImpEndDate
                                  ? formatDate(projectProposedImpEndDate)
                                  : ""
                              }
                              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                              disabled={!durationEditMode}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative pr-12 flex py-2 ${
                      areaEditMode ? "bg-white" : "bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center ">
                      <input
                        type="checkbox"
                        className="mt-8 w-full  py-1.5 mx-4 "
                        onChange={handleAreaCheckboxChange}
                        checked={areaEditMode}
                      />
                    </div>
                    <div className="w-1/3 p-2">
                      <div className="block mt-8 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6">
                        Area
                      </div>
                    </div>

                    <div className="w-2/3 p-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium leading-6 text-gray-900">
                            Area
                          </label>
                          <DropDown
                            data={areas}
                            dropdownFor={""}
                            onSelect={onSelectArea}
                            disabled={!areaEditMode}
                          />
                        </div>
                        {selectArea && (
                          <div className="sm:col-span-4">
                            <p className="text-sm font-medium leading-6 text-gray-900 pb-2">
                              Framewoks
                            </p>
                            <div className="w-full ">
                              <MultiSelectDropdown
                                items={frameworks}
                                onSelectionChange={handleSelectionChange}
                                disabled={!areaEditMode}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative pr-12 mb-2 flex py-2 ${
                      availabilityEditMode ? "bg-white" : "bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center ">
                      <input
                        type="checkbox"
                        className="mt-8 w-full  py-1.5 mx-4 "
                        onChange={handleAvailabilityCheckboxChange}
                        checked={availabilityEditMode}
                      />
                    </div>
                    <div className="w-1/3 p-2">
                      <div className="block mt-8 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6">
                        Availability
                      </div>
                    </div>

                    <div className="w-2/3 p-2">
                      {/* Availability filter implementation */}
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6 ml-12">
                          <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Set Minimum Availability
                          </label>
                          <div className="mt-2">
                            <Slider
                              defaultValue={availability}
                              aria-label="Default"
                              valueLabelDisplay="auto"
                              step={10}
                              onChange={(e, value) =>
                                setAvailability(value as number)
                              }
                              disabled={!availabilityEditMode}
                            />
                          </div>
                        </div>
                        {/* Additional availability filter options can be added here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="absolute bg-red-600 text-white px-2 py-1 rounded text-xs right-4 bottom-3"
              onClick={save}
            >
              Save filter 
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFilter;