import { FaPlus } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { v4 } from 'uuid'
import Input from './Components/Input'
import Content from './Components/Content'
import ButtonAdd from './Components/ButtonAdd'
import ButtonClose from './Components/ButtonClose'
import Tasks from './Components/Tasks'
import ButtonReset from './Components/ButtonReset'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const LocalTasks = localStorage.getItem('task')

  const [tasks, SetTasks] = useState(LocalTasks ? JSON.parse(LocalTasks) : [])
  const [ModalOpen, SetModalOpen] = useState(false)
  const [taskLength, settasklength] = useState('')
  const [taskComplet, setTaskcomplet] = useState('')
  const inputref = useRef()
  const inputref2 = useRef()

  const setTaskCompleted = ()=>{
    const setTasks = tasks.filter(task => task.completed).length
    setTaskcomplet(setTasks)
  }

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks))
    settasklength(tasks.length)
    setTaskCompleted()
  }, [tasks])

  const NotifyTaskSucess = () => {
    toast.success('Nova tarefa adicionada', {
      autoClose: 2000,
    })
  }

  const NotifyTitle = () => {
    toast.warning('A sua Tarefa deve ter um título')
  }

  const NotifyContent = () => {
    toast.warning('A sua tarefa não tem um conteúdo')
  }

  const NotifyReset = () => {
    toast.success('Eliminou todas as tarefas', {
      autoClose: 1600,
      position: 'top-center'
    })
  }

  const openmodal = () => {
    SetModalOpen(true)
  }

  const closemodal = () => {
    SetModalOpen(false)
    inputref.current.value = ''
    inputref2.current.value = ''
  }

  const handlechangeInput = () => {
    if (inputref2.current.value == '') {
      NotifyContent()
      return
    }

    if (inputref.current.value !== '') {
      SetTasks([...tasks, {
        id: v4(),
        Title: inputref.current.value,
        content: inputref2.current.value,
        completed: false
      }])

      SetModalOpen(false)
      inputref.current.value = ''
      inputref2.current.value = ''
      NotifyTaskSucess()

    } else {
      NotifyTitle()
      return
    };
  }

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

  const resetTasks = ()=>{
    SetTasks([])
    NotifyReset()
  }

  return (
    <>
      <div className='Header' onClick={openmodal}>
        <nav>< FaPlus className='check plus'/>{tasks.length > 0 ? 'Adicione mais uma tarefa' : 'Adicione uma tarefa'}</nav>
      </div>

      <div className='tasklengthContainer'>
        <div style={!tasks.length ? {margin: 'auto', marginTop: '10px'} : {}} className='taskLength'>Tarefas Criadas: {taskLength}</div>
        <div style={!tasks.length ? {display: 'none'} : {}} className='taskLength'>Tarefas Concluidas: {taskComplet} de {taskLength}</div>
        <div style={tasks.length > 1 ? {display: 'block'} : {display: 'none'} }><ButtonReset onclick={resetTasks}/></div>
      </div>

      <div className={ModalOpen ? 'add-task-overlay' : 'modalclose'}>
        <div className='add-task-container'>
          <Input Ref={inputref} />
          <Content reftextarea={inputref2} />
          <ButtonClose onclick={closemodal} />
          <ButtonAdd onclick={handlechangeInput} />
        </div>
      </div>
      <div>
        <Tasks Tasks={tasks} RemoveTask={RemoveTask} handleTaskClick={handleTaskClick} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App