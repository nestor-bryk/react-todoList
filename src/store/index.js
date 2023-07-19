import { configureStore } from '@reduxjs/toolkit';
import tasks from '../components/todoList/todoListSlice';
import filter from '../components/todoFilters/todoFiltersSlice';

const store = configureStore({
    reducer: {tasks, filter},
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;