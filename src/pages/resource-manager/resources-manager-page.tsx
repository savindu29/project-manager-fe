import { CheckCircleIcon, StopCircleIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface Employee {
    name: string;
    status: string;
    allocatedDate: string;
    releaseDate: string;
    percentage: number;
}

interface Project {
    id: number;
    name: string;
}

interface Resource {
    name: string;
    status: string;
    allocatedProjects: Project[];
    pendingProjects: Project[];
}

export function ResourcesManagerPage() {
    const employees: Employee[] = [
        {
            name: "John Doe",
            status: "Active",
            allocatedDate: "2023-01-01",
            releaseDate: "2023-12-31",
            percentage: 80,
        },
        {
            name: "Jane Smith",
            status: "Inactive",
            allocatedDate: "2023-02-15",
            releaseDate: "2023-10-31",
            percentage: 60,
        },
        {
            name: "Bob Johnson",
            status: "Active",
            allocatedDate: "2023-03-20",
            releaseDate: "2023-09-30",
            percentage: 75,
        },
        {
            name: "Alice Williams",
            status: "Inactive",
            allocatedDate: "2023-04-10",
            releaseDate: "2023-08-15",
            percentage: 90,
        },
        {
            name: "Charlie Brown",
            status: "Active",
            allocatedDate: "2023-05-05",
            releaseDate: "2023-07-01",
            percentage: 85,
        },
        // Add more employee data as needed
    ];
    const resourcesAllocated: Resource[] = [
        {
            name: "Resource1",
            status: "Active",
            allocatedProjects: [
                { id: 1, name: "A Project " },
                { id: 2, name: "B Project " },
                { id: 3, name: "C Project " },
            ],
            pendingProjects: [
                { id: 3, name: "Project C" },
                { id: 4, name: "Project D" },
                { id: 5, name: "Project B" },
            ],
        },
        {
            name: "Resource2",
            status: "Inactive",
            allocatedProjects: [
                { id: 5, name: "Project E" },
                { id: 6, name: "Project F" },
            ],
            pendingProjects: [
                { id: 7, name: "Project G" },
                { id: 8, name: "Project H" },
            ],
        },
        // Add more resource entities as needed
    ];
    return (
        <div className="px-12">
            <div className="h-20 w-full flex items-center ">
                <div className="w-1/2">
                    <p className="text-xl font-semibold">
                        Resource allocation for test project
                    </p>
                </div>
                <div className="w-1/2 flex">
                    <div className="flex border border-zinc-300 rounded-md items-center w-full mr-20">
                        <input
                            type="search"
                            name="resourceSearch"
                            id="resourceSearch"
                            placeholder="Search Resource here"
                            className="appearance-none  px-4 py-2 text-gray-700 leading-tight outline-none rounded-md w-full text-sm"
                        />
                        
                        <button className="bg-zinc-200  rounded-md px-3 text-xs py-1.5 mr-1 flex items-center">
                        <AdjustmentsHorizontalIcon className="w-4 h-4 mr-2"/>
                        Filter
                    </button>
                    <button className="bg-zinc-200  rounded-md p-1 mr-1 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5 mx-2 text-zinc-500 "/>
                    </button>
                    </div>
                    
                </div>
            </div>
            <hr />
            <div className="mt-6">
                <div className=" bg-green-700 flex text-white rounded py-1 px-2 w-48 justify-center items-center text-sm">
                    <CheckCircleIcon className="h-4 w-4 mr-2" /> Current Resources
                </div>
            </div>
            <div className="mt-6  h-60 overflow-y-scroll">
                <div className="">
                    <table className="min-w-full  table-auto">
                        <thead className="">
                        <tr className="text-zinc-400 font-normal text-left">
                            <th className="p-2 font-normal text-sm">Name</th>
                            <th className="p-2 font-normal text-sm">Status</th>
                            <th className="p-2 font-normal text-sm">Allocated date</th>
                            <th className="p-2 font-normal text-sm">Relese Date</th>
                            <th className="p-2 font-normal text-sm">Perecentage</th>
                        </tr>
                        </thead>
                        <tbody className="border-y border-gray-300 text-sm">
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td className="border-b p-2">{employee.name}</td>
                                <td className="border-b p-2 ">
                                    <div className=" bg-green-700 flex text-white rounded py-1  w-28 pl-4 items-center text-xs">
                                        <CheckCircleIcon className="h-4 w-4 mr-2" />{" "}
                                        {employee.status}
                                    </div>
                                </td>
                                <td className="border-b p-2">{employee.allocatedDate}</td>
                                <td className="border-b p-2">{employee.releaseDate}</td>
                                <td className="border-b p-2">{employee.percentage}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-6">
                <div className=" bg-violet-600 flex text-white rounded py-1 px-2 w-48 justify-center items-center text-sm">
                    <StopCircleIcon className="h-4 w-4 mr-2" /> Other Resources
                </div>
            </div>
            <div className="mt-6  h-56 overflow-y-scroll">
                <div className="">
                    <table className="min-w-full  table-auto">
                        <thead className="">
                        <tr className="text-zinc-400 font-normal text-left">
                            <th className="p-2 font-normal text-sm">Name</th>
                            <th className="p-2 font-normal text-sm">Status</th>
                            <th className="p-2 font-normal text-sm">Allocated Projects</th>
                            <th className="p-2 font-normal text-sm">Pending Projects</th>
                        </tr>
                        </thead>
                        <tbody className="border-y border-gray-300 text-sm">
                        {resourcesAllocated.map((resource, index) => (
                            <tr key={index}>
                                <td className="border-b p-2">{resource.name}</td>
                                <td className="border-b p-2 ">
                                    <div
                                        className={
                                            "bg-violet-600 flex text-white rounded py-1 w-28 pl-4 items-center text-xs"
                                        }
                                    >
                                        <StopCircleIcon className="h-4 w-4 mr-2" />{" "}
                                        {resource.status}
                                    </div>
                                </td>
                                <td className="border-b p-2">
                                    <div className="flex">
                                        {resource.allocatedProjects.map((project, projectIndex) => (
                                            <div
                                                key={projectIndex}
                                                className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-violet-300 -mr-2 border-2 border-white"
                                            >
                                                {project.name.charAt(0).toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="border-b p-2">
                                    <div className="flex">
                                        {resource.pendingProjects.map((project, projectIndex) => (
                                            <div
                                                key={projectIndex}
                                                className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-violet-300 -mr-2 border-2 border-white"
                                            >
                                                {project.name.charAt(0).toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
