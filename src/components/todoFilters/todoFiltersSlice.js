import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
}

const todoFiltersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filtersFetching: state => { state.filtersLoadingStatus = 'loading' },
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle'
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});

const {actions, reducer} = todoFiltersSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    activeFilterChanged,
} = actions;