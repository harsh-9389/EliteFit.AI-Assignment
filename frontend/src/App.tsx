import React, {useEffect, useState} from 'react'
import './App.css';
import {Dropdown} from 'primereact/dropdown';

type custom = {
    title: string,
    priority: string,
    dueDate: Date,
    description: string,
    status: string
}

function App(): React.JSX.Element {
    // first ask name of the user if it is not stored in the local storage
    const [name, setName] = useState<string>('');

    useEffect((): void => {
        const savedName: string|null = localStorage.getItem('name');
        if (savedName) {
            setName(savedName);
        } else {
            const userName: string|null = prompt("Please enter your name");
            if (userName) {
                setName(userName);
                localStorage.setItem('name', name);
            }
        }
    }, []);

//------------------------------ Task Management -------------------------------------//

    //------------------------- Important Parameters-------------------------//
    const [title, setTitle] = useState<string>('')
    const [priority, setPriority] = useState<string>('')
    const [dueDate, setDueDate] = useState<Date>()
    const [description, setDescription] = useState<string>('')
    const [status] = useState<string>('upcoming')

    const [tasks, setTasks] = useState<custom[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('');

    //------------------------- Different handlers for different functionalities -------------------------//
    const handleChangeTitle: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value)
    }

    const handleChangePriority: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPriority(event.target.value)
    }

    const handleChangeDate: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDueDate(new Date(event.target.value))
    }

    const handleChangeDescription: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value)
    }

    const handleSearchChange: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    };

    const getPriorityValue = (priority: string): number => {
        switch (priority) {
            case 'High':
                return 1;
            case 'Medium':
                return 2;
            case 'Low':
                return 3;
            default:
                return 4;
        }
    };

    const handleAddTask = (): void => {
        if (!title || !priority || !dueDate || !description) {
            alert("Please fill in all fields before adding a task.");
            return;
        }

        const newTask: custom = {
            title,
            priority,
            dueDate,
            description,
            status
        };

        const updatedTasks: custom[] = [...tasks, newTask].sort((a: custom, b: custom): number => getPriorityValue(a.priority) - getPriorityValue(b.priority));
        setTasks(updatedTasks);
    };

    // --------------------Filter tasks based on search query------------------------//
    const filteredTasks: custom[] = tasks.filter((task: custom): boolean =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())||
        task.dueDate.toString().includes(searchQuery.toLowerCase())||
        task.priority.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete: any = (task: custom): void => {
        const updatedTasks: custom[] = tasks.filter((element: custom): boolean => element !== task);
        setTasks(updatedTasks);
    };

    const handleComplete = (task: custom): void => {
        const updatedTasks: custom[] = tasks.map((element: custom): custom => {
            if (element === task) {
                return {...element, status: 'completed'};
            }
            return element;
        });
        setTasks(updatedTasks);
    }

    const handleEdit = (task: custom): void => {
        setTitle(task.title);
        setPriority(task.priority);
        setDueDate(task.dueDate);
        setDescription(task.description);
        handleDelete(task);
    };

    //------------------------- Move Tasks to Due Tasks if due date is passed ----------------//
    const moveTasksToDue = (): void => {
        const now = new Date();
        const updatedTasks: custom[] = tasks.map((task: custom): custom => {
            if (task.status === 'upcoming' && task.dueDate < now) {
                return {...task, status: 'due'};
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    useEffect(() => {
        const interval: number = setInterval(moveTasksToDue, 10); // Check every minute
        return (): void => clearInterval(interval);
    }, [tasks]);

    //------------------------Report Tasks to localStorage---------------//
    useEffect((): void => {
        const savedTasks: string|null = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks).map((task: custom) => ({
                ...task,
                dueDate: new Date(task.dueDate)
            })));
        }
    }, []);

    useEffect((): void => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold font-serif text-red-500">Welcome, Dear {name || 'User'}! Glad to see you on our platform</h2>

            <div className="flex m-4">
                <input
                    type="text"
                    name='Title'
                    value={title}
                    placeholder="Please enter your task"
                    onChange={handleChangeTitle}
                    className="border p-2 rounded w-1/3 m-2 font-mono text-gray-400 outline-0"
                />
                <Dropdown
                    type="text"
                    value={priority}
                    onChange={handleChangePriority}
                    options={['High', 'Medium', 'Low']}
                    placeholder="Set Priority"
                    className="border p-2 rounded w-1/3 m-2 text-gray-400 font-mono"
                />
                <input
                    type="date"
                    name='Due Date'
                    value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                    onChange={handleChangeDate}
                    className="border p-2 rounded w-1/3 m-2 text-gray-400 font-mono outline-0"
                />
            </div>

            <div className="flex m-4">
                <br/>
                <input
                    type="text"
                    name="description"
                    value={description}
                    placeholder="Please enter task description"
                    onChange={handleChangeDescription}
                    className="border p-2 rounded w-1/3 m-2 font-mono outline-0 text-gray-400"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white p-2 w-1/3 rounded m-2 font-serif"
                >Add Task
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search tasks by title, description, due date, or priority"
                    onChange={handleSearchChange}
                    className="border p-2 rounded w-1/3 m-2 h-10 font-mono text-gray-400 outline-0"
                />
            </div>

            <div className="flex space-x-4">
                <div className="w-1/3">
                    <h3 className="text-xl font-semibold mb-2 text-blue-800 font-serif">Upcoming Tasks:</h3>
                    <ul className="list-disc pl-5">
                        {filteredTasks.filter((task: custom): boolean => task.status === 'upcoming')?.map((task: custom, _: number) => (
                            <div className="border p-2 rounded bg-blue-200 font-mono mb-2">
                                <p><strong>Title:</strong> {task.title}</p>
                                <p><strong>Due Date:</strong> {task.dueDate.toDateString()}</p>
                                <p><strong>Priority:</strong> {task.priority}</p>
                                <p><strong>Description:</strong> {task.description}</p>
                                <button onClick={(): void => handleComplete(task)}
                                        className="bg-green-500 text-white p-1 rounded mr-2 font-serif">Complete
                                </button>
                                <button onClick={(): void => handleEdit(task)}
                                        className="bg-yellow-500 text-white p-1 rounded font-serif mr-2">Edit
                                </button>
                                <button onClick={(): void => handleDelete(task)}
                                        className="bg-red-500 text-white p-1 rounded font-serif">Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="w-1/3">
                    <h3 className="text-xl font-semibold mb-2 font-serif text-yellow-500">Overdue Tasks:</h3>
                    <ul className="list-disc pl-5">
                        {filteredTasks.filter((task: custom): boolean => task.status === 'due')?.map((task: custom, _: number) => (
                            <div className="border p-2 rounded bg-yellow-200 font-mono mb-2">
                                <p><strong>Title:</strong> {task.title}</p>
                                <p><strong>Due Date:</strong> {task.dueDate.toDateString()}</p>
                                <p><strong>Priority:</strong> {task.priority}</p>
                                <p><strong>Description:</strong> {task.description}</p>
                                <button onClick={(): void => handleComplete(task)}
                                        className="bg-green-500 text-white p-1 rounded mr-2 font-serif">Complete
                                </button>
                                <button onClick={(): void => handleEdit(task)}
                                        className="bg-yellow-500 text-white p-1 rounded font-serif mr-2">Edit
                                </button>
                                <button onClick={(): void => handleDelete(task)}
                                        className="bg-red-500 text-white p-1 rounded font-serif">Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="w-1/3">
                    <h3 className="text-xl font-semibold mb-2 text-green-700 font-serif">Completed Tasks:</h3>
                    <ul className="list-disc pl-5">
                        {filteredTasks.filter((task: custom): boolean => task.status === 'completed')?.map((task: custom, _: number) => (
                            <div className="border p-2 rounded bg-green-200 font-mono mb-2">
                                <p><strong>Title:</strong> {task.title}</p>
                                <p><strong>Due Date:</strong> {task.dueDate.toDateString()}</p>
                                <p><strong>Priority:</strong> {task.priority}</p>
                                <p><strong>Description:</strong> {task.description}</p>
                                <button onClick={(): void => handleDelete(task)}
                                        className="bg-red-500 text-white p-1 rounded font-serif">Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App
