import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const macroTasks = createSlice({
    name : 'projects',
    initialState,
    reducers: {
        createMacroTasksState : (state, actions) => {
            return [...actions.payload];
        },
        createMacroTask : (state, actions) => {
            state.push(actions.payload);
        }
    }
})

export const { createMacroTasksState, createMacroTask, deleteMacroTask } = macroTasks.actions;
export default macroTasks.reducer;