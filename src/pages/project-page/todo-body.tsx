import React from 'react';

const Todo = ({ todo }: any) => {
  return (
    <div className="p-4"> {/* Apply padding to the whole component */}
      <div>
        <div className="flex">
          <p className="font-medium">Special Notes: </p>
          <p className="ml-2">
            <span className="text-sky-500">{todo.notes}</span>
          </p>
        </div>
        <div>
          <h1 className="text-xl font-medium mt-4">Tasks</h1>

          <table className="table-auto mt-2 w-full"> {/* Set table width to 3/4 of the page */}
            <thead>
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {todo.tasks.map((task: any) => (
                <tr key={task.id}>
                  <td className="border px-4 py-2">{task.taskTitle}</td>
                  <td className="border px-4 py-2">{task.date}</td>
                  <td className="border px-4 py-2">{task.taskDescription}</td>
                  <td className="border px-4 py-2">{task.done ? "Completed" :"In-Complete"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo;
