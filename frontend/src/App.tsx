import React, { useState } from 'react'
import './App.css'

function App() {
    const [name, setName] = useState('User')
    const [newTask, setNewTask] = useState<string>('')
    const [upcomingTasks, setUpcomingTasks] = useState<string[]>([])
    const [overdueTasks, setOverdueTasks] = useState<string[]>([])
    const [completedTasks, setCompletedTasks] = useState<string[]>([])

    const handleChangeInput: any = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTask(event.target.value)
    }

    const handleAddTask: any = (): void => {
        setUpcomingTasks([...upcomingTasks, newTask])
    }

  return (
    <>
        <h2>Hello, Dear {name}! Glad to see you on our platform</h2>

        <input
            type="text"
            name='Title'
            value={newTask}
            placeholder="Please enter your task here"
            onChange={handleChangeInput}
        />
        <input
            type="text"

        <button onClick={handleAddTask}>Add Task</button>

        <div style={{display: "flex"}}>
            <div style={{display: "grid"}}>
                <h3>Upcoming Tasks:</h3>
                <ul>
                    {upcomingTasks.map((task: string, index: number) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>

            <div style={{display: "grid"}}>
                <h3>Overdue Tasks:</h3>
                <ul>
                    {overdueTasks.map((task: string, index: number) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>

            <div style={{display: "grid"}}>
                <h3>Completed Tasks:</h3>
                <ul>
                    {completedTasks.map((task: string, index: number) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
            </div>

        </div>
    </>
  )
}

export default App
