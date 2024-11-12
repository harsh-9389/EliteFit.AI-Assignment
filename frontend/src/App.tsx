import React, {useEffect, useState} from 'react'
// @ts-ignore
import './App.css';
import { Dropdown } from 'primereact/dropdown';

type custom = {
    title: string,
    priority: string,
    dueDate: Date,
    description: string,
    status: string
}

function App() {
    // const [name, setName] = useState<string>('User');

    // useEffect(() => {
    //     if (name == null) {
    //         const inputName: string | null = prompt("Please enter your name: ");
    //         console.log(inputName)
    //         setName(inputName);
    //     }
    //
    //     localStorage.setItem('name', JSON.stringify(name));
    // }, []);
    //
    // useEffect(() => {
    //     const savedName = localStorage.getItem('name');
    //     if (savedName) {
    //         setName(JSON.parse(savedName));
    //     }
    // }, []);

    const [title, setTitle] = useState<string>('')
    const [priority, setPriority] = useState<string>('')
    const [dueDate, setDueDate] = useState<Date>()
    const [description, setDescription] = useState<string>('')
    const [status] = useState<string>('upcoming')

    const [tasks, setTasks] = useState<custom[]>([])

    const handleChangeInput: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value)
    }

    const handleChangeDate: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDueDate(new Date(event.target.value))
    }

    const handleChangePriority: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPriority(event.target.value)
    }

    const handleChangeDescription: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value)
    }

    const handleAddTask: any = (): void => {
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
        }
        setTasks([...tasks, newTask]);
    }

    const handleDelete: any = (task: custom): void => {
        const updatedTasks: custom[] = tasks.filter((element: custom): boolean => element !== task);
        setTasks(updatedTasks);
    };

    const handleComplete = (task: custom): void => {
        const updatedTasks: custom[] = tasks.map((element: custom): custom => {
            if (element === task) {
                return { ...element, status: 'completed' };
            }
            return element;
        });
        setTasks(updatedTasks);
    }

    const moveTasksToDue = (): void => {
        const now = new Date();
        const updatedTasks = tasks.map((task: custom): custom => {
            if (task.status === 'upcoming' && task.dueDate < now) {
                return { ...task, status: 'due' };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    useEffect(() => {
        const interval = setInterval(moveTasksToDue, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [tasks]);

    // Report Tasks to localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks).map((task: custom) => ({
                ...task,
                dueDate: new Date(task.dueDate)
            })));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  return (
      <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold m-4 text-gray-700">Hello, Dear User! Glad to see you on our platform</h2>

          <div className="flex m-4">
              <input
                  type="text"
                  name='Title'
                  value={title}
                  placeholder="Please enter your task here"
                  onChange={handleChangeInput}
                  className="border p-2 rounded w-full m-2"
              />
              <Dropdown
                  type="text"
                  value={priority}
                  onChange={handleChangePriority}
                  options={['High', 'Medium', 'Low']}
                  placeholder="Set Priority"
                  className="border p-2 rounded w-full m-2 text-gray-400"
              />
              <input
                  type="date"
                  name='Due Date'
                  onChange={handleChangeDate}
                  className="border p-2 rounded w-full m-2 text-gray-400"
              />
          </div>

          <div className="flex m-4">
              <br/>
              <input
                  type="text"
                  name="description"
                  placeholder="Please enter your description here"
                  onChange={handleChangeDescription}
                  className="border p-2 rounded w-80 m-2"
              />
              <button
                  onClick={handleAddTask}
                  className="bg-blue-500 text-white p-2 rounded right-4 w-20 m-2"
              >Add Task</button>
          </div>

          <div className="flex space-x-4">
              <div className="w-1/3">
                  <h3 className="text-xl font-semibold mb-2">Upcoming Tasks:</h3>
                  <ul className="list-disc pl-5">
                      {tasks.filter((task: custom): boolean => task.status === 'upcoming')?.map((task: custom, index: number) => (
                          <li key={index} className="mb-2">
                              <div className="border p-2 rounded">
                                  <p><strong>Title:</strong> {task.title}</p>
                                  <p><strong>Due Date:</strong> {task.dueDate.toDateString()}</p>
                                  <p><strong>Priority:</strong> {task.priority}</p>
                                  <p><strong>Description:</strong> {task.description}</p>
                                  <button onClick={() => handleComplete(task)}
                                          className="bg-green-500 text-white p-1 rounded mr-2">Completed
                                  </button>
                                  <button onClick={() => handleDelete(task)}
                                          className="bg-red-500 text-white p-1 rounded">Delete
                                  </button>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="w-1/3">
                  <h3 className="text-xl font-semibold mb-2">Overdue Tasks:</h3>
                  <ul className="list-disc pl-5">
                      {tasks.filter((task: custom): boolean => task.status === 'due')?.map((task: custom, index: number) => (
                          <li key={index} className="mb-2">
                              <div className="border p-2 rounded">
                                  <p><strong>Title:</strong> {task.title}</p>
                                  <p><strong>Due Date:</strong> {task.dueDate.toDateString()}</p>
                                  <p><strong>Priority:</strong> {task.priority}</p>
                                  <p><strong>Description:</strong> {task.description}</p>
                                  <button onClick={() => handleComplete(task)}
                                          className="bg-green-500 text-white p-1 rounded mr-2">Completed
                                  </button>
                                  <button onClick={() => handleDelete(task)}
                                          className="bg-red-500 text-white p-1 rounded">Delete
                                  </button>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="w-1/3">
                  <h3 className="text-xl font-semibold mb-2">Completed Tasks:</h3>
                  <ul className="list-disc pl-5">
                      {tasks.filter((task: custom): boolean => task.status === 'completed')?.map((task: custom, index: number) => (
                          <li key={index} className="mb-2">
                              <div className="border p-2 rounded">
                                  <p><strong>Title:</strong> {task.title}</p>
                                  <p><strong>Due Date:</strong> {task.dueDate.toDateString()}</p>
                                  <p><strong>Priority:</strong> {task.priority}</p>
                                  <p><strong>Description:</strong> {task.description}</p>
                                  <button onClick={() => handleDelete(task)}
                                          className="bg-red-500 text-white p-1 rounded">Delete
                                  </button>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
  );
}

export default App
