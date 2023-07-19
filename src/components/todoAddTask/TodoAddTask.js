import { useState, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addTask } from '../todoList/todoListSlice';
import { useHttp } from '../../hooks/http.hook';

import "./todoAddTask.scss";


const TodoAddTask = () => {

    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef('');
    const { request } = useHttp();


    const createTask = (e) => {
        e.preventDefault();

        const newTask = {
            id: uuidv4(),
            taskName: taskName,
            status: 'todo'
        }

        request("http://localhost:3001/tasks", "POST", JSON.stringify(newTask))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(addTask(newTask)))
            .catch(err => console.log(err));

        setTaskName('');
    }

    return (
        <>
            <h2>Todo Input</h2>
            <form className="todo__input" onSubmit={createTask}>
                <input 
                    ref={inputRef}
                    type="text"
                    name="taskName"
                    placeholder="New Todo"
                    value={taskName}
                    required
                    onChange={(e) => setTaskName(e.target.value)}/>
                <button type='submit' className='submit__task'>Add new task</button>
            </form>
        </>
    )
}

export default TodoAddTask;