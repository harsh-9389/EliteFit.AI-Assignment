import React, {useEffect, useState} from 'react'
import './App.css'
import { Dropdown } from 'primereact/dropdown';

type custom = {
    title: string,
    priority: string,
    dueDate: Date,
    description: string,
    status: string
}

function App() {
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
    <>
        <h2>Hello, Dear User! Glad to see you on our platform</h2>

        <input
            type="text"
            name='Title'
            value={title}
            placeholder="Please enter your task here"
            onChange={handleChangeInput}
        />
        <Dropdown
            value={priority}
            onChange={handleChangePriority}
            options={['High', 'Medium', 'Low']}
            placeholder="Set Priority"
        />
        <input
            type="date"
            name='Due Date'
            onChange={handleChangeDate}
        />
        <br/>
        <input
            type="text"
            name="description"
            placeholder="Please enter your description here"
            onChange={handleChangeDescription}
        />
        <button onClick={handleAddTask}>Add Task</button>

        <div style={{display: "flex"}}>
            <div style={{display: "grid"}}>
                <h3>Upcoming Tasks:</h3>
                <ul>

                    {tasks.filter((task: custom): boolean => task.status === 'upcoming')?.map((task: custom, index: number) => (
                        <>
                            <li key={index}> Title : {task.title}</li>
                            <li key={index}> Due Date: {task.dueDate.toDateString()} </li>
                            <li key={index}> Priority: {task.priority} </li>
                            <li key={index}> Description: {task.description} </li>
                            <button onClick={(): any => handleComplete(task)}> Completed</button>
                            <button onClick={(): any => handleDelete(task)}>Delete</button>
                        </>
                    ))}
                </ul>
            </div>

            <div style={{display: "grid"}}>
                <h3>Overdue Tasks:</h3>
                <ul>
                    {tasks.filter((task: custom): boolean => task.status === 'due')?.map((task: custom, index: number) => (
                        <>
                            <li key={index}> Title : {task.title}</li>
                            <li key={index}> Due Date: {task.dueDate.toDateString()} </li>
                            <li key={index}> Priority: {task.priority} </li>
                            <li key={index}> Description: {task.description} </li>
                            <button onClick={(): any => handleComplete(task)}> Completed</button>
                            <button onClick={(): any => handleDelete(task)}>Delete</button>
                        </>
                    ))}
                </ul>
            </div>

            <div style={{display: "grid"}}>
                <h3>Completed Tasks:</h3>
                <ul>
                    {tasks.filter((task: custom): boolean => task.status === 'completed')?.map((task: custom, index: number) => (
                        <>
                            <li key={index}> Title : {task.title}</li>
                            <li key={index}> Due Date: {task.dueDate.toDateString()} </li>
                            <li key={index}> Priority: {task.priority} </li>
                            <li key={index}> Description: {task.description} </li>
                            <button onClick={(): any => handleDelete(task)}>Delete</button>
                        </>
                    ))}
                </ul>
            </div>

        </div>
    </>
  )
}

export default App
