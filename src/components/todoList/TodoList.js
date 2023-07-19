import TodoListItem from "../todoListItem/TodoListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tasksFetching, tasksFetched, removeTask, changeStatus, removeDoneTask, removeAllTask} from '../todoList/todoListSlice';
import { useHttp } from "../../hooks/http.hook";

import "./todoList.scss";


const TodoList = () => {
    const { tasks } = useSelector(state => state.tasks);
    const { activeFilter } = useSelector(state => state.filter);

    const dispatch = useDispatch();
    const { request } = useHttp();


    useEffect(() => {
        dispatch(tasksFetching());
        request('http://localhost:3001/tasks')
            .then(data => dispatch(tasksFetched(data)))

        // eslint-disable-next-line
    }, []);

    const onDeleteTask = (id) => {
        request(`http://localhost:3001/tasks/${id}`, 'DELETE')
            .then(res => console.log(res, 'Задача видалена успішно'))
            .then(dispatch(removeTask(id)))
            .catch(res => console.log(res));
    }

    const onChangeStatus = (id, taskName, status) => {
        const newTask = {
            id: id, 
            taskName: taskName,
            status: status === 'todo' ? "done" : 'todo'
        }
        
        request(`http://localhost:3001/tasks/${id}`, "PATCH", JSON.stringify(newTask))
            .then(res => {
                request(`http://localhost:3001/tasks`)
                    .then(data => dispatch(changeStatus(data)))
            })
    }


    const onDeleteDoneTasks = (tasks) => {
        const doneTasks = tasks.filter(item => item.status === 'done');

        doneTasks.forEach(item => {
            request(`http://localhost:3001/tasks/${item.id}`, 'DELETE')
                .then(res => console.log(res, 'Задача видалена успішно'))
                .then(dispatch(removeDoneTask()))
                .catch(res => console.log(res));
        })
    }

    const onDeleteAllTasks = (tasks) => {
        tasks.forEach(item => {
            request(`http://localhost:3001/tasks/${item.id}`, 'DELETE')
                .then(res => console.log(res, 'Задача видалена успішно'))
                .then(dispatch(removeAllTask()))
                .catch(res => console.log(res));
        })
    }

    const renderListItem = (arr) => {
        if (arr.length === 0) {
            return <h5>Створіть нову задачу!</h5>
        }

        return arr.map(({id, taskName, status}) => {
            return <TodoListItem 
                        key={id} 
                        taskName={taskName}
                        status={status}
                        onChangeStatus={() => onChangeStatus(id, taskName, status)}
                        onDeleteTask={() => onDeleteTask(id)}
                    ></TodoListItem>
        })
    }

    const filteredItem = (filter, tasks) => {
        if (filter === 'all') {
            return tasks
        } else {
            return tasks.filter(item => item.status === filter)
        }
    }

    const elements = renderListItem(filteredItem(activeFilter, tasks));

    return (
        <div className="todo__list">
            {elements}
            <div className="buttons">
                <button className="btn btn__delete" onClick={() => onDeleteDoneTasks(tasks)}>Delete done tasks</button>
                <button className="btn btn__delete" onClick={() => onDeleteAllTasks(tasks)}>Delete all tasks</button>
            </div>
        </div>
    )
}

export default TodoList;