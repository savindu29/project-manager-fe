import React, { useEffect, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoSaveOutline } from 'react-icons/io5';
import { Switch, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddTodoModal from '../../../components/models/todo-model';
import { Task, UpdateTask } from '../../../apis';
import { updateTodo } from '../../../apis/project-api';

interface TodoType {
    id: number;
    title: string;
    description: string;
    date: string;
    isDone: boolean;
}

const Todo = ({ projectDetails }: { projectDetails: any }) => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [editTaskDetails, setEditTaskDetails] = useState<TodoType>({
        id: -1,
        title: '',
        description: '',
        date: '',
        isDone: false,
    });

    const [openFormDialog, setOpenFormDialog] = useState(false);

    // New state for managing the new task details
    const [newTaskDetails, setNewTaskDetails] = useState<TodoType>({
        id: -1,
        title: '',
        description: '',
        date: '',
        isDone: false,
    });

    // New state for managing the visibility of the add task modal
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

    const [note, setNote] = useState('');

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleAddTodo = (newTodo: TodoType) => {
        setTodos([...todos, newTodo]);
    };

    const handleToggleSwitch = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].isDone = !updatedTodos[index].isDone;
        setTodos(updatedTodos);
    };

    const handleRemoveClick = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleUpdateClick = (index: number) => {
        setEditingTaskIndex(index);
        setEditTaskDetails(todos[index]);
        setEditMode(true);
        setOpenFormDialog(true);
    };

    const handleAddTaskClick = () => {
        setNewTaskDetails({
            id: -1,
            title: '',
            description: '',
            date: '',
            isDone: false,
        });
        setOpenAddTaskDialog(true);
    };

    const handleAddTaskSubmit = () => {
        const updatedTodos = [...todos, newTaskDetails];
        setTodos(updatedTodos);
        setOpenAddTaskDialog(false);
    };

    const handleUpdateTaskSubmit = () => {
        const updatedTodos = [...todos];
        updatedTodos[editingTaskIndex as number] = editTaskDetails;
        setTodos(updatedTodos);
        setEditMode(false);
        setOpenFormDialog(false);
        setEditingTaskIndex(null);
        setEditTaskDetails({
            id: 0,
            title: '',
            description: '',
            date: '',
            isDone: false,
        });
    };

    useEffect(() => {
        if (projectDetails) {
            setTodos(
                (projectDetails.todo?.tasks ?? []).map((task: UpdateTask) => ({
                    id: task.id,
                    title: task.taskTitle,
                    description: task.taskDescription,
                    date: task.date,
                    isDone: task.done,
                }))
            );

            setNote(projectDetails.todo?.notes || '');
        }
    }, [projectDetails]);

    const handleSave = async () => {
        try {
          const projectId = projectDetails.id;
    
          // Prepare the data to send to the server
          const todoData = {
            notes: note,
            tasks: todos.map((task) => ({
              id: task.id,
              taskTitle: task.title,
              taskDescription: task.description,
              date: task.date,
              done: task.isDone,
            })),
          };

          await updateTodo(projectId, todoData);
    
          console.log('Todo updated successfully');
        } catch (error) {
      
          console.error('Error updating todo:', error);
        }
      };

    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form>
                <div className={"flex w-full h-12 mb-8"}>
                    <div className={"w-full flex items-center "}>
                        <h2 className="font-semibold text-lg ">Todo</h2>
                    </div>
                    <div className={" "}>
                        <button
                            type="button"
                            className="bg-sky-400 w-24 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer"
                            // onClick={() => setShowForm(!showForm)}
                            onClick={handleAddTaskClick}
                            disabled={!editMode}
                        >
                            {showForm ? 'Hide Form' : 'Add Task'}
                        </button>
                    </div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                        {!editMode ? (
                            <div className={' border rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '} onClick={handleEditClick}>
                                <GoPencil /> <span className={"text-sm mx-2"}>Update</span>
                            </div>
                        ) : (
                            <div className={'border rounded-full bg-gray-100  px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'} onClick={handleSave}>
                                <IoSaveOutline /> <span className={"text-sm mx-2"}>Save</span>
                            </div>
                        )}
                        {/*<div className={'border rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '} onClick={handleAddTaskClick}>*/}
                        {/*    <GoPencil /> <span className={"text-sm mx-2"}>Add Task</span>*/}
                        {/*</div>*/}
                    </div>
                </div>

                {todos.length > 0 && (
                    <table className="table-auto mt-2 w-full mb-6">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Task</th>
                            <th className="px-4 py-2">Due Date</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Is Completed</th>
                            <th className="px-4 py-2">Option</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map((todo, index) => (
                            <tr className="border" key={index}>
                                <td className="px-4 py-2">{todo.title}</td>
                                <td className="px-4 py-2">{todo.date}</td>
                                <td className="px-4 py-2">{todo.description}</td>
                                <td className="px-4 py-2">
                                    <Switch
                                        checked={todo.isDone}
                                        onChange={() => handleToggleSwitch(index)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        disabled={!editMode}
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <div
                                        className={`ml-2 text-indigo-500 ${!editMode && 'opacity-50 pointer-events-none'} ${editMode && 'hover:cursor-pointer'}`}
                                        onClick={() => handleUpdateClick(index)}
                                    >
                                        Update
                                    </div>
                                    <div
                                        className={`ml-2 text-red-500 ${!editMode && 'opacity-50 pointer-events-none'} ${editMode && 'hover:cursor-pointer'}`}
                                        onClick={() => handleRemoveClick(index)}
                                    >
                                        Remove
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {editMode && editingTaskIndex !== null && (
                    <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)}>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Title"
                                fullWidth
                                value={editTaskDetails.title}
                                onChange={(e) => setEditTaskDetails({ ...editTaskDetails, title: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={editTaskDetails.description}
                                onChange={(e) => setEditTaskDetails({ ...editTaskDetails, description: e.target.value })}
                                margin="normal"
                            />
                            <TextField
                                label="Due Date"
                                type="date"
                                fullWidth
                                value={editTaskDetails.date}
                                onChange={(e) => setEditTaskDetails({ ...editTaskDetails, date: e.target.value })}
                                margin="normal"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleUpdateTaskSubmit} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button onClick={() => setOpenFormDialog(false)} variant="outlined" >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

                {/* Modal for adding a new task */}
                <Dialog open={openAddTaskDialog} onClose={() => setOpenAddTaskDialog(false)}>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            fullWidth
                            value={newTaskDetails.title}
                            onChange={(e) => setNewTaskDetails({ ...newTaskDetails, title: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={newTaskDetails.description}
                            onChange={(e) => setNewTaskDetails({ ...newTaskDetails, description: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Due Date"
                            type="date"
                            fullWidth
                            value={newTaskDetails.date}
                            onChange={(e) => setNewTaskDetails({ ...newTaskDetails, date: e.target.value })}
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddTaskSubmit} variant="contained" color="primary">
                            Add Task
                        </Button>
                        <Button onClick={() => setOpenAddTaskDialog(false)} variant="outlined" >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                <label>Notes </label>
                <textarea
                    name="todoNotes"
                    id="todoNotes"
                    rows={5}
                    className="appearance-none my-6 w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    defaultValue={""}
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    disabled={!editMode}
                />
            </form>
        </div>
    );
};

export default Todo;
