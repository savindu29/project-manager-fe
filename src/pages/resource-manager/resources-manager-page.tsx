import { CheckCircleIcon } from '@heroicons/react/20/solid'

export function ResourcesManagerPage() {
    const employees = [
        {
            name: 'John Doe',
            status: 'Active',
            allocatedDate: '2023-01-01',
            releaseDate: '2023-12-31',
            percentage: 80,
          },
          {
            name: 'Jane Smith',
            status: 'Inactive',
            allocatedDate: '2023-02-15',
            releaseDate: '2023-10-31',
            percentage: 60,
          },
          {
            name: 'Bob Johnson',
            status: 'Active',
            allocatedDate: '2023-03-20',
            releaseDate: '2023-09-30',
            percentage: 75,
          },
          {
            name: 'Alice Williams',
            status: 'Inactive',
            allocatedDate: '2023-04-10',
            releaseDate: '2023-08-15',
            percentage: 90,
          },
          {
            name: 'Charlie Brown',
            status: 'Active',
            allocatedDate: '2023-05-05',
            releaseDate: '2023-07-01',
            percentage: 85,
          },
        // Add more employee data as needed
      ];
  return (
    <div className="px-12">
      <div className="h-20 w-full flex items-center ">
        <div className="w-1/2">
          <p className="text-xl font-medium">Resource allocation for test project</p>
        </div>
        <div className="w-1/2 flex ">
          <input
            type="text"
            name="resourceSearch"
            id="resourceSearch"
            placeholder="Search Resource here"
            className="appearance-none  px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
          />

          <button className="bg-zinc-200 ml-10 rounded px-3 py-1">Search</button>
        </div>
      </div>
      <hr />
      <div className="mt-6">
        <div className=" bg-green-700 flex text-white rounded py-1 px-2 w-48 justify-center items-center text-sm"><CheckCircleIcon className='h-4 w-4 mr-2'/> Current Resources</div>
      </div>
      <div className='mt-6  h-56 overflow-y-scroll'>
      <div className="">
      <table className="min-w-full  table-auto">
        <thead className=''>
          <tr className='text-zinc-400 font-normal text-left'>
            
            <th className="p-2 font-normal text-sm">Name</th>
            <th className="p-2 font-normal text-sm">Status</th>
            <th className="p-2 font-normal text-sm">Allocated date</th>
            <th className="p-2 font-normal text-sm">Relese Date</th>
            <th className="p-2 font-normal text-sm">Perecentage</th>
           
          </tr>
        </thead>
        <tbody className='border-y border-gray-300'>
        {employees.map((employee, index) => (
            <tr key={index}>
              <td className="border-b p-2">{employee.name}</td>
              <td className="border-b p-2 "><div className=" bg-green-700 flex text-white rounded py-1  w-28 justify-center items-center text-xs"><CheckCircleIcon className='h-4 w-4 mr-2'/> {employee.status}</div></td>
              <td className="border-b p-2">{employee.allocatedDate}</td>
              <td className="border-b p-2">{employee.releaseDate}</td>
              <td className="border-b p-2">{employee.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      

      </div>
    </div>
  );
}
