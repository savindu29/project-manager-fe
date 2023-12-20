// WorkPerecentageCurrent.tsx
import React from 'react';
import CustomTooltip from './custom-tooltip';
 // Adjust the path based on your project structure

export default function WorkPerecentageCurrent() {
  const dateFrom = "2023-10-12";
  const dateTo = "2023-12-12";

  return (
    <div>
      {/* Your component details for the selected employee */}
      Resource Details 
      <div className="w-full ">
        <div className="w-full my-4">
          {/* <div className="flex w-full py-2">
            <div className="w-[12rem] ">role</div>
            <div className="w-[26rem] ">Allocated Date</div>
            <div className="w-[26rem] text-right ">Release Date</div>
          </div> */}
          <div className="flex w-full text-xs">
            <div className="w-[12rem] ">Software engineer</div>
            <div className="w-[52rem] flex items-center ">
            <CustomTooltip title={`Date From : ${dateFrom} Date To : ${dateTo}`}>
                <div className="w-[26rem] bg-red-600 text-center  rounded-full text-white mx-1">60%</div>
              </CustomTooltip>
              <CustomTooltip title={`Date From : ${dateFrom} Date To : ${dateTo}`}>
                <div className="w-[19.5rem] bg-yellow-500 text-center  rounded-full text-white mx-1">40%</div>
              </CustomTooltip>
              <CustomTooltip title={`Date From : ${dateFrom} Date To : ${dateTo}`}>
                <div className="w-[6.5rem] bg-orange-600 text-center  rounded-full text-white mx-1">80%</div>
              </CustomTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
