import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectSlice = createSlice({
    name : 'projects',

    initialState,
    reducers: {
        createProject : (state, actions) => {
            state.push(actions.payload);
        }
    }
})

export const { createProject } = projectSlice.actions;

export default projectSlice.reducer;