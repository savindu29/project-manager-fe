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
          <div className="flex w-full py-2 items-center  text-xs font-medium text-zinc-600 mb-3">
            <div className='w-[16rem]'>Role</div>
            <div className="w-28 text-center">{dateFrom}</div>
            <div className="w-full "><hr /></div>
            <div className="w-28 text-center">{dateTo}</div>
          </div>
          <div className="flex w-full text-xs py-2">
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

          {/* <div className="flex w-full text-xs py-2">
            <div className="w-[12rem] ">QA engineer</div>
            <div className="w-[52rem] flex items-center ">
            <div className="w-[30rem] bg-white rounded-full  mx-1 flex items-center"></div>
              <CustomTooltip title={`Date From : ${dateFrom} Date To : ${dateTo}`}>
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
