import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectSlice = createSlice({
    name : 'projects',
    initialState,
    reducers: {
        createProject : (state, actions) => {
            state.push(actions.payload);
        },
        deleteProject : ( state, actions ) => {
            const projectId = actions.payload;
            const indexToDelete = state.findIndex(item => item.id === projectId);

            if (indexToDelete !== -1) { state.splice(indexToDelete, 1) }
        }
    }
})

export const { createProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;