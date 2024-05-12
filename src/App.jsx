import { FaPlus } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { v4 } from 'uuid'
import Input from './Components/Input'
import Content from './Components/Content'
import ButtonAdd from './Components/ButtonAdd'
import ButtonClose from './Components/ButtonClose'
import Tasks from './Components/Tasks'
import './App.css'

function App() {

  const [tasks, SetTasks] = useState([])
  const [ModalOpen, SetModalOpen] = useState(false)
  const inputref = useRef()
  const inputref2 = useRef()

  const openmodal = () =>{
    SetModalOpen(true)
    
  }

  const closemodal = () => {
    SetModalOpen(false)
    inputref.current.value = ''
    inputref2.current.value = ''
  }

  const handlechangeInput = () => {
    {
      inputref.current.value !== '' &&
        SetTasks([...tasks, {
          id: v4(),
          Title: inputref.current.value,
          content: inputref2.current.value,
          completed: false
        }])
      inputref.current.value = ''
    inputref2.current.value = ''
    }
    SetModalOpen(false)
  };

  const handleTaskClick = (taskId) => {
    const newtask = tasks.map(task => {
      if (task.id == taskId)
        return {
          ...task, completed: !task.completed
        }
      return task
    })

    SetTasks(newtask)
  }

  const RemoveTask = (id) => {
    SetTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <>
      <div className='Header' onClick={openmodal}>< FaPlus className='check plus'/>
        Adicione uma tarefa
      </div>
      <div style={{display: 'flex'}}>
        <div className={ModalOpen ? 'add-task-overlay' : 'modalclose'}>
          <div className='add-task-container'>
            <Input Ref={inputref} />
            <Content reftextarea={inputref2} />
            <ButtonClose onclick={closemodal}/>
            <ButtonAdd onclick={handlechangeInput} />
          </div>
        </div>
        <div>
          <Tasks Tasks={tasks} RemoveTask={RemoveTask} handleTaskClick={handleTaskClick} />
        </div>
      </div>


    </>
  )
}

export default App