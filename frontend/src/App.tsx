import React, { useState } from 'react'
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
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState('ongoing')

    const [upcomingTasks, setUpcomingTasks] = useState<custom[]>([])
    const [overdueTasks, setOverdueTasks] = useState<custom[]>([])
    const [completedTasks, setCompletedTasks] = useState<custom[]>([])

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
        const newTask:custom = {
            title,
            priority,
            dueDate,
            description,
            status
        }
        setUpcomingTasks([...upcomingTasks, newTask])
    }

    const handleDeleteTask: any = (index: number) => {
        const updatedTasks: custom[] = upcomingTasks.filter((_, i) => i !== index);
        setUpcomingTasks(updatedTasks);
    };

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
        {/*<Priorities priority={priority} setPriority={setPriority}/>*/}
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
                    {upcomingTasks.map((task: custom, index: number) => (
                        <>
                            <li key={index}> Title : {task.title}</li>
                            <li key={index}> Due Date: {task.dueDate.toDateString()} </li>
                            <li key={index}> Priority: {task.priority} </li>
                            <li key={index}> Description: {task.description} </li>
                            <button> Completed</button>
                            <button onClick={() => handleDeleteTask(index)}>Delete</button>
                        </>
                    ))}
                </ul>
            </div>

            <div style={{display: "grid"}}>
                <h3>Overdue Tasks:</h3>
                <ul>
                    {overdueTasks.map((task: custom, index: number) => (
                        <li key={index}>Title : {task.title} Priority: {task.priority} Due Date: {task.dueDate?.toString()} Description: {task.description}</li>
                    ))}
                </ul>
            </div>

            <div style={{display: "grid"}}>
                <h3>Completed Tasks:</h3>
                <ul>
                    {completedTasks.map((task: custom, index: number) => (
                        <li key={index}>Title : {task.title} Priority: {task.priority} Due Date: {task.dueDate?.toString()} Description: {task.description}</li>
                    ))}
                </ul>
            </div>

        </div>
    </>
  )
}

export default App
