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
        },
        updateMacroTask : ( state, actions ) => {
            const macroTask = actions.payload;
            const indexToDelete = state.findIndex(item => item.id == macroTask.id);

            if (indexToDelete !== -1) { state[indexToDelete] = macroTask };
        }
    }
})

export const { createMacroTasksState, createMacroTask, updateMacroTask } = macroTasks.actions;
export default macroTasks.reducer;