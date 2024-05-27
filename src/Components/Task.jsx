import { MdDelete, MdCheck } from "react-icons/md";
import { useEffect, useState } from 'react'

const Task = ({ task, RemoveTask, handleTaskClick }) => {

    const [date, setdate] = useState('')

    useEffect(() => {
        handledate()
    }, [])

    function handledate(){
        const DATE = new Date()
        const SetDateTask =  DATE.toLocaleDateString()
        setdate(SetDateTask)
    }

    return (

        <div className="task" style={task.completed ? { backgroundColor: 'chartreuse', color: 'black' } : {}}>
            <h2>{task.Title}</h2>
            <p>{task.content}</p>
            <p className="date">{date}</p>
            <div className="icons">
                <MdCheck style={task.completed && { color: 'black' }} className="check" onClick={() => handleTaskClick(task.id)} />
                <MdDelete style={task.completed && { color: 'black' }} onClick={() => RemoveTask(task.id)} className="delete" />
            </div>
        </div>
    )
}

export default Task