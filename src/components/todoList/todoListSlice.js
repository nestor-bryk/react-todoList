import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    tasksLoadingStatus: 'idle'
}

const todoListSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        tasksFetching: state => { state.tasksLoadingStatus = 'loading' },
        tasksFetched: (state, action) => {
            state.tasks = action.payload;
            state.tasksLoadingStatus = 'idle'
        },
        changeStatus: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(item => item.id !== action.payload);
        },
        removeDoneTask: (state) => {
            state.tasks = state.tasks.filter(item => item.status !== 'done');
        },
        removeAllTask: (state) => {
            state.tasks = [];
        }
    }
});

const { actions, reducer } = todoListSlice;

export default reducer;

export const {
    tasksFetching,
    tasksFetched,
    changeStatus,
    addTask,
    removeTask,
    removeDoneTask,
    removeAllTask
} = actions;

