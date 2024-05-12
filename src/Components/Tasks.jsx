import Task from './Task'
const Tasks = ({ Tasks, RemoveTask, handleTaskClick }) => {

    return (
        <>
            <div className="task-container">
                {Tasks.map(task => (
                    <div key={task.id}>
                        <Task task={task} RemoveTask={RemoveTask} handleTaskClick={handleTaskClick}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tasks