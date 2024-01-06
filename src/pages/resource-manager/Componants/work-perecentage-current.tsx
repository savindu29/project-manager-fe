// WorkPerecentageCurrent.tsx
import React, {useEffect, useState} from 'react';
import CustomTooltip from './custom-tooltip';
import axios from "axios";

 // Adjust the path based on your project structure
interface Employee {
  id: number; // Assuming id is a number
  name: string;
  status: boolean;
  allocated_date: string;
  released_date: string;
  percentage: number;
}

interface WorkPerecentageCurrentProps {
  employee: Employee;
}

const WorkPerecentageCurrent: React.FC<WorkPerecentageCurrentProps> = ({ employee }) => {
  // const dateFrom = "2023-10-12";
  // const dateTo = "2023-12-12"
  const [formattedDateFrom, setFormattedDateFrom] = useState<string | undefined>(undefined);
const [formattedDateTo, setFormattedDateTo] = useState<string | undefined>(undefined);
const [percentageData, setPercentageData] = useState<any[]>([]); // You might want to replace 'any' with a more specific type.
const backgroundColors = ["bg-red-600", "bg-yellow-500", "bg-orange-600", "bg-purple-500", "bg-sky-500"]; // Add more colors if needed

useEffect(() => {
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const fetchData = async () => {
    try {
      const allocatedDate = new Date(employee.allocated_date);
      const releasedDate = new Date(employee.released_date);

      const response = await axios.post("http://localhost:8000/api/v1/project/available_percentages", {
        empId: employee.id,
        fromDate: formatDate(allocatedDate),
        toDate: formatDate(releasedDate),
      });

      // Log the response for debugging
      console.log("Percentage Data:", response.data);

      // Set the state with the response data
      setPercentageData(response.data);
      // Set formatted dates from the employee data
      setFormattedDateFrom(formatDate(allocatedDate));
      setFormattedDateTo(formatDate(releasedDate));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [employee]);

const percentageComponents = percentageData.map((data, index) => (
  <CustomTooltip key={index} title={`Date From : ${data.fromDate} Date To : ${data.toDate}`}>
    <div className={`w-[${Math.round(52 / percentageData.length)}rem] ${backgroundColors[index]} text-center rounded-full text-white mx-1`}>
      {data.percentage}%
    </div>
  </CustomTooltip>
));

// Rest of your component...


// Rest of your component...

  return (
    <div>
      {/* Your component details for the selected employee */}
      Resource Details 
      <div className="w-full ">
        <div className="w-full my-4">
          <div className="flex w-full py-2 items-center  text-xs font-medium text-zinc-600 mb-3">
            <div className='w-[16rem]'></div>
            <div className="w-28 text-center">{formattedDateFrom}</div>
            <div className="w-full "><hr /></div>
            <div className="w-28 text-center pr-6">{formattedDateTo}</div>
          </div>
          <div className="flex w-full text-xs py-2">
            <div className="w-[12rem] ">Software engineer</div>
            <div className="w-[52rem] flex items-center ">
              {percentageComponents}
            </div>
          </div>

          {/* <div className="flex w-full text-xs py-2">
            <div className="w-[12rem] ">QA engineer</div>
            <div className="w-[52rem] flex items-center ">
            <div className="w-[30rem] bg-white rounded-full  mx-1 flex items-center"></div>
              <CustomTooltip title={`Date From : ${formattedDateFrom} Date To : ${formattedDateTo}`}>
                <div className="w-[10rem] bg-red-700 text-center  rounded-full text-white mx-1 ">60%</div>
              </CustomTooltip>
              <div className="w-[12rem] bg-white rounded-full  mx-1 flex items-center"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default WorkPerecentageCurrent;