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

const SearchFilter: React.FC<SearchFilterProps> = ({
  projectDetail,
  onSaveFilter,
}) => {
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
          <div className="absolute top-20 bg-zinc-100 drop-shadow-xl right-10 p-4 w-[48rem]  z-50">
            <div className="filter-popup relative w-full">
              <div className="filter-popup-header">
                <span>Filter Options</span>
                <button className="absolute right-0" onClick={closePopup}>
                  <XMarkIcon className="w-4 h-4 mr-2" />
                </button>
              </div>

              <div className="filter-popup-content mt-3">
                <div className=" w-full ">
                  <div></div>

                  <div
                    className={`relative pr-12 flex py-2 ${
                      areaEditMode ? "bg-white" : "bg-zinc-100"
                    }`}
                  >
                    {/* <div className="flex items-center ">
                      <input
                        type="checkbox"
                        className="mt-8 w-full  py-1.5 mx-4 "
                        onChange={handleAreaCheckboxChange}
                        checked={areaEditMode}
                      />
                    </div> */}

                    <div className="w-full p-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-2 w-56">
                          <label className="text-sm font-medium leading-6 text-gray-900">
                            Skill
                          </label>
                          <DropDown
                            data={areas}
                            dropdownFor={""}
                            onSelect={onSelectArea}
                          />
                        </div>
                        {/* {selectArea && (
                          
                        )} */}
                      </div>
                    </div>

                    <div className="w-full p-2">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-2 w-56">
                          <label className="text-sm font-medium leading-6 text-gray-900">
                            Skill Level
                          </label>
                          <DropDown
                            data={areas}
                            dropdownFor={""}
                            onSelect={onSelectArea}
              
                          />
                        </div>
                        {/* {selectArea && (
                          
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div></div>
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
